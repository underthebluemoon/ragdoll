CREATE TABLE folder_permissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  folder_id BIGINT NOT NULL REFERENCES folders (id),
  department_id BIGINT REFERENCES departments (id),
  min_rank_id BIGINT REFERENCES ranks (id),
  access VARCHAR(20) NOT NULL DEFAULT 'READ' CHECK ( access IN ('READ', 'WRITE')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX uq_folder_permissions_rule_alive
  ON folder_permissions (folder_id, department_id, min_rank_id, access) NULLS NOT DISTINCT
  WHERE deleted_at IS NULL;
