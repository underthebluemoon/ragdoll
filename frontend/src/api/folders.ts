import type { Folder } from './types'
import { MOCK_FOLDERS } from './mock/folders'

// 로그인한 사용자가 볼 수 있는 폴더 목록 (GET /api/folders)
// 지금은 가짜 데이터를 0.3초 뒤에 돌려줌. 백엔드가 생기면 이 함수 안만 fetch로 바꾸면 되고, 쓰는 쪽은 그대로
export function getFolders(): Promise<Folder[]> {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_FOLDERS), 300))
}
