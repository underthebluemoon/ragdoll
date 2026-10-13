/**
 * 채팅 영역 - 어시스턴트 메세지
 */

// librarys
import { FileText } from 'lucide-react'

// types
import type { SourceRef } from '../../api/types'

// hooks
import useCenterActions from '../../hooks/useCenterActions'

interface Props {
    content: string
    sources?: SourceRef[]
}

function AssistantMessage({
    content, sources, 
}: Props) {
    // ===== hooks =====
    const { openDocTab } = useCenterActions()
    

    return(
        <div className="flex flex-col gap-2">
            <p className="text-sm leading-relaxed">{content}</p>
            {sources?.length ? (
                <div className="flex flex-wrap gap-1.5">
                    {sources.map(src => (
                      <button
                        key={src.chunkId}
                        className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary"
                        onClick={() => openDocTab(src.docId, src.title, src.chunkId)}
                      >
                        <FileText className="size-3.5" />
                        {src.title}
                      </button>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default AssistantMessage
