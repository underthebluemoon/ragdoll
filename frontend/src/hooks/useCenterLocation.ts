// utils
import { DOC_PATH } from '../utils/path'

// hooks
import { useMatch, useSearchParams } from 'react-router'

export default function useCenterLocation() {
  const docMatch = useMatch(DOC_PATH)
  const [searchParams] = useSearchParams()

  const activeTabId = docMatch?.params.docId ?? 'home'
  const folderParam = searchParams.get('folder')

  return {
    activeTabId,
    folderParam,
  }
}
