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
import { useState } from 'react'

interface Props {
  onSelectSource: (docId: string, title: string, highlightChunkId?: string) => void
}

function ChatPanel({ onSelectSource }: Props) {
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

  return (
    <aside className="flex w-75 shrink-0 flex-col border-l border-border bg-surface lg:w-80">
      {/* 왼쪽 탭 줄과 같은 높이. 탭은 줄 아래쪽에 붙어 있어서, 제목도 아래쪽에 두고 탭 글자 높이에 맞춤 */}
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
