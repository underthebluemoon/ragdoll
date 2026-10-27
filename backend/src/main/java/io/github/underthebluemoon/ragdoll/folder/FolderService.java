package io.github.underthebluemoon.ragdoll.folder;

import io.github.underthebluemoon.ragdoll.document.Document;
import io.github.underthebluemoon.ragdoll.document.DocumentRepository;
import io.github.underthebluemoon.ragdoll.document.dto.DocumentSummary;
import io.github.underthebluemoon.ragdoll.folder.dto.FolderItemsResponse;
import io.github.underthebluemoon.ragdoll.folder.dto.FolderSummary;
import io.github.underthebluemoon.ragdoll.global.exception.BusinessException;
import io.github.underthebluemoon.ragdoll.global.response.CustomResponseCode;
import io.github.underthebluemoon.ragdoll.user.User;
import io.github.underthebluemoon.ragdoll.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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

    /**
     * folderId 로 depth 0 부터 자신까지 직계 경로 찾기
     * @param folderId folders PK
     * @return depth 0부터 자신까지 경로 List
     * @throws BusinessException FOLDER_NOT_FOUND: 1. folderId로 조회한 폴더가 없는 경우 2.folderId의 parentId 값은 존재하지만, parentId가 조회되지 않는 경우
     */
    public List<FolderSummary> getPath(Long folderId) {
        List<Folder> path = new ArrayList<>();

        // folderId로 parentId 찾기 - folderId 조회 결과 없으면 NOT_FOUND
        Folder folder = folderRepository.findByIdAndDeletedAtIsNull(folderId)
            .orElseThrow(() -> new BusinessException(CustomResponseCode.FOLDER_NOT_FOUND, "folder not found: folderId=" + folderId));
        path.add(folder);

        // parentId 로 거슬러 올라가며 path에 담기 - parentId를 folderId로 갖는 폴더가 없으면 NOT_FOUND
        while (folder.getParentId() != null) {
            Long parentId = folder.getParentId();
            Folder parentFolder = folderRepository.findByIdAndDeletedAtIsNull(parentId)
                .orElseThrow(() -> new BusinessException(CustomResponseCode.FOLDER_NOT_FOUND, "parent folder not found: folderId=" + folderId + ", parentId=" + parentId));
            path.add(parentFolder);
            folder = parentFolder;
        }

        // 가공
        Collections.reverse(path);
        return path.stream()
            .map(f -> new FolderSummary(f.getId(), f.getName(), f.getDepth()))
            .toList();

    }

    /**
     * folderId로 현재 아이템들(폴더+문서) 찾기
     * 문서의 uploaderId로 조회한 user 정보가 없는 경우 uploader는 null(warn log)
     * @param folderId folders PK
     * @return 현재 위치의 폴더 정보 List (folderId, name, depth) + 현재 위치의 문서 정보 List (documentId, title, folderId, uploader(name), createdAt, updatedAt)
     * @throws BusinessException FOLDER_NOT_FOUND : folderId로 조회한 폴더가 없는 경우
     */
    public FolderItemsResponse getItems(Long folderId) {
        // folderId 존재 확인 - 없으면 NOT_FOUND
        folderRepository.findByIdAndDeletedAtIsNull(folderId)
            .orElseThrow(() -> new BusinessException(CustomResponseCode.FOLDER_NOT_FOUND, "folder not found: folderId=" + folderId));

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
        // uploaderId를 userId로 갖는 경우가 없을 때 로그
        List<DocumentSummary> documentItems = currentDocuments.stream().map(d -> {
            String uploader = uploaderNameById.get(d.getUploaderId());
            if(uploader == null) {
                log.warn("uploader not found: documentId={}, uploaderId={}", d.getId(), d.getUploaderId());
            }
            return new DocumentSummary(
                d.getId(), d.getTitle(), d.getFolderId(), uploader,
                LocalDate.ofInstant(d.getCreatedAt(), ZoneId.of("Asia/Seoul")),
                LocalDate.ofInstant(d.getUpdatedAt(), ZoneId.of("Asia/Seoul"))
            );
        }).toList();

        return new FolderItemsResponse(folderItems, documentItems);
    }
}
