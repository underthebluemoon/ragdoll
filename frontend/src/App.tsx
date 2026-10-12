// components
import Sidebar from './components/sidebar/Sidebar'
import CenterArea from './components/documents/CenterArea'
import ChatPanel from './components/chat/ChatPanel'

// types
import type { Folder } from './api/types'

// api
import { getFolders } from './api/folders'
import { getDocument } from './api/documents'

// hooks
import { useEffect, useEffectEvent, useState } from 'react'
import { useMatch, useNavigate, useSearchParams } from 'react-router'

// 탭 하나 = 열린 문서. 홈(폴더)은 배열 밖, 고정 탭.
export interface DocTab {
  docId: string
  title: string
  highlightChunkId?: string
}

function App() {
  const navigate = useNavigate()

  // ===== 주소 읽기 =====
  // /docs/:docId → 그 문서 탭, 그 밖(/, /?folder=<id>) → 문서함
  const docMatch = useMatch('/docs/:docId')
  const activeTabId = docMatch?.params.docId ?? 'home'
  // 쿼리 스트링
  const [searchParams] = useSearchParams()
  // folder 쿼리. 없으면 null = 맨 위 폴더
  const folderParam = searchParams.get('folder')

  /**
   * 폴더 아이디로 주소 문자열 만들기
   * @param folderId 폴더 아이디 
   * @returns path 문자열
   */
  function folderPath(folderId: string | null) {
    return folderId ? `/?folder=${folderId}` : '/'
  }

  // ===== 폴더 제어 =====
  // DocumentTable과 DocumentViewer의 경로 줄(폴더 조각을 누르면 그 폴더로)이 같이 쓰므로 App에 둠
  const [folders, setFolders] = useState<Folder[]>([])

  useEffect(() => {
    let ignore = false
    getFolders().then(data => {
      if (!ignore) setFolders(data)
    })
    // 응답이 오기 전에 이 효과가 정리되면 결과를 버림
    return () => {
      ignore = true
    }
  }, [])

  // 마지막에 위치했던 폴더 경로 기억
  const [lastFolderId, setLastFolderId] = useState<string | null>(folderParam)
  if (activeTabId === 'home' && folderParam !== lastFolderId) {
    setLastFolderId(folderParam)
  }

  /**
   * 폴더 열기. 홈 탭으로 가서 그 폴더 안을 보여줌. null인 경우, 맨 위
   * @param folderId 폴더 아이디
   */
  function openFolder(folderId: string | null) {
    navigate(folderPath(folderId))
  }

  // ===== 탭 제어 =====
  const [tabs, setTabs] = useState<DocTab[]>([])

  // 주소에 있는 문서인데 탭이 없으면 탭을 새로 열기 (새로고침, 공유 링크, 닫은 탭으로 뒤로가기)
  // 문서 정보(제목)를 서버에서 받아서 탭 추가. 없거나 권한 밖이면 문서함으로 (replace)

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
        setTabs(prev => (prev.some(t => t.docId === doc.id) ? prev : [...prev, { docId: doc.id, title: doc.title }]))
      } else {
        goBackToFolder()
      }
    })
    return () => {
      ignore = true
    }
  }, [missingDocId])

  /**
   * 탭 선택 - 주소를 바꾸면 위의 "주소 읽기"가 켜진 탭을 정함 (push: 방문 기록에 남음)
   * @param id 문서 아이디 | 'home'
   */
  function selectTab(id: string) {
    navigate(id === 'home' ? folderPath(lastFolderId) : `/docs/${id}`)
  }

  /**
   * 문서 아이디로 탭 생성 후 그 탭으로 이동
   * @param docId 문서 아이디
   * @param title 문서 제목
   * @param highlightChunkId
   */
  function openDocTab(docId: string, title: string, highlightChunkId?: string) {
    setTabs(prev =>
      prev.some(t => t.docId === docId)
      ? prev.map(t => (t.docId === docId ? { ...t, highlightChunkId } : t))
      : [...prev, { docId, title, highlightChunkId }],
    )
    navigate(`/docs/${docId}`)
  }

  /**
   * 탭 닫기. 보고 있던 탭이면 문서함으로 (replace: 닫은 문서로 뒤로가기 되지 않게)
   * @param docId 문서 아이디
   */
  function closeTab(docId: string) {
    setTabs(prev => prev.filter(t => t.docId !== docId))
    if (activeTabId === docId) navigate(folderPath(lastFolderId), { replace: true })
  }

  /**
   * 열려있는 모든 문서 닫기
   */
  function closeAllTabs() {
    setTabs([])
    if (activeTabId !== 'home') navigate(folderPath(lastFolderId), { replace: true })
  }


  return (
    <div className="flex h-screen min-w-180 bg-background text-foreground">

      {/* 사이드바 */}
      <Sidebar
        // onSelectDoc={openDocTab}
      />

      {/* 가운데 영역 - 폴더, 문서 뷰어 */}
      <CenterArea
        tabs={tabs}
        activeTabId={activeTabId}
        folders={folders}
        currentFolderId={folderParam}
        onSelectTab={selectTab}
        onCloseTab={closeTab}
        onCloseAllTabs={closeAllTabs}
        onSelectDoc={openDocTab}
        onOpenFolder={openFolder}
      />

      {/* 채팅 패널 */}
      <ChatPanel onSelectSource={openDocTab} />
    </div>
  )
}

export default App
