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
    @GetMapping("/{documentId}")
    public ResponseCodeDTO<DocumentSummary> getDocument(@PathVariable Long documentId) {
        return ResponseCodeDTO.success(documentService.getDocument(documentId));
    }
    // 2. 다중 조회 - 쿼리스트링
    @GetMapping
    public ResponseCodeDTO<List<DocumentSummary>> getDocumentsByIds(@RequestParam("ids") List<Long> documentIds) {
        return ResponseCodeDTO.success(documentService.getDocumentsByIds(documentIds));
    }
}
