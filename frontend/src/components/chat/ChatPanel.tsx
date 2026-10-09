import { useState } from 'react'

import MessageList from './MessageList'
import ChatInput from './ChatInput'

import type { ChatMessage } from '../../api/types'

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
    <aside className="flex w-80 shrink-0 flex-col border-l border-border">
      <header>채팅 제목</header>

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
