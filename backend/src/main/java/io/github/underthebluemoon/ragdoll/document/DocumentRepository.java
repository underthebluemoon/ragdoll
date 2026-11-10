package io.github.underthebluemoon.ragdoll.document;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    /**
     * documentId로 삭제 되지 않은 문서 조회
     * @param userId 조회 요청 유저 아이디
     * @param documentId 문서 아이디
     * @return 삭제 되지 않은, 열람 권한 통과 문서 레코드 하나
     */
    @Query(value = """
        SELECT *
            FROM documents d
            WHERE d.id = :documentId
                AND can_read_document(:userId, d.id)
        """, nativeQuery = true)
    Optional<Document> findReadableDocumentById(@Param("userId") Long userId, @Param("documentId") Long documentId);

    /**
     * documentId list로 삭제 되지 않은 여러 문서 조회
     * @param userId 조회 요청 유저 아이디
     * @param documentIds 문서 아이디 리스트
     * @return 삭제 되지 않은, 열람 권한 통과 문서 리스트
     */
    @Query(value = """
        SELECT *
            FROM documents d
            WHERE d.id IN (:documentIds)
                AND can_read_document(:userId, d.id)
        """, nativeQuery = true)
    List<Document> findAllReadableDocumentByIds(@Param("userId") Long userId, @Param("documentIds") List<Long> documentIds);


    /**
     * folderId로 삭제되지 않은 문서 조회
     * @param userId 조회 요청 유저 아이디
     * @param folderId 폴더 아이디
     * @return 삭제 되지 않은, 열람 권한에 통과 문서 리스트
     */
    @Query(value = """
        SELECT *
            FROM documents d
            WHERE d.folder_id = :folderId
                AND can_read_document(:userId, d.id)
        """, nativeQuery = true)
    List<Document> findAllReadableDocumentByFolderId(@Param("userId") Long userId, @Param("folderId") Long folderId);
}
