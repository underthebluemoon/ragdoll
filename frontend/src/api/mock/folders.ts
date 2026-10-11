import type { Folder } from '../types'

// 김대리(재무팀)가 볼 수 있는 폴더라고 가정.
// 권한 밖 폴더(인사팀 등)는 서버가 처음부터 안 내려주므로 목록에 없음
export const MOCK_FOLDERS: Folder[] = [
  {
    id: 'f-fin',
    name: '재무팀',
    children: [
      { id: 'f-fin-closing', name: '결산', children: [] },
      { id: 'f-fin-rules', name: '규정', children: [] },
      { id: 'f-fin-meeting', name: '회의록', children: [] },
    ],
  },
  {
    id: 'f-all',
    name: '전사 공지',
    children: [
      { id: 'f-all-notice', name: '공지사항', children: [] },
      { id: 'f-all-rules', name: '사내 규정', children: [] },
    ],
  },
]
