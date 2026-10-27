package io.github.underthebluemoon.ragdoll.document.dto;

import java.time.LocalDate;

public record DocumentSummary(Long id, String title, Long folderId, String uploader, LocalDate createdAt, LocalDate updatedAt) {
}
