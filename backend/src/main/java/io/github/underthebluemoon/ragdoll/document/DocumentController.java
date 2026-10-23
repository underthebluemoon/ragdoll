package io.github.underthebluemoon.ragdoll.document;

import io.github.underthebluemoon.ragdoll.document.dto.DocumentSummary;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @GetMapping("/{documentId}")
    public DocumentSummary getDocument(@PathVariable Long documentId) { return documentService.getDocument(documentId); }
}
