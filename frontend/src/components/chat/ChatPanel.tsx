import { useState } from 'react'
import type { ChatMessage } from '../../api/types'

interface Props {
  onSelectSource: (docId: string, title: string, highlightChunkId?: string) => void
}

function ChatPanel({ onSelectSource }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')

  function send() {
    if (!input.trim()) return
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
    setInput('')
  }

  return (
    <aside className="chat-panel">
      <header>어시스턴트</header>

      <div className="message-list">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
            {msg.sources?.map(src => (
              <button
                key={src.chunkId}
                className="source-card"
                onClick={() => onSelectSource(src.docId, src.title, src.chunkId)}
              >
                📄 {src.title}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="질문·편집 지시…"
        />
        <button onClick={send}>전송</button>
      </div>
    </aside>
  )
}

export default ChatPanel
