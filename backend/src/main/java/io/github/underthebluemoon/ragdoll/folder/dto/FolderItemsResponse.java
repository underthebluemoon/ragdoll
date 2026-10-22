package io.github.underthebluemoon.ragdoll.folder.dto;

import io.github.underthebluemoon.ragdoll.document.dto.DocumentSummary;

import java.util.List;

public record FolderItemsResponse(List<FolderSummary> folders, List<DocumentSummary> documents) {
}
