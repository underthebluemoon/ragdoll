package io.github.underthebluemoon.ragdoll.folder;

import io.github.underthebluemoon.ragdoll.folder.dto.FolderItemsResponse;
import io.github.underthebluemoon.ragdoll.folder.dto.FolderSummary;
import io.github.underthebluemoon.ragdoll.global.response.ResponseCodeDTO;
import org.springframework.web.bind.annotation.*;

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
    public ResponseCodeDTO<List<FolderSummary>> getPath(@RequestHeader("X-User-Id") Long userId, @PathVariable Long folderId) {
        return ResponseCodeDTO.success(folderService.getPath(userId, folderId));
    }

    // 폴더 아이템 조회 : 폴터 탐색 중 현재 위치 아이템 표시
    @GetMapping("/{folderId}/items")
    public ResponseCodeDTO<FolderItemsResponse> getItems(@RequestHeader("X-User-Id") Long userId, @PathVariable Long folderId) {
        return ResponseCodeDTO.success(folderService.getItems(userId, folderId));
    }
}
