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
}
