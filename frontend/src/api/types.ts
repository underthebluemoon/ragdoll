// API 계약 타입 — 백엔드 DTO의 명세서 역할

export interface User {
  id: string
  name: string
  department: string
  rank: number
}

// 문서 목록 한 줄에 필요한 정보. 부서·분류는 folderId로 폴더를 찾아서 알 수 있음
// (본문, 버전, 권한 등은 문서 조회 API를 만들 때 추가)
export interface Document {
  id: string
  title: string
  folderId: string
  uploader: string
  updatedAt: string   // 마지막 수정일 (YYYY-MM-DD)
}

export interface FolderSummary {
  id: string
  name: string
  depth: number
}

export interface FolderItems {
  folders: FolderSummary[]
  documents: Document[]
}

// 챗 답변의 출처 (offset은 문서 내 하이라이트용)
export interface SourceRef {
  docId: string
  title: string
  chunkId: string
  startOffset: number
  endOffset: number
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  sources?: SourceRef[]
}
