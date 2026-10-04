// API 계약 타입 — 백엔드 DTO의 명세서 역할

export interface User {
  id: string
  name: string
  department: string
  rank: number
}

export interface Document {
  id: string
  title: string
  department: string
  uploader: string
  createdAt: string
  tags: string[]
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
