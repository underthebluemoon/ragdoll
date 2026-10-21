package io.github.underthebluemoon.ragdoll.folder;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "folders")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long parentId;
    private String name;
    private Short depth;
    private Integer sortOrder;

    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;

    // constructure
    protected Folder() {
    }

    // ===== getter =====
    public Long getId() { return id; }
    public Long getParentId() { return parentId; }
    public String getName() { return name; }
    public Short getDepth() { return depth; }
    public Integer getSortOrder() { return sortOrder; }

    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }

}
