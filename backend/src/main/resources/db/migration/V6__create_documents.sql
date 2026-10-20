CREATE TABLE documents (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  folder_id BIGINT NOT NULL REFERENCES folders (id),
  uploader_id BIGINT NOT NULL REFERENCES users (id),
  uploader_type VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK ( uploader_type IN ('USER', 'ASSISTANT')),
  source_document_id BIGINT REFERENCES documents (id),
  updater_id BIGINT NOT NULL REFERENCES users (id),

  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(255) NOT NULL,
  file_size BIGINT NOT NULL,
  content TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_documents_folder_id
  ON documents (folder_id)
  WHERE deleted_at IS NULL;
