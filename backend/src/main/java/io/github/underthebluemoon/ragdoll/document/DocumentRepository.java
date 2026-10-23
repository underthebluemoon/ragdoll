package io.github.underthebluemoon.ragdoll.document;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    // id로 삭제 되지 않은 문서 조회
    Optional<Document> findByIdAndDeletedAtIsNull(Long id);
    // documentId로 삭제 되지 않은 여러 문서 조회
    List<Document> findByIdInAndDeletedAtIsNull(List<Long> ids);

    // folderId로 삭제되지 않은 문서 조회
    List<Document> findByFolderIdAndDeletedAtIsNull(Long folderId);
}
