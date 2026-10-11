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

// 폴더: 부서 → 분류 2단계. 부서의 children = 분류 목록, 분류의 children = 빈 배열
// (나중에 더 깊은 폴더가 필요하면 분류에도 children을 채우면 됨)
export interface Folder {
  id: string
  name: string
  children: Folder[]
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
