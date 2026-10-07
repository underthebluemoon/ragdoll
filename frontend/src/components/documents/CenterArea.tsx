/**
 * 가운데 영역
 */

import styles from './CenterArea.module.css'

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
    <main className={styles.container}>
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
