CREATE TABLE folders_aud (
  id BIGINT NOT NULL,
  rev BIGINT NOT NULL REFERENCES revinfo (rev),
  revtype SMALLINT,
  parent_id BIGINT,
  name VARCHAR(100),
  depth SMALLINT,
  sort_order INTEGER,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,

  PRIMARY KEY (id, rev)
);
