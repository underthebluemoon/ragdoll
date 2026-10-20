CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  login_id VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  password_change_required BOOLEAN NOT NULL DEFAULT true,
  name VARCHAR(100) NOT NULL,
  department_id BIGINT REFERENCES departments (id),
  rank_id BIGINT REFERENCES ranks (id),
  role VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX uq_users_login_id_alive
  ON users (login_id)
  WHERE deleted_at IS NULL;
