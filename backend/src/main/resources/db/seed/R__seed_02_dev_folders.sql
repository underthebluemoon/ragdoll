INSERT INTO folders (name, parent_id, depth)
VALUES
  ('재무팀', (SELECT id FROM folders WHERE name = '문서함'), 1),
  ('인사팀', (SELECT id FROM folders WHERE name = '문서함'), 1),
  ('전사 공지', (SELECT id FROM folders WHERE name = '문서함'), 1);

INSERT INTO folders (name, parent_id, depth)
VALUES
  ('결산', (SELECT id FROM folders WHERE name = '재무팀'), 2),
  ('규정', (SELECT id FROM folders WHERE name = '재무팀'), 2),
  ('회의록', (SELECT id FROM folders WHERE name = '재무팀'), 2),

  ('공지사항', (SELECT id FROM folders WHERE name = '전사 공지'), 2),
  ('사내 규정', (SELECT id FROM folders WHERE name = '전사 공지'), 2);

INSERT INTO folders (name, parent_id, depth)
VALUES
  ('2026', (SELECT id FROM folders WHERE name = '결산'), 3);

INSERT INTO folders (name, parent_id, depth)
VALUES
  ('3분기', (SELECT id FROM folders WHERE name = '2026'), 4);

INSERT INTO folders (name, parent_id, depth)
VALUES
  ('증빙', (SELECT id FROM folders WHERE name = '3분기'), 5);


