/**
 * 채팅 영역 - 메세지 전체
 */

// components
import AssistantMessage from './AssistantMessage'
import UserMessage from './UserMessage'

// types
import type { ChatMessage } from '../../api/types'

interface Props {
    messages: ChatMessage[]
}

function MessageList({ messages } : Props) {

    return(
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3">

            {messages.map((msg, i) => (
                (msg.role === 'assistant') ?
                (
                    <AssistantMessage 
                        key={i}
                        content={msg.content}
                        sources={msg.sources}
                    />
                ) : (
                    <UserMessage 
                        key={i}
                        content={msg.content}                    
                    />
                )
            ))}  

        </div>
    )
}

export default MessageList
