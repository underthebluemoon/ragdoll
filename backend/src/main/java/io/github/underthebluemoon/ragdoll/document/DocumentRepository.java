package io.github.underthebluemoon.ragdoll.document;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    // folderId로 삭제되지 않은 문서 조회
    List<Document> findByFolderIdAndDeletedAtIsNull(Long folderId);
}
