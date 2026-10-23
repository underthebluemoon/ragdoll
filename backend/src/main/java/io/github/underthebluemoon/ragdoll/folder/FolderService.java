package io.github.underthebluemoon.ragdoll.folder;

import io.github.underthebluemoon.ragdoll.document.Document;
import io.github.underthebluemoon.ragdoll.document.DocumentRepository;
import io.github.underthebluemoon.ragdoll.document.dto.DocumentSummary;
import io.github.underthebluemoon.ragdoll.folder.dto.FolderItemsResponse;
import io.github.underthebluemoon.ragdoll.folder.dto.FolderSummary;
import io.github.underthebluemoon.ragdoll.user.User;
import io.github.underthebluemoon.ragdoll.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FolderService {
    // field
    private final FolderRepository folderRepository;
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    private static final Logger log = LoggerFactory.getLogger(FolderService.class);

    // constructor
    public FolderService(FolderRepository folderRepository, DocumentRepository documentRepository, UserRepository userRepository) {
        this.folderRepository = folderRepository;
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
    }

    // folderId 로 depth 0 부터 직계 부모 경로 찾기
    public List<FolderSummary> getPath(Long folderId) {
        List<Folder> path = new ArrayList<>();

        // folderId로 parentId 찾기 - folderId 조회 결과 없으면 NOT_FOUND
        Folder folder = folderRepository.findByIdAndDeletedAtIsNull(folderId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        path.add(folder);

        // parentId 로 거슬러 올라가며 path에 담기 - parentId를 folderId로 갖는 폴더가 없으면 NOT_FOUND
        while (folder.getParentId() != null) {
            Folder parentFolder = folderRepository.findByIdAndDeletedAtIsNull(folder.getParentId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            path.add(parentFolder);
            folder = parentFolder;
        }

        // 가공
        Collections.reverse(path);
        return path.stream()
            .map(f -> new FolderSummary(f.getId(), f.getName(), f.getDepth()))
            .toList();

    }

    // folderId로 현재 아이템들(폴더+문서) 찾기
    public FolderItemsResponse getItems(Long folderId) {
        // folderId 존재 확인 - 없으면 NOT_FOUND
        folderRepository.findByIdAndDeletedAtIsNull(folderId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // 현재 위치에 있는 폴더 리스트
        List<Folder> currentFolders = folderRepository.findByParentIdAndDeletedAtIsNullOrderBySortOrderAscNameAsc(folderId);
        // 현재 위치에 있는 문서 리스트
        List<Document> currentDocuments = documentRepository.findByFolderIdAndDeletedAtIsNull(folderId);

        // 문서들의 uploaderId를 뽑아 조회
        List<Long> currentUploaderIds = currentDocuments.stream().map(Document::getUploaderId).toList();
        List<User> currentUploaders = userRepository.findAllById(currentUploaderIds);
        // uploaderId 와 userName 맵핑
        Map<Long, String> uploaderNameById = currentUploaders.stream().collect(Collectors.toMap(User::getId, User::getName));

        // 가공
        List<FolderSummary> folderItems = currentFolders.stream().map(f -> new FolderSummary(f.getId(), f.getName(), f.getDepth())).toList();
        // uploaderId를 userId로 갖는 경우가 없을 떄 로그
        List<DocumentSummary> documentItems = currentDocuments.stream().map(d -> {
            String uploader = uploaderNameById.get(d.getUploaderId());
            if(uploader == null) {
                log.warn("uploader not found: documentId={}, uploaderId={}", d.getId(), d.getUploaderId());
            }
            return new DocumentSummary(
                d.getId(), d.getTitle(), d.getFolderId(), uploader,
                LocalDate.ofInstant(d.getUpdatedAt(), ZoneId.of("Asia/Seoul"))
            );
        }).toList();

        return new FolderItemsResponse(folderItems, documentItems);
    }
}
