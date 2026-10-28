import { ROOT_FOLDER_ID } from '../api/folders'

/**
 * 폴더 아이디로 주소 문자열 만들기
 * @param folderId 폴더 아이디
 * @returns href 문자열
 */
export function folderHref(folderId: number) {
  return folderId === ROOT_FOLDER_ID ? '/' : `/?folder=${folderId}`
}

export const DOC_ROUTE = '/docs/:docId'
export const HOME_TAB_ID = 'home'

export type TabId = number | typeof HOME_TAB_ID;

export function parseId(value: string | null | undefined): number | null {
  if (!value) return null;
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/**
 * 문서 아이디로 href 만들기. 단순 가공.
 * @param docId 문서 아이디
 * @returns href
 */
export function docHref(docId: number) {
  return `/docs/${docId}`
}
