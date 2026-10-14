import { ROOT_FOLDER_ID } from '../api/folders'

/**
 * 폴더 아이디로 주소 문자열 만들기
 * @param folderId 폴더 아이디
 * @returns href 문자열
 */
export function folderHref(folderId: string) {
  return folderId === ROOT_FOLDER_ID ? '/' : `/?folder=${folderId}`
}

export const DOC_ROUTE = '/docs/:docId'
export const HOME_TAB_ID = 'home'

/**
 * 문서 아이디로 href 만들기. 단순 가공.
 * @param docId 문서 아이디
 * @returns href
 */
export function docHref(docId: string) {
  return `/docs/${docId}`
}
