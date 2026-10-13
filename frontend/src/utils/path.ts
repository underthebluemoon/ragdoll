/**
 * 폴더 아이디로 주소 문자열 만들기
 * @param folderId 폴더 아이디 
 * @returns path 문자열
 */
export function folderPath(folderId: string | null) {
  return folderId ? `/?folder=${folderId}` : '/'
}

export const DOC_PATH = '/docs/:docId'

export function docPath(docId: string) {
  return `/docs/${docId}`
}