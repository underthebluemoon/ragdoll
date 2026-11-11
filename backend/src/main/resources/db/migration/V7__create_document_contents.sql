CREATE TABLE document_contents (
  document_id BIGINT PRIMARY KEY REFERENCES documents (id),
  content TEXT NOT NULL
);
