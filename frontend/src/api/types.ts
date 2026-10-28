/**
 * API types - 백엔드 DTO의 명세서 역할
 */

// 사용자 (백엔드 API 아직 없음 - 로그인 만들 때 맞출 것)
export interface User {
  id: string
  name: string
  department: string
  rank: number
}

/**
 * 백엔드에서 오는 응답 형식
 * name: 응답 코드 이름 (SUCCESS, FOLDER_NOT_FOUND 등)
 * code: 응답 코드 (S000, F001 등)
 * data: 실제 내용. 에러일 때는 null
 */
export interface ResponseCodeDTO<T> {
  name: string,
  code: string,
  data: T
}

/**
 * 문서 요약 :
 * id, title, folderId, uploader(name), createdAt, updatedAt
 */
export interface DocumentSummary {
  id: number
  title: string
  folderId: number
  uploader: string
  createdAt: string   // 생성일 (YYYY-MM-DD)
  updatedAt: string   // 마지막 수정일 (YYYY-MM-DD)
}

/**
 * 폴더 요약 :
 *  id, name, depth
 */
export interface FolderSummary {
  id: number
  name: string
  depth: number
}

/**
 * 현재 폴더 위치의 아이템들 : 폴더 요약 (FolderSummary[]) + 문서 요약 (DocumentSummary[])
 */
export interface FolderItemsResponse {
  folders: FolderSummary[]
  documents: DocumentSummary[]
}

/**
 * assitant 답변 출처  (offset은 문서 내 하이라이트용)
 */
export interface SourceRef {
  docId: number
  title: string
  chunkId: string
  startOffset: number
  endOffset: number
}

/**
 * 채팅 메세지 :
 * role(user|assistant), content, sources?
 */
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  sources?: SourceRef[]
}
