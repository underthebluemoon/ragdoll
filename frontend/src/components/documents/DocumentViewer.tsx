/**
 * 가운데 영역 문서
 */

import type { DocTab } from '../../App'

interface Props {
  tab: DocTab
}

function DocumentViewer({ tab }: Props) {


  return (

    <div className="min-h-0 flex-1 overflow-y-auto p-4">
      {/* 문서 뷰: GET /documents/{id} → 본문 렌더, highlightChunkId 있으면 스크롤+하이라이트 */}
      <h2>{tab.title}</h2>
    </div>

  )
}

export default DocumentViewer
