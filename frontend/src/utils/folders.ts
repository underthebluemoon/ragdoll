import type { Folder } from '../api/types'

// 폴더 id로 맨 위 부서부터 그 폴더까지의 경로를 찾음. 예: 결산 → [재무팀, 결산]
// 폴더 안의 폴더를 같은 방식으로 다시 찾는 재귀 함수라 깊이가 늘어도 그대로 동작. 못 찾으면 빈 배열
export function findFolderPath(folders: Folder[], folderId: string): Folder[] {
  for (const folder of folders) {
    if (folder.id === folderId) return [folder]
    const childPath = findFolderPath(folder.children, folderId)
    if (childPath.length > 0) return [folder, ...childPath]
  }
  return []
}
