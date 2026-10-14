import type { Document } from './types'
import { MOCK_DOCUMENTS } from './mock/documents'
import { delay } from './mock/delay'

/**
 * 문서 하나를 서버에 요청
 * @param docId 문서 아이디
 * @returns 문서 객체 { id, title, folderId, uploader, updatedAt } | 없거나 권한 밖이면 undefined
 */
export function getDocument(docId: string): Promise<Document | undefined> {
  const doc = MOCK_DOCUMENTS.find(item => item.id === docId)
  return new Promise(resolve => setTimeout(() => resolve(doc), 300))
}

export function getDocumentsByIds(docIds: string[]): Promise<Document[]> {
  const docs = docIds
    .map(docId => MOCK_DOCUMENTS.find(doc => doc.id === docId))
    .filter(doc => doc !== undefined);
  return delay(docs);
}
