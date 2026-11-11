CREATE TABLE read_logs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users (id),
  actor_type VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (actor_type IN ('USER', 'ASSISTANT')),
  action VARCHAR(20) NOT NULL CHECK (action IN ('VIEW', 'DOWNLOAD')),
  document_id BIGINT NOT NULL REFERENCES documents (id),
  result VARCHAR(20) NOT NULL DEFAULT 'SUCCESS' CHECK (result IN ('SUCCESS', 'DENIED')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_read_logs_user_created
  ON read_logs (user_id, created_at DESC);

CREATE INDEX idx_read_logs_document_created
  ON read_logs (document_id, created_at DESC);
