/**
 * 가운데 영역 탭
 */

import type { DocTab } from '../../App'

interface Props {
  tabs: DocTab[]
  activeTabId: string
  onSelectTab: (id: string) => void
  onCloseTab: (docId: string) => void
}

function CenterTab({ tabs, activeTabId, onSelectTab, onCloseTab }: Props) {


  return (
    <div className="flex gap-1 border-b border-border px-2 pt-2">
      <button
        className={activeTabId === 'home' ? 'font-bold' : ''}
        onClick={() => onSelectTab('home')}
      >
        전체 문서
      </button>
      {tabs.map(tab => (
        <button
          key={tab.docId}
          className={activeTabId === tab.docId ? 'font-bold' : ''}
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
