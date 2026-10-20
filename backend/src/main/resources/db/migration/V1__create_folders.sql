CREATE TABLE folders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  parent_id BIGINT REFERENCES folders (id),
  name VARCHAR(100) NOT NULL,
  depth SMALLINT NOT NULL CHECK ( depth BETWEEN 0 AND 5),
  sort_order INTEGER,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,

  CONSTRAINT ck_folders_root_depth CHECK ((parent_id IS NULL) = (depth = 0))
);

CREATE UNIQUE INDEX uq_folders_parent_name_alive
  ON folders (parent_id, name) NULLS NOT DISTINCT
  WHERE deleted_at IS NULL;
