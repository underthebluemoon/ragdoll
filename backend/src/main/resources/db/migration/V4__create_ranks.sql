CREATE TABLE ranks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  level SMALLINT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX uq_ranks_name_alive
  ON ranks (name)
  WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX uq_ranks_level_alive
  ON ranks (level)
  WHERE deleted_at IS NULL;
