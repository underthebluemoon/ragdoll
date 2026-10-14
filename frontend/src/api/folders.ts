import type { FolderItems, FolderSummary } from './types'
import { MOCK_FOLDERS, MOCK_ROOT_FOLDER_ID } from './mock/folders'
import { MOCK_DOCUMENTS } from './mock/documents'
import { delay } from './mock/delay'

export const ROOT_FOLDER_ID = MOCK_ROOT_FOLDER_ID

function toSummary({ id, name, depth }: FolderSummary): FolderSummary {
  return { id, name, depth }
}

/**
 * 루트부터 현재 위치까지 폴더 경로를 서버에 요청
 * @param folderId 현재 폴더 아이디
 * @returns 루트부터 현재 위치까지 폴더 경로. 없거나 권한 밖이면 undefined
 */
export function getFolderPath(folderId: string): Promise<FolderSummary[] | undefined> {
  const path: FolderSummary[] = []
  let current = MOCK_FOLDERS.find(folder => folder.id === folderId)
  if (!current) return delay(undefined)

  while (current) {
    path.unshift(toSummary(current))
    const parentId: string | null = current.parentId
    current = parentId === null ? undefined : MOCK_FOLDERS.find(folder => folder.id === parentId)
  }
  return delay(path)
}

/**
 * 현재 폴더의 아이템(폴더, 문서 등)을 서버에 요청
 * @param folderId 현재 폴더 아이디
 * @returns 현재 폴더 아이템(폴더, 문서 등)들. 없거나 권한 밖이면 undefined
 */
export function getFolderItems(folderId: string): Promise<FolderItems | undefined> {
  if (!MOCK_FOLDERS.some(folder => folder.id === folderId)) return delay(undefined)

  return delay({
    folders: MOCK_FOLDERS.filter(folder => folder.parentId === folderId).map(toSummary),
    documents: MOCK_DOCUMENTS.filter(doc => doc.folderId === folderId),
  })
}
