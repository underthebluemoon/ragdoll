// components
import Sidebar from './components/sidebar/Sidebar'
import CenterArea from './components/documents/CenterArea'
import ChatPanel from './components/chat/ChatPanel'

// api
import { getDocument } from './api/documents'

// utils
import { folderPath } from './utils/path'

// hooks
import { useEffect, useEffectEvent } from 'react'
import { useNavigate } from 'react-router'
import useCenterLocation from './hooks/useCenterLocation'

// stores
import { useTabStore } from './stores/tabStore'
import { useFolderStore } from './stores/folderStore'


function App() {
  // ===== hooks =====
  const navigate = useNavigate()
  const { activeTabId, folderParam } = useCenterLocation()

  // ===== 폴더 제어 =====
  const fetchFolders = useFolderStore(state => state.fetchFolders)

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  // 마지막에 위치했던 폴더 경로 기억
  const lastFolderId = useFolderStore(state => state.lastFolderId)
  const setLastFolderId = useFolderStore(state => state.setLastFolderId)

  useEffect(() => {
    if (activeTabId === 'home') setLastFolderId(folderParam)
  }, [activeTabId, folderParam, setLastFolderId])

  // ===== 탭 제어 =====
  // 주소에 있는 문서인데 탭이 없으면 탭을 새로 열기 (새로고침, 공유 링크, 닫은 탭으로 뒤로가기)
  // 문서 정보(제목)를 서버에서 받아서 탭 추가. 없거나 권한 밖이면 문서함으로 (replace)
  const tabs = useTabStore(state => state.tabs)
  const putTab = useTabStore(state => state.putTab)

  // 탭의 activeTabId 중, 경로의 activeTabId가 없는 경우
  const missingDocId = (activeTabId !== 'home' && !tabs.some(t => t.docId === activeTabId)) ? activeTabId : null

  const goBackToFolder = useEffectEvent(() => {
    navigate(folderPath(lastFolderId), { replace: true })
  })

  useEffect(() => {
    if (!missingDocId) return
    // 탭 목록 중, 주소의 activeTabId 가 없는 경우만

    let ignore = false
    getDocument(missingDocId).then(doc => {
      if (ignore) return

      if (doc) {
        putTab(doc.id, doc.title)
      } else {
        goBackToFolder()
      }
    })
    return () => {
      ignore = true
    }
  }, [missingDocId, putTab])

  return (
    <div className="flex h-screen min-w-180 bg-background text-foreground">

      {/* 사이드바 */}
      <Sidebar
        // onSelectDoc={openDocTab}
      />

      {/* 가운데 영역 - 폴더, 문서 뷰어 */}
      <CenterArea />

      {/* 채팅 패널 */}
      <ChatPanel />

    </div>
  )
}

export default App
