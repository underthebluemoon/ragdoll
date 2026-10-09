import type { SourceRef } from '../../api/types'


interface Props {
    content: string
    sources?: SourceRef[]
    onSelectSource: (docId: string, title: string, highlightChunkId?: string) => void
}

function AssistantMessage({content, sources, onSelectSource}: Props) {

    return(
        <div className="text-left">
            어시스턴트 응답
            <p>{content}</p>
            {sources?.map(src => (
              <button
                key={src.chunkId}
                onClick={() => onSelectSource(src.docId, src.title, src.chunkId)}
              >
                📄 {src.title}
              </button>
            ))}
        </div>
    )
}

export default AssistantMessage
