import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import CenterArea from './components/documents/CenterArea'
import ChatPanel from './components/chat/ChatPanel'
import './App.css'

// 탭 하나 = 열린 문서. 홈(테이블 뷰)은 배열 밖의 고정 탭.
export interface DocTab {
  docId: string
  title: string
  highlightChunkId?: string
}

function App() {
  const [tabs, setTabs] = useState<DocTab[]>([])
  const [activeTabId, setActiveTabId] = useState<string>('home')

  // 탭 열기
  function openDocTab(docId: string, title: string, highlightChunkId?: string) {
    setTabs(prev =>
      prev.some(t => t.docId === docId)
        ? prev.map(t => (t.docId === docId ? { ...t, highlightChunkId } : t))
        : [...prev, { docId, title, highlightChunkId }],
    )
    setActiveTabId(docId)
  }

  function closeTab(docId: string) {
    setTabs(prev => prev.filter(t => t.docId !== docId))
    if (activeTabId === docId) setActiveTabId('home')
  }

  return (
    <div className="app-layout">

      <Sidebar 
        // onSelectDoc={openDocTab} 
      />


      <CenterArea
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={setActiveTabId}
        onCloseTab={closeTab}
        onSelectDoc={openDocTab}
      />
      <ChatPanel onSelectSource={openDocTab} />
    </div>
  )
}

export default App
