import { useEffect, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import CenterArea from './components/documents/CenterArea'
import ChatPanel from './components/chat/ChatPanel'

import { getFolders } from './api/folders'
import type { Folder } from './api/types'

// 탭 하나 = 열린 문서. 홈(폴더 둘러보기)은 배열 밖의 고정 탭.
export interface DocTab {
  docId: string
  title: string
  highlightChunkId?: string
}

function App() {
  const [tabs, setTabs] = useState<DocTab[]>([])
  const [activeTabId, setActiveTabId] = useState<string>('home')

  // 폴더 목록과 "문서함에서 지금 보는 폴더"(null = 맨 위)
  // 문서 탭을 보다가 문서함으로 돌아와도 마지막으로 보던 폴더가 그대로 유지됨
  // 홈 화면과 문서 뷰어의 경로 줄(폴더 조각을 누르면 그 폴더로)이 같이 쓰므로 App에 둠
  const [folders, setFolders] = useState<Folder[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    getFolders().then(data => {
      if (!ignore) setFolders(data)
    })
    // 응답이 오기 전에 이 효과가 정리되면 결과를 버림 (개발 모드에서 효과가 두 번 실행될 때 등)
    return () => {
      ignore = true
    }
  }, [])

  // 폴더 열기 → 홈 탭으로 가서 그 폴더 안을 보여줌 (null = 맨 위)
  function openFolder(folderId: string | null) {
    setCurrentFolderId(folderId)
    setActiveTabId('home')
  }

  // 탭 열기
  function openDocTab(docId: string, title: string, highlightChunkId?: string) {
    setTabs(prev =>
      prev.some(t => t.docId === docId)
        ? prev.map(t => (t.docId === docId ? { ...t, highlightChunkId } : t))
        : [...prev, { docId, title, highlightChunkId }],
    )
    setActiveTabId(docId)
  }

  // 탭 닫기
  function closeTab(docId: string) {
    setTabs(prev => prev.filter(t => t.docId !== docId))
    if (activeTabId === docId) setActiveTabId('home')
  }

  // 모든 탭 닫기
  function closeAllTabs() {
    setTabs([])
    setActiveTabId('home')
  }

  return (
    <div className="flex h-screen min-w-180 bg-background text-foreground">

      <Sidebar
        // onSelectDoc={openDocTab}
      />


      <CenterArea
        tabs={tabs}
        activeTabId={activeTabId}
        folders={folders}
        currentFolderId={currentFolderId}
        onSelectTab={setActiveTabId}
        onCloseTab={closeTab}
        onCloseAllTabs={closeAllTabs}
        onSelectDoc={openDocTab}
        onOpenFolder={openFolder}
      />
      <ChatPanel onSelectSource={openDocTab} />
    </div>
  )
}

export default App
