import styles from './MessageList.module.css'

import AssistantMessage from './AssistantMessage'
import UserMessage from './UserMessage'

import type { ChatMessage } from '../../api/types'

interface Props {
    messages: ChatMessage[]
    onSelectSource: (docId: string, title: string, highlightChunkId?: string) => void
}

function MessageList({messages, onSelectSource} : Props) {

    return(
        <div className={styles.container}>

            {messages.map((msg, i) => (
                (msg.role === 'assistant') ?
                (
                    <AssistantMessage 
                        key={i}
                        content={msg.content}
                        sources={msg.sources}
                        onSelectSource={onSelectSource}
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
