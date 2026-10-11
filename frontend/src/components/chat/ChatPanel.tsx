/**
 * 채팅 영역
 */


// library
import { Sparkles } from 'lucide-react'

// components
import MessageList from './MessageList'
import ChatInput from './ChatInput'

//types
import type { ChatMessage } from '../../api/types'

// hooks
import { useEffect, useRef, useState } from 'react'

// utils
import storage from '../../utils/localstorage'

// 채팅 폭 범위 (px)
const MIN_CHAT_WIDTH = 280
const MAX_CHAT_WIDTH = 560

// 저장된 폭 불러오기. 저장값이 범위 밖이면(직접 고친 값 등) 범위 안으로 맞춤
function getInitialChatWidth() {
  return Math.min(Math.max(storage.getChatWidth(), MIN_CHAT_WIDTH), MAX_CHAT_WIDTH)
}

interface Props {
  onSelectSource: (docId: string, title: string, highlightChunkId?: string) => void
}

function ChatPanel({ onSelectSource }: Props) {

  // ===== api =====
  const [messages, setMessages] = useState<ChatMessage[]>([])

  function send(input: string) {
    // 임시 mock 응답 — 나중에 api/chat.ts (SSE 스트리밍)로 교체
    setMessages(prev => [
      ...prev,
      { role: 'user', content: input },
      {
        role: 'assistant',
        content: '(mock) 연차는 15일입니다.',
        sources: [
          { docId: 'demo-1', title: '취업규칙 2026', chunkId: 'c-22', startOffset: 120, endOffset: 260 },
        ],
      },
    ])
  }

  // ===== resize =====
  const [chatWidth, setChatWidth] = useState(getInitialChatWidth)
  const [isDragging, setIsDragging] = useState(false)
  const asideRef = useRef<HTMLElement>(null)

  // 마우스 위치로 폭 계산 → 마우스를 떼면 끝
  useEffect(() => {
    if (!isDragging) return
    // 드래그 중에만
    
    /**
     * 채팅 영역이 넓어질 수 있는 최대 폭 = 창 폭 - (문서 왼쪽 끝 + 문서 최소 폭)
     * 단, MAX_CHAT_WIDTH는 넘지 않음
     * @returns 채팅 영역이 넓어질 수 있는 최대 폭 / 혹은 MAX_CHAT_WIDTH
     */
    function getMaxWidth() {
     // 문서 영역 요소
     const doc = asideRef.current?.previousElementSibling
     // 문서 요소 찾지 못하면 최대값 적용
     if (!doc) return MAX_CHAT_WIDTH
     // 문서 왼쪽 끝 좌표
     const docLeft = doc.getBoundingClientRect().left
     // 문서 최소 폭
     const docMin = parseFloat(getComputedStyle(doc).minWidth) || 0
     
     return Math.min(window.innerWidth - docLeft - docMin, MAX_CHAT_WIDTH)
    }
    
    // 이번 드래그에서 마지막으로 계산한 폭 (마우스를 뗄 때 저장용)
    let lastWidth: number | null = null

    /**
     * 포인터 움직임 계산. chatWidth 상태 값 저장.
     * @param e : PointerEvent
     */
    function handlePointerMove(e: PointerEvent) {
      // (창 오른쪽 끝 − 마우스 x) = 채팅 폭
      const next = window.innerWidth - e.clientX
      // 범위 밖이면 잘라냄: 최솟값보다 작으면 최솟값, 최댓값보다 크면 최댓값
      lastWidth = Math.min(Math.max(next, MIN_CHAT_WIDTH), getMaxWidth())
      setChatWidth(lastWidth)
    }

    /**
     * 드래그 상태 끄기. 로컬 스토리지에 최종 width 저장
     */
    function handlePointerUp() {
      // 움직이지 않고 클릭만 했으면 저장할 것 없음
      if (lastWidth !== null) storage.setChatWidth(lastWidth)
      setIsDragging(false)
    }

    // 끄는 동안 손잡이 밖으로 나가도 커서 유지 + 글자 선택 막기
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)

    return () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isDragging])

  return (
    // 폭은 state 관리 - 최소값: 280px
    <aside
      ref={asideRef}
      className="relative flex min-w-70 flex-col border-l border-border bg-surface"
      style={{ width: chatWidth }}
    >
      
      {/* 영역 구분선 - 드래그 중 색상 */}
      <div className={`absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 ${isDragging ? "bg-primary" : ""}`} />
      {/* 영역 손잡이 */}
      <div
        className="absolute top-1/2 left-0 z-10 h-8 w-2 -translate-x-1/2 -translate-y-1/2 cursor-col-resize rounded-full border border-border bg-background hover:bg-surface"
        onPointerDown={() => setIsDragging(true)}
      />

      {/* 왼쪽 탭 줄과 같은 높이. 탭과 같은 높이로 설정 */}
      <header className="flex h-11 shrink-0 items-end px-4 pb-1.75 text-sm font-medium">
        <span className="flex items-center gap-2">
          <Sparkles className="size-4 text-ai" />
          채팅 제목
        </span>
      </header>

      <MessageList 
        messages={messages}
        onSelectSource={onSelectSource}
      />

      <ChatInput
        onSend={send}
      />

    </aside>
  )
}

export default ChatPanel
