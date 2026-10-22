package io.github.underthebluemoon.ragdoll.folder;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    // id로 삭제되지 않은 폴더 조회
    Optional<Folder> findByIdAndDeletedAtIsNull(Long id);

    // parentId로 삭제되지 않은 현재 폴더 조회 - sort정렬 → 이름 정렬
    List<Folder> findByParentIdAndDeletedAtIsNullOrderBySortOrderAscNameAsc(Long parentId);
}
