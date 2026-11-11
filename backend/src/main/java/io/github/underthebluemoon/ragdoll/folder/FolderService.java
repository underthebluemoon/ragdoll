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
     * @throws BusinessException FOLDER_NOT_FOUND: 1. folderId로 조회한 폴더가 없는 경우. 2.경로 중 삭제/읽기 권한 없는 폴더가 있는 경우.
     */
    public List<FolderSummary> getPath(Long userId, Long folderId) {
        // folderId로 경로 찾기
        List<Folder> folderPath = folderRepository.findAllReadableFolderPathById(userId, folderId);

        // 결과가 빈 List인 경우 : 경로 중 폴더가 삭제되었거나 읽기 권한 없음 / 조회 폴더 미존재
        if(folderPath.isEmpty()) {
            throw new BusinessException(CustomResponseCode.FOLDER_NOT_FOUND, "folder not found: userId= " + userId + " | folderId= " + folderId);
        }

        // 가공
        return folderPath.stream()
            .map(f -> new FolderSummary(f.getId(), f.getName(), f.getDepth()))
            .toList();
    }

    /**
     * folderId로 현재 아이템들(폴더+문서) 찾기
     * 문서의 uploaderId로 조회한 user 정보가 없는 경우 uploader는 null(warn log)
     * @param folderId folders PK
     * @return 현재 위치의 폴더 정보 List (folderId, name, depth) + 현재 위치의 문서 정보 List (documentId, title, folderId, uploader(name), createdAt, updatedAt)
     * @throws BusinessException FOLDER_NOT_FOUND : 1. folderId로 조회한 폴더가 없는 경우. 2. userId에게 folderId의 읽기 권한이 없는 경우.
     */
    public FolderItemsResponse getItems(Long userId, Long folderId) {
        // folderId 존재 확인 - 없으면 NOT_FOUND
        folderRepository.findReadableFolderById(userId, folderId)
            .orElseThrow(() -> new BusinessException(CustomResponseCode.FOLDER_NOT_FOUND, "folder not found: userId= " + userId + " | folderId= " + folderId));

        // 현재 위치에 있는 폴더 리스트
        List<Folder> currentFolders = folderRepository.findAllReadableFolderByParentId(userId, folderId);
        // 현재 위치에 있는 문서 리스트
        List<Document> currentDocuments = documentRepository.findAllReadableDocumentByFolderId(userId, folderId);

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
                log.warn("uploader not found: documentId= {} | uploaderId= {}", d.getId(), d.getUploaderId());
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
