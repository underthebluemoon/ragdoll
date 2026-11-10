package io.github.underthebluemoon.ragdoll.document;

import io.github.underthebluemoon.ragdoll.document.dto.DocumentSummary;
import io.github.underthebluemoon.ragdoll.global.response.ResponseCodeDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    // field
    private final DocumentService documentService;

    // constructor
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    // 문서 조회 : 탭 생성, 경로 표시용

    // 1. 단일 조회 - 파라미터
    /**
     * 문서 단일 조회. 문서 id는 파라미터로 요청.
     * @param userId 조회 user PK
     * @param documentId 조회할 document PK
     * @return DocumentSummary
     */
    @GetMapping("/{documentId}")
    public ResponseCodeDTO<DocumentSummary> getDocument(@RequestHeader("X-User-Id") Long userId, @PathVariable Long documentId) {
        return ResponseCodeDTO.success(documentService.getDocument(userId, documentId));
    }

    // 2. 다중 조회 - 쿼리스트링
    /**
     * 문서 다중 조회. 문서 id는 쿼리 스트링으로 요청.
     * @param userId 조회 user PK
     * @param documentIds 조회할 document PK List
     * @return DocumentSummary[]
     */
    @GetMapping
    public ResponseCodeDTO<List<DocumentSummary>> getDocumentsByIds(@RequestHeader("X-User-Id") Long userId, @RequestParam("ids") List<Long> documentIds) {
        return ResponseCodeDTO.success(documentService.getDocumentsByIds(userId, documentIds));
    }
}
