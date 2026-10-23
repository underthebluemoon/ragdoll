package io.github.underthebluemoon.ragdoll.document;

import io.github.underthebluemoon.ragdoll.document.dto.DocumentSummary;
import io.github.underthebluemoon.ragdoll.folder.FolderService;
import io.github.underthebluemoon.ragdoll.user.User;
import io.github.underthebluemoon.ragdoll.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class DocumentService {
    // field
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    private static final Logger log = LoggerFactory.getLogger(DocumentService.class);

    // constructor
    public DocumentService(DocumentRepository documentRepository, UserRepository userRepository) {
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
    }

    // documentId로 문서 찾기
    public DocumentSummary getDocument(Long documentId) {
        // 문서 조회 - 결과가 없으면 NOT_FOUND
        Document document = documentRepository.findByIdAndDeletedAtIsNull(documentId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // 업로더 조회 - 결과가 없으면 500
        User uploader = userRepository.findById(document.getUploaderId())
            .orElseThrow(() -> new IllegalStateException("uploader not found: documentId=" + documentId + ", uploader=" + document.getUploaderId()));

        // 가공
        return new DocumentSummary(
            document.getId(), document.getTitle(), document.getFolderId(),
            uploader.getName(),
            LocalDate.ofInstant(document.getUpdatedAt(), ZoneId.of("Asia/Seoul"))
        );
    }

    // documentId List로 여러 문서 찾기
    public List<DocumentSummary> getDocumentsByIds(List<Long> documentIds) {
        // documentIds가 비어있을 경우, 바로 반환
        if (documentIds.isEmpty()) { return List.of(); }
        // 문서 조회
        List<Document> documentList = documentRepository.findByIdInAndDeletedAtIsNull(documentIds);
        // 업로더 조회
        List<Long> uploaderIdList = documentList.stream().map(Document::getUploaderId).toList();
        List<User> uploaderList = userRepository.findAllById(uploaderIdList);
        // uploaderId와 userName 맵핑
        Map<Long, String> uploaderNameById = uploaderList.stream().collect(Collectors.toMap(User::getId, User::getName));

        // 가공
        // 1. 업로더 추가
        List<DocumentSummary> result = documentList.stream().map(d -> {
            String uploader = uploaderNameById.get(d.getUploaderId());
            if(uploader == null) {
                log.warn("uploader not found: documentId={}, uploaderId={}", d.getId(), d.getUploaderId());
            }
            return new DocumentSummary(
                d.getId(), d.getTitle(), d.getFolderId(), uploader,
                LocalDate.ofInstant(d.getUpdatedAt(), ZoneId.of("Asia/Seoul"))
            );
        }).toList();
        // 2. 요청 온 순서대로 정렬
        Map<Long, DocumentSummary> resultById = result.stream().collect(Collectors.toMap(DocumentSummary::id, s->s));

        return documentIds.stream().distinct().map(resultById::get).filter(Objects::nonNull).toList();
    }

}
