INSERT INTO document_permissions (document_id, department_id, min_rank_id, access)
VALUES
  (
    (SELECT id FROM documents WHERE title = '3분기 법인세 중간예납 자료'),
    (SELECT id FROM departments WHERE name = '재무팀'),
    (SELECT id FROM ranks WHERE name = '과장'),
    'READ'
  ),
  (
    (SELECT id FROM documents WHERE title = '감사 대응 회의록'),
    (SELECT id FROM departments WHERE name = '재무팀'),
    NULL,
    'READ'
  ),
  (
    (SELECT id FROM documents WHERE title = '감사 대응 회의록'),
    (SELECT id FROM departments WHERE name = '감사팀'),
    NULL,
    'READ'
  ),
  (
    (SELECT id FROM documents WHERE title = '2026 상반기 인사 평가'),
    (SELECT id FROM departments WHERE name = '인사팀'),
    (SELECT id FROM ranks WHERE name = '차장'),
    'READ'
  ),
  (
    (SELECT id FROM documents WHERE title = '2026 상반기 인사 평가'),
    (SELECT id FROM departments WHERE name = '감사팀'),
    NULL,
    'READ'
  ),
  (
    (SELECT id FROM documents WHERE title = '복리후생 규정'),
    (SELECT id FROM departments WHERE name = '인사팀'),
    NULL,
    'WRITE'
  );
