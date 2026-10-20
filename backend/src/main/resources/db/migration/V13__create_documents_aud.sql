CREATE TABLE documents_aud (
  id BIGINT NOT NULL,
  rev BIGINT NOT NULL REFERENCES revinfo (rev),
  revtype SMALLINT,
  name VARCHAR(255),
  folder_id BIGINT,
  uploader_id BIGINT,
  uploader_type VARCHAR(20),
  source_document_id BIGINT,
  updater_id BIGINT,

  file_path VARCHAR(255),
  file_type VARCHAR(255),
  file_size BIGINT,

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,

  PRIMARY KEY (id, rev)
);
