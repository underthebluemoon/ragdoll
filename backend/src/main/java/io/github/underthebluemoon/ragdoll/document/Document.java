package io.github.underthebluemoon.ragdoll.document;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Long folderId;
    private Long uploaderId;
    @Enumerated(EnumType.STRING)
    private UploaderType uploaderType;
    private Long sourceDocumentId;
    private Long updaterId;

    private String filePath;
    private String fileType;
    private Long fileSize;
    private String content;

    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;

    // constructure
    protected Document() {
    }

    // getter
    public Long getId() { return id; }
    public String getName() { return name; }
    public Long getFolderId() { return folderId; }

    public Long getUploaderId() { return uploaderId; }
    public UploaderType getUploaderType() { return uploaderType; }
    public Long getSourceDocumentId() { return sourceDocumentId; }
    public Long getUpdaterId() { return updaterId; }

    public String getFilePath() { return filePath; }
    public String getFileType() { return fileType; }
    public Long getFileSize() { return fileSize; }
    public String getContent() { return content; }

    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }

}
