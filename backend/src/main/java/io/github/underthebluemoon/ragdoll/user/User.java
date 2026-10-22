package io.github.underthebluemoon.ragdoll.user;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String loginId;
    private String passwordHash;
    private Boolean passwordChangeRequired;
    private String name;
    private Long departmentId;
    private Long rankId;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;

    protected User() {
    }

    public Long getId() { return id; }
    public String getLoginId() { return loginId; }
    public Boolean getPasswordChangeRequired() { return passwordChangeRequired; }
    public String getName() { return name; }
    public Long getDepartmentId() { return departmentId; }
    public Long getRankId() { return rankId; }
    public Role getRole() { return role; }

    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
