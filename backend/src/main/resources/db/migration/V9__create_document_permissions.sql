CREATE TABLE document_permissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  document_id BIGINT NOT NULL REFERENCES documents (id),
  department_id BIGINT REFERENCES departments (id),
  min_rank_id BIGINT REFERENCES ranks (id),
  access VARCHAR(20) NOT NULL DEFAULT 'READ' CHECK ( access IN ('READ', 'WRITE')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX uq_document_permissions_rule_alive
  ON document_permissions (document_id, department_id, min_rank_id, access) NULLS NOT DISTINCT
  WHERE deleted_at IS NULL;
