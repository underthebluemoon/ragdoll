CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (login_id, password_hash, password_change_required, name, role)
VALUES (
  'ragdoll',
  '{bcrypt}' || crypt('123', gen_salt('bf')),
  false,
  '관리자',
  'ADMIN'
);

INSERT INTO users (login_id, password_hash, password_change_required, name, department_id, rank_id)
VALUES
  (
    'minsu.park@ragdoll.dev',
    '{bcrypt}' || crypt('123', gen_salt('bf')),
    false,
    '박민수',
    (SELECT id FROM departments WHERE name = '재무팀'),
    (SELECT id FROM ranks WHERE name = '과장')
  ),
  (
    'jihun.kim@ragdoll.dev',
    '{bcrypt}' || crypt('123', gen_salt('bf')),
    false,
    '김지훈',
    (SELECT id FROM departments WHERE name = '재무팀'),
    (SELECT id FROM ranks WHERE name = '대리')
  ),
  (
    'mirae@ragdoll.dev',
    '{bcrypt}' || crypt('123', gen_salt('bf')),
    false,
    '미래',
    (SELECT id FROM departments WHERE name = '재무팀'),
    (SELECT id FROM ranks WHERE name = '사원')
  ),
  (
    'haneul.jung@ragdoll.dev',
    '{bcrypt}' || crypt('123', gen_salt('bf')),
    false,
    '정하늘',
    (SELECT id FROM departments WHERE name = '재무팀'),
    (SELECT id FROM ranks WHERE name = '차장')
  ),
  (
    'jieun.park@ragdoll.dev',
    '{bcrypt}' || crypt('123', gen_salt('bf')),
    false,
    '박지은',
    (SELECT id FROM departments WHERE name = '인사팀'),
    (SELECT id FROM ranks WHERE name = '차장')
  ),
  (
    'yuna.choi@ragdoll.dev',
    '{bcrypt}' || crypt('123', gen_salt('bf')),
    false,
    '최유나',
    (SELECT id FROM departments WHERE name = '인사팀'),
    (SELECT id FROM ranks WHERE name = '대리')
  ),
  (
    'seoyeon.park@ragdoll.dev',
    '{bcrypt}' || crypt('123', gen_salt('bf')),
    false,
    '박서연',
    (SELECT id FROM departments WHERE name = '총무팀'),
    (SELECT id FROM ranks WHERE name = '과장')
  ),
  (
    'junho.lee@ragdoll.dev',
    '{bcrypt}' || crypt('123', gen_salt('bf')),
    false,
    '이준호',
    (SELECT id FROM departments WHERE name = '정보보안팀'),
    (SELECT id FROM ranks WHERE name = '과장')
  ),
  (
    'doyun.han@ragdoll.dev',
    '{bcrypt}' || crypt('123', gen_salt('bf')),
    false,
    '한도윤',
    (SELECT id FROM departments WHERE name = '감사팀'),
    (SELECT id FROM ranks WHERE name = '과장')
  );
