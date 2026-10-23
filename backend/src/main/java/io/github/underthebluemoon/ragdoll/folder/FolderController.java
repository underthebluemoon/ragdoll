package io.github.underthebluemoon.ragdoll.folder;

import io.github.underthebluemoon.ragdoll.folder.dto.FolderItemsResponse;
import io.github.underthebluemoon.ragdoll.folder.dto.FolderSummary;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/folders")
public class FolderController {
    // field
    private final FolderService folderService;

    // constructor
    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    // 폴더 경로 조회
    @GetMapping("/{folderId}/path")
    public List<FolderSummary> getPath(@PathVariable Long folderId) {
        return folderService.getPath(folderId);
    }

    // 폴더 아이템 조회 : 폴터 탐색 중 현재 위치 아이템 표시
    @GetMapping("/{folderId}/items")
    public FolderItemsResponse getItems(@PathVariable Long folderId) { return folderService.getItems(folderId); }
}
