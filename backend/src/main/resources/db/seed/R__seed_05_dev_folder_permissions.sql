INSERT INTO folder_permissions (folder_id, department_id, min_rank_id, access)
VALUES
  (
    (SELECT id FROM folders WHERE name = '재무팀'),
    (SELECT id FROM departments WHERE name = '재무팀'),
    NULL,
    'READ'
  ),
  (
    (SELECT id FROM folders WHERE name = '재무팀'),
    (SELECT id FROM departments WHERE name = '감사팀'),
    NULL,
    'READ'
  ),
  (
    (SELECT id FROM folders WHERE name = '재무팀'),
    (SELECT id FROM departments WHERE name = '재무팀'),
    (SELECT id FROM ranks WHERE name = '과장'),
    'WRITE'
  ),
  (
    (SELECT id FROM folders WHERE name = '증빙'),
    (SELECT id FROM departments WHERE name = '재무팀'),
    (SELECT id FROM ranks WHERE name = '차장'),
    'READ'
  ),
  (
    (SELECT id FROM folders WHERE name = '증빙'),
    (SELECT id FROM departments WHERE name = '감사팀'),
    NULL,
    'READ'
  ),
  (
    (SELECT id FROM folders WHERE name = '인사팀'),
    (SELECT id FROM departments WHERE name = '인사팀'),
    NULL,
    'READ'
  ),
  (
    (SELECT id FROM folders WHERE name = '전사 공지'),
    (SELECT id FROM departments WHERE name = '총무팀'),
    NULL,
    'WRITE'
  ),
  (
    (SELECT id FROM folders WHERE name = '관리자 회의록'),
    NULL,
    (SELECT id FROM ranks WHERE name = '과장'),
    'READ'
  );

INSERT INTO folder_permissions (folder_id, department_id, min_rank_id, access, deleted_at)
VALUES
  (
    (SELECT id FROM folders WHERE name = '자료실'),
    (SELECT id FROM departments WHERE name = '재무팀'),
    NULL,
    'READ',
    '2026-10-01 09:00:00+09'
  );
