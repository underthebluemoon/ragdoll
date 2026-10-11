/**
 * 가운데 영역
 */

// components
import CenterTab from './CenterTab'
import DocumentViewer from './DocumentViewer'
import DocumentTable from './DocumentTable'

// types
import type { DocTab } from '../../App'
import type { Folder } from '../../api/types'


interface Props {
  tabs: DocTab[]
  activeTabId: string
  folders: Folder[]
  currentFolderId: string | null
  onSelectTab: (id: string) => void
  onCloseTab: (docId: string) => void
  onCloseAllTabs: () => void
  onSelectDoc: (docId: string, title: string) => void
  onOpenFolder: (folderId: string | null) => void
}

function CenterArea({ tabs, activeTabId, folders, currentFolderId, onSelectTab, onCloseTab, onCloseAllTabs, onSelectDoc, onOpenFolder }: Props) {
  const activeDoc = tabs.find(t => t.docId === activeTabId)

  return (
    <main className="flex min-w-90 flex-1 flex-col bg-surface lg:min-w-100">
      {/* 탭 */}
      <CenterTab 
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={onSelectTab}
        onCloseTab={onCloseTab}
        onCloseAllTabs={onCloseAllTabs}
      />

      {/* 뷰어 (경로 줄은 DocumentViewer 안에 있음) */}
      {activeDoc ? (
        <DocumentViewer
          tab={activeDoc}
          folders={folders}
          onSelectFolder={onOpenFolder}
        />
      ) : (
        <DocumentTable
          folders={folders}
          currentFolderId={currentFolderId}
          onOpenFolder={onOpenFolder}
          onSelectDoc={onSelectDoc}
        />
      )}

    </main>
  )
}

export default CenterArea
