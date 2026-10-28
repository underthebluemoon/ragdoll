// api
import { ROOT_FOLDER_ID } from '../api/folders'

// utils
import { DOC_ROUTE, HOME_TAB_ID, parseId, type TabId } from '../utils/routingUtil'

// hooks
import { useMatch, useSearchParams } from 'react-router'

export default function useCenterLocation() {
  const docMatch = useMatch(DOC_ROUTE)
  const [searchParams] = useSearchParams()

  const activeTabId: TabId = parseId(docMatch?.params.docId) ?? HOME_TAB_ID;
  const folderId = parseId(searchParams.get('folder')) ?? ROOT_FOLDER_ID;

  return {
    activeTabId,
    folderId,
  }
}
