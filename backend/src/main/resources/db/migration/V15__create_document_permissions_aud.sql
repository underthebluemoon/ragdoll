CREATE TABLE document_permissions_aud (
  id BIGINT NOT NULL,
  rev BIGINT NOT NULL REFERENCES revinfo (rev),
  revtype SMALLINT,
  document_id BIGINT,
  department_id BIGINT,
  min_rank_id BIGINT,
  access VARCHAR(20),

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,

  PRIMARY KEY (id, rev)
);

