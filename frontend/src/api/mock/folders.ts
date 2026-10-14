// 김대리(재무팀)가 볼 수 있는 폴더라고 가정.
// 권한 밖 폴더(인사팀 등)는 서버가 처음부터 안 내려주므로 목록에 없음
export interface MockFolder {
  id: string
  name: string
  parentId: string | null
  depth: number
}

export const MOCK_ROOT_FOLDER_ID = 'f-root'

export const MOCK_FOLDERS: MockFolder[] = [
  { id: MOCK_ROOT_FOLDER_ID, name: '문서함', parentId: null, depth: 0 },

  { id: 'f-fin', name: '재무팀', parentId: MOCK_ROOT_FOLDER_ID, depth: 1 },
  { id: 'f-fin-closing', name: '결산', parentId: 'f-fin', depth: 2 },
  { id: 'f-fin-closing-2026', name: '2026', parentId: 'f-fin-closing', depth: 3 },
  { id: 'f-fin-closing-2026-q3', name: '3분기', parentId: 'f-fin-closing-2026', depth: 4 },
  { id: 'f-fin-closing-2026-q3-evidence', name: '증빙', parentId: 'f-fin-closing-2026-q3', depth: 5 },
  { id: 'f-fin-rules', name: '규정', parentId: 'f-fin', depth: 2 },
  { id: 'f-fin-meeting', name: '회의록', parentId: 'f-fin', depth: 2 },

  { id: 'f-all', name: '전사 공지', parentId: MOCK_ROOT_FOLDER_ID, depth: 1 },
  { id: 'f-all-notice', name: '공지사항', parentId: 'f-all', depth: 2 },
  { id: 'f-all-rules', name: '사내 규정', parentId: 'f-all', depth: 2 },
]
