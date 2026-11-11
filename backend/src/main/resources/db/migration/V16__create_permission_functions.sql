-- 공통 함수
/**
  부서 및 최소 직급을 매칭, 권한 여부 판별.
  접근 가능 권한일 경우, T 반환
 */
CREATE FUNCTION rule_matches(p_user_id BIGINT, p_rule_department_id BIGINT, p_rule_min_rank_id BIGINT)
  RETURNS BOOLEAN
  AS $$
    SELECT
      (p_rule_department_id IS NULL OR u.department_id = p_rule_department_id)
      AND (p_rule_min_rank_id IS NULL OR r.level >= (SELECT level FROM ranks WHERE id = p_rule_min_rank_id))
      FROM users u
      LEFT JOIN ranks r
        ON r.id = u.rank_id
        WHERE u.id = p_user_id;
  $$
  LANGUAGE sql
  STABLE;

/**
  폴더 읽기 권한 체크 함수.
  userId와 권한을 체크할 folderId를 받아, 폴더가 속한 폴더들의 권한까지 체크
  읽기 가능한 권한일 경우, T 반환
 */
CREATE FUNCTION can_read_folder(p_user_id BIGINT, p_folder_id BIGINT)
  RETURNS BOOLEAN
  LANGUAGE sql
  STABLE
  AS $$
    WITH RECURSIVE ancestors AS (
      SELECT id, parent_id, deleted_at
        FROM folders
        WHERE id = p_folder_id
      UNION ALL
        SELECT f.id, f.parent_id, f.deleted_at
          FROM folders f
          JOIN ancestors a
            ON f.id = a.parent_id
      )
    SELECT
      EXISTS (SELECT 1 FROM ancestors)  -- 행 존재 여부 체크
        AND NOT EXISTS (                -- 모든 조건이 통과 될 경우 T
          SELECT 1
            FROM ancestors a
            WHERE a.deleted_at IS NOT NULL
            OR NOT (
              NOT EXISTS (              -- 조건 1 : READ 조건이 하나도 없거나
                SELECT 1
                  FROM folder_permissions fp
                  WHERE fp.folder_id = a.id
                  AND fp.deleted_at IS NULL
                  AND fp.access = 'READ'
                )
              OR EXISTS (               -- 조건 2 : 현재 폴더의 모든 권한 체크 통과
                SELECT 1
                  FROM folder_permissions fp
                  WHERE fp.folder_id = a.id
                  AND fp.deleted_at IS NULL
                  AND rule_matches(p_user_id, fp.department_id, fp.min_rank_id)
                )
              )
          );
    $$;

/**
  문서 읽기 권한 체크 함수.
  userId와 권한을 체크할 documentId를 받아, 문서와 문서가 속한 폴더의 권한까지 체크
  읽기 가능 권한 일 경우, T 반환
 */
CREATE FUNCTION can_read_document(p_user_id BIGINT, p_document_id BIGINT)
  RETURNS BOOLEAN
  LANGUAGE sql
  STABLE
  AS $$
    SELECT EXISTS (
      SELECT 1
      FROM documents d
      WHERE d.id = p_document_id
        AND d.deleted_at IS NULL
        AND can_read_folder(p_user_id, d.folder_id)
        AND (
          NOT EXISTS (
            SELECT 1
              FROM document_permissions dp
                WHERE dp.document_id = d.id
                  AND dp.deleted_at IS NULL
                  AND dp.access = 'READ'
          )
          OR EXISTS (
            SELECT 1
              FROM document_permissions dp
              WHERE dp.document_id = d.id
                AND dp.deleted_at IS NULL
                AND rule_matches(p_user_id, dp.department_id, dp.min_rank_id)
          )
        )
    );
  $$;
