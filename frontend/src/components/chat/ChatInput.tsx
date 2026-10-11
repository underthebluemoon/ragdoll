/**
 * 채팅 영역 - 유저 입력창
 */

// library
import { SendHorizontal } from 'lucide-react'

// hooks
import { useState } from 'react'

interface Props {
  onSend: (input: string) => void
}

function ChatInput({onSend} : Props) {
    const [input, setInput] = useState('')

    function handleSend() {
        if (!input.trim()) return
        onSend(input)     // 다 쓴 문장을 위로 올리고
        setInput('')      // 입력칸 비우기
    }

    return(
        <div className="flex gap-2 border-t border-border p-3">
            <input
                className="min-w-0 flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                    // 한글 및 조합 언어
                    if (e.nativeEvent.isComposing) return
                    if (e.key === 'Enter') handleSend()
                }}
                placeholder="질문·편집 지시…"
            />
            <button
                className="flex items-center justify-center rounded-lg bg-primary px-3 text-white hover:bg-primary/90 disabled:opacity-40"
                onClick={handleSend}
                disabled={!input.trim()}
                aria-label="전송"
            >
                <SendHorizontal className="size-4" />
            </button>
        </div>
    )
}

export default ChatInput
