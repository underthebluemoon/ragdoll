/**
 * 가운데 영역
 */

// components
import CenterTab from './CenterTab'
import DocumentViewer from './DocumentViewer'
import FolderBrowser from './FolderBrowser'

// utils
import { HOME_TAB_ID } from '../../utils/routingUtil'

// hooks
import useCenterLocation from '../../hooks/useCenterLocation'

// stores
import { useTabStore } from '../../stores/tabStore'


function CenterArea() {
  // ===== hooks =====
  const { activeTabId } = useCenterLocation()
  // ===== store =====
  const tabs = useTabStore(state => state.tabs)

  const activeDoc = tabs.find(t => t.docId === activeTabId)

  return (
    <main className="flex min-w-90 flex-1 flex-col bg-surface lg:min-w-100">
      {/* 탭 */}
      <CenterTab />

      {/* 뷰어 (경로 줄은 DocumentViewer 안에 있음) */}
      {activeDoc ? (
        <DocumentViewer
          activeDoc={activeDoc}
        />
      ) : activeTabId !== HOME_TAB_ID ? (
        // 주소로 들어온 문서의 탭을 만드는 중 (새로고침·공유 링크)
        <p className="p-6 text-sm text-muted-foreground">문서를 불러오는 중…</p>
      ) : (
        <FolderBrowser />
      )}

    </main>
  )
}

export default CenterArea
