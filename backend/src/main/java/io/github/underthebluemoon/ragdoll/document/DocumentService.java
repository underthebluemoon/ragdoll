package io.github.underthebluemoon.ragdoll.document;

import io.github.underthebluemoon.ragdoll.document.dto.DocumentSummary;
import io.github.underthebluemoon.ragdoll.user.User;
import io.github.underthebluemoon.ragdoll.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.ZoneId;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    // constructure
    public DocumentService(DocumentRepository documentRepository, UserRepository userRepository) {
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
    }

    // document id로 문서 찾기
    public DocumentSummary getDocument(Long id) {
        // 문서 조회 - 결과가 없으면 NOT_FOUND
        Document document = documentRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // 업로더 조회 - 결과가 없으면 500
        User uploader = userRepository.findById(document.getUploaderId())
            .orElseThrow(() -> new IllegalStateException("uploader not found: documentId=" + id + ", uploader=" + document.getUploaderId()));

        // 가공
        return new DocumentSummary(
            document.getId(), document.getTitle(), document.getFolderId(),
            uploader.getName(),
            LocalDate.ofInstant(document.getUpdatedAt(), ZoneId.of("Asia/Seoul"))
        );

    }
}
