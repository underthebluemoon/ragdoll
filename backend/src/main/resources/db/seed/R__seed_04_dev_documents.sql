INSERT INTO documents (title, folder_id, uploader_id, updater_id, file_path, file_type, file_size, created_at, updated_at)
VALUES
  (
    '2026 3분기 결산 보고서',
    (SELECT id FROM folders WHERE name = '결산'),
    (SELECT id FROM users WHERE login_id = 'minsu.park@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'minsu.park@ragdoll.dev'),
    'documents/2026/10/seed-d101.pdf',
    'application/pdf',
    482304,
    '2026-10-01 09:30:00+09',
    '2026-10-01 09:30:00+09'
  ),
  (
    '2026 2분기 결산 보고서',
    (SELECT id FROM folders WHERE name = '결산'),
    (SELECT id FROM users WHERE login_id = 'minsu.park@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'minsu.park@ragdoll.dev'),
    'documents/2026/07/seed-d102.pdf',
    'application/pdf',
    451584,
    '2026-07-03 10:00:00+09',
    '2026-07-03 10:00:00+09'
  ),
  (
    '출장비 정산 내역 (9월)',
    (SELECT id FROM folders WHERE name = '결산'),
    (SELECT id FROM users WHERE login_id = 'mirae@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'mirae@ragdoll.dev'),
    'documents/2026/10/seed-d103.xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    38912,
    '2026-10-05 14:20:00+09',
    '2026-10-05 14:20:00+09'
  ),
  (
    '3분기 법인세 중간예납 자료',
    (SELECT id FROM folders WHERE name = '3분기'),
    (SELECT id FROM users WHERE login_id = 'minsu.park@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'minsu.park@ragdoll.dev'),
    'documents/2026/10/seed-d131.pdf',
    'application/pdf',
    327680,
    '2026-10-08 11:00:00+09',
    '2026-10-08 11:00:00+09'
  ),
  (
    '3분기 법인카드 영수증 묶음',
    (SELECT id FROM folders WHERE name = '증빙'),
    (SELECT id FROM users WHERE login_id = 'mirae@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'mirae@ragdoll.dev'),
    'documents/2026/10/seed-d132.pdf',
    'application/pdf',
    2097152,
    '2026-10-09 16:40:00+09',
    '2026-10-09 16:40:00+09'
  ),
  (
    '출장비 정산 규정',
    (SELECT id FROM folders WHERE name = '규정'),
    (SELECT id FROM users WHERE login_id = 'mirae@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'mirae@ragdoll.dev'),
    'documents/2026/07/seed-d111.pdf',
    'application/pdf',
    196608,
    '2026-07-02 09:00:00+09',
    '2026-07-02 09:00:00+09'
  ),
  (
    '법인카드 사용 지침',
    (SELECT id FROM folders WHERE name = '규정'),
    (SELECT id FROM users WHERE login_id = 'jihun.kim@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'jihun.kim@ragdoll.dev'),
    'documents/2026/03/seed-d112.pdf',
    'application/pdf',
    155648,
    '2026-03-15 13:10:00+09',
    '2026-03-15 13:10:00+09'
  ),
  (
    '주간 회의록',
    (SELECT id FROM folders WHERE name = '회의록'),
    (SELECT id FROM users WHERE login_id = 'jihun.kim@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'jihun.kim@ragdoll.dev'),
    'documents/2026/10/seed-d121.docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    24576,
    '2026-10-06 17:30:00+09',
    '2026-10-06 17:30:00+09'
  ),
  (
    '주간 회의록',
    (SELECT id FROM folders WHERE name = '회의록'),
    (SELECT id FROM users WHERE login_id = 'jihun.kim@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'jihun.kim@ragdoll.dev'),
    'documents/2026/09/seed-d122.docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    22528,
    '2026-09-29 17:30:00+09',
    '2026-09-29 17:30:00+09'
  ),
  (
    '결산 일정 회의록',
    (SELECT id FROM folders WHERE name = '회의록'),
    (SELECT id FROM users WHERE login_id = 'minsu.park@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'minsu.park@ragdoll.dev'),
    'documents/2026/09/seed-d123.docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    30720,
    '2026-09-20 15:00:00+09',
    '2026-09-20 15:00:00+09'
  ),
  (
    '추석 연휴 근무 안내',
    (SELECT id FROM folders WHERE name = '공지사항'),
    (SELECT id FROM users WHERE login_id = 'seoyeon.park@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'seoyeon.park@ragdoll.dev'),
    'documents/2026/09/seed-d201.pdf',
    'application/pdf',
    102400,
    '2026-09-10 10:00:00+09',
    '2026-09-10 10:00:00+09'
  ),
  (
    '사내 보안 수칙 변경 안내',
    (SELECT id FROM folders WHERE name = '공지사항'),
    (SELECT id FROM users WHERE login_id = 'junho.lee@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'junho.lee@ragdoll.dev'),
    'documents/2026/08/seed-d202.pdf',
    'application/pdf',
    143360,
    '2026-08-21 11:30:00+09',
    '2026-08-21 11:30:00+09'
  ),
  (
    '취업규칙 2026',
    (SELECT id FROM folders WHERE name = '사내 규정'),
    (SELECT id FROM users WHERE login_id = 'jieun.park@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'jieun.park@ragdoll.dev'),
    'documents/2026/07/seed-demo1.pdf',
    'application/pdf',
    614400,
    '2026-07-01 09:00:00+09',
    '2026-07-01 09:00:00+09'
  ),
  (
    '취업규칙 2025',
    (SELECT id FROM folders WHERE name = '사내 규정'),
    (SELECT id FROM users WHERE login_id = 'jieun.park@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'jieun.park@ragdoll.dev'),
    'documents/2025/07/seed-demo2.pdf',
    'application/pdf',
    593920,
    '2025-07-01 09:00:00+09',
    '2025-07-01 09:00:00+09'
  ),
  (
    '취업규칙 2024',
    (SELECT id FROM folders WHERE name = '사내 규정'),
    (SELECT id FROM users WHERE login_id = 'jieun.park@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'jieun.park@ragdoll.dev'),
    'documents/2024/07/seed-demo3.pdf',
    'application/pdf',
    573440,
    '2024-07-01 09:00:00+09',
    '2024-07-01 09:00:00+09'
  ),
  (
    '2026 급여 테이블',
    (SELECT id FROM folders WHERE name = '인사팀'),
    (SELECT id FROM users WHERE login_id = 'jieun.park@ragdoll.dev'),
    (SELECT id FROM users WHERE login_id = 'jieun.park@ragdoll.dev'),
    'documents/2026/01/seed-hr-salary.xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    61440,
    '2026-01-05 10:00:00+09',
    '2026-01-05 10:00:00+09'
  );
