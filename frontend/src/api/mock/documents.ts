import type { Document } from '../types'

// 가짜 문서. folderId는 mock/folders.ts의 폴더 id
// demo-1~3은 채팅 가짜 응답의 출처(demo-1)와 맞춰둔 것
export const MOCK_DOCUMENTS: Document[] = [
  // 재무팀 / 결산
  { id: 'd-101', title: '2026 3분기 결산 보고서', folderId: 'f-fin-closing', uploader: '박과장', updatedAt: '2026-10-01' },
  { id: 'd-102', title: '2026 2분기 결산 보고서', folderId: 'f-fin-closing', uploader: '박과장', updatedAt: '2026-07-03' },
  { id: 'd-103', title: '출장비 정산 내역 (9월)', folderId: 'f-fin-closing', uploader: '미래', updatedAt: '2026-10-05' },

  { id: 'd-131', title: '3분기 법인세 중간예납 자료', folderId: 'f-fin-closing-2026-q3', uploader: '박과장', updatedAt: '2026-10-08' },
  { id: 'd-132', title: '3분기 법인카드 영수증 묶음', folderId: 'f-fin-closing-2026-q3-evidence', uploader: '미래', updatedAt: '2026-10-09' },

  // 재무팀 / 규정
  { id: 'd-111', title: '출장비 정산 규정', folderId: 'f-fin-rules', uploader: '미래', updatedAt: '2026-07-02' },
  { id: 'd-112', title: '법인카드 사용 지침', folderId: 'f-fin-rules', uploader: '김대리', updatedAt: '2026-03-15' },

  // 재무팀 / 회의록 — 이름이 같은 문서는 날짜로 구분되는지 확인용
  { id: 'd-121', title: '주간 회의록', folderId: 'f-fin-meeting', uploader: '김대리', updatedAt: '2026-10-06' },
  { id: 'd-122', title: '주간 회의록', folderId: 'f-fin-meeting', uploader: '김대리', updatedAt: '2026-09-29' },
  { id: 'd-123', title: '결산 일정 회의록', folderId: 'f-fin-meeting', uploader: '박과장', updatedAt: '2026-09-20' },

  // 전사 공지 / 공지사항
  { id: 'd-201', title: '추석 연휴 근무 안내', folderId: 'f-all-notice', uploader: '박총무', updatedAt: '2026-09-10' },
  { id: 'd-202', title: '사내 보안 수칙 변경 안내', folderId: 'f-all-notice', uploader: '이보안', updatedAt: '2026-08-21' },

  // 전사 공지 / 사내 규정
  { id: 'demo-1', title: '취업규칙 2026', folderId: 'f-all-rules', uploader: '박인사', updatedAt: '2026-07-01' },
  { id: 'demo-2', title: '취업규칙 2025', folderId: 'f-all-rules', uploader: '박인사', updatedAt: '2025-07-01' },
  { id: 'demo-3', title: '취업규칙 2024', folderId: 'f-all-rules', uploader: '박인사', updatedAt: '2024-07-01' },
]
