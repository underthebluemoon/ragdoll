/**
 * 가운데 영역
 */

import type { DocTab } from '../../App'
import CenterTab from './CenterTab'
import DocumentViewer from './DocumentViewer'
import DocumentTable from './DocumentTable'

interface Props {
  tabs: DocTab[]
  activeTabId: string
  onSelectTab: (id: string) => void
  onCloseTab: (docId: string) => void
  onSelectDoc: (docId: string, title: string) => void
}

function CenterArea({ tabs, activeTabId, onSelectTab, onCloseTab, onSelectDoc }: Props) {
  const activeDoc = tabs.find(t => t.docId === activeTabId)


  return (
    <main className="flex min-w-0 flex-1 flex-col">
        <CenterTab 
          tabs={tabs}
          activeTabId={activeTabId}
          onSelectTab={onSelectTab}
          onCloseTab={onCloseTab}
        />

      {activeDoc ? (
        <DocumentViewer 
          tab={activeDoc}
        />
      ) : (
        <DocumentTable 
          onSelectDoc={onSelectDoc}
        />
      )}

    </main>
  )
}

export default CenterArea
