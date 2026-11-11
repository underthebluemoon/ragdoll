package io.github.underthebluemoon.ragdoll.folder;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, Long> {

    /**
     * id로 삭제되지 않은 폴더 조회
     * @param userId 조회 요청 유저 아이디
     * @param folderId 조회할 폴더 아이디
     * @return 열람 권한 통과 폴더
     */
    @Query(value = """
        SELECT *
            FROM folders f
            WHERE f.id = :folderId
                AND can_read_folder(:userId, f.id)
    """, nativeQuery = true)
    Optional<Folder> findReadableFolderById(@Param("userId") Long userId, @Param("folderId") Long folderId);


    /**
     * 지금 보고 있는 폴더를 parentId로 갖는, 삭제되지 않은 하위 폴더 목록 조회
     * 결과 값은 1. sort정렬 → 2. 이름 정렬
     * @param userId 조회 요청 유저 아이디
     * @param parentId 지금 보고 있는 폴더
     * @return 열람 권한 통과한 현재 위치의 하위 폴더 목록
     */
    @Query(value = """
        SELECT *
            FROM folders f
            WHERE f.parent_id = :parentId
                AND f.deleted_at IS NULL
                AND can_read_folder(:userId, f.id)
            ORDER BY f.sort_order ASC NULLS LAST, f.name ASC
    """, nativeQuery = true)
    List<Folder> findAllReadableFolderByParentId(@Param("userId") Long userId, @Param("parentId") Long parentId);

    /**
     * 지금 보고 있는 폴더 id로 루트까지의 경로 조회. 읽기 권한 체크 포함.
     * @param userId 조회 요청 user PK
     * @param folderId 현재 위치의 folder PK
     * @return 열람 권한을 통과한 루트 ~ 현재 위치의 경로 목록. 경로의 폴더 중 삭제 된 것이나, 읽기 권한이 없는 것이 포함되면 빈 배열 반환.
     */
    @Query(value = """
        WITH RECURSIVE ancestors AS (
            SELECT *
                FROM folders
                WHERE id = :folderId
            UNION ALL
            SELECT f.*
                FROM folders f
                JOIN ancestors a
                    ON f.id = a.parent_id
        )
        SELECT *
            FROM ancestors
            WHERE can_read_folder(:userId, :folderId)
            ORDER BY depth ASC
    """, nativeQuery = true)
    List<Folder> findAllReadableFolderPathById(@Param("userId") Long userId, @Param("folderId") Long folderId);
}
