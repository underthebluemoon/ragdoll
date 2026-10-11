import type { Document } from './types'
import { MOCK_DOCUMENTS } from './mock/documents'

// 한 폴더 안의 문서 목록 (GET /api/documents?folderId=...)
// 권한 필터는 서버가 걸어서, 볼 수 없는 문서는 처음부터 안 내려옴
// 지금은 가짜 데이터를 0.3초 뒤에 돌려줌. 백엔드가 생기면 이 함수 안만 fetch로 바꾸면 됨
export function getDocuments(folderId: string): Promise<Document[]> {
  const documents = MOCK_DOCUMENTS.filter(doc => doc.folderId === folderId)
  return new Promise(resolve => setTimeout(() => resolve(documents), 300))
}

// 문서 하나 (GET /api/documents/{id}). 없거나 권한 밖이면 undefined
// (진짜 서버는 권한 밖 문서도 "없음"으로 응답하기로 했음)
export function getDocument(docId: string): Promise<Document | undefined> {
  const doc = MOCK_DOCUMENTS.find(item => item.id === docId)
  return new Promise(resolve => setTimeout(() => resolve(doc), 300))
}
