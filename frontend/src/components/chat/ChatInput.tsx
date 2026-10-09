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
                className="flex-1"
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
                onClick={handleSend}
            >send</button>
        </div>
    )
}

export default ChatInput
