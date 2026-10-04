/**
 * 가운데 영역 탭
 */

import styles from './CenterTab.module.css'

import type { DocTab } from '../../App'

interface Props {
  tabs: DocTab[]
  activeTabId: string
  onSelectTab: (id: string) => void
  onCloseTab: (docId: string) => void
}

function CenterTab({ tabs, activeTabId, onSelectTab, onCloseTab }: Props) {


  return (
    <div className={styles.container}>
      <button
        className={activeTabId === 'home' ? `${styles.tab} ${styles.active}` : styles.tab}
        onClick={() => onSelectTab('home')}
      >
        전체 문서
      </button>
      {tabs.map(tab => (
        <button
          key={tab.docId}
          className={activeTabId === tab.docId ? `${styles.tab} ${styles.active}` : styles.tab}
          onClick={() => onSelectTab(tab.docId)}
        >
          {tab.title}
          <span
            onClick={e => {
              e.stopPropagation()
              onCloseTab(tab.docId)
            }}
          >
            ✕
          </span>
        </button>
      ))}
    </div>
  )
}

export default CenterTab
