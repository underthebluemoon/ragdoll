INSERT INTO document_permissions (document_id, department_id, min_rank_id, access)
VALUES
  (
    (SELECT id FROM documents WHERE name = '3분기 법인세 중간예납 자료'),
    (SELECT id FROM departments WHERE name = '재무팀'),
    (SELECT id FROM ranks WHERE name = '과장'),
    'READ'
  );
