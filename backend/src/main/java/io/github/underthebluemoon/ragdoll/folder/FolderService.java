package io.github.underthebluemoon.ragdoll.folder;

import io.github.underthebluemoon.ragdoll.folder.dto.FolderSummary;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class FolderService {
    private final FolderRepository folderRepository;

    public FolderService(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    public List<FolderSummary> getPath(Long folderId) {
        List<Folder> path = new ArrayList<>();

        Folder folder = folderRepository.findByIdAndDeletedAtIsNull(folderId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        path.add(folder);

        while (folder.getParentId() != null) {
            Folder parentFolder = folderRepository.findByIdAndDeletedAtIsNull(folder.getParentId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            path.add(parentFolder);
            folder = parentFolder;
        }

        Collections.reverse(path);

        return path.stream()
            .map(f -> new FolderSummary(f.getId(), f.getName(), f.getDepth()))
            .toList();

    }

}
