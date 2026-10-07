/**
 * 가운데 영역 문서
 */

import styles from './DocumentViewer.module.css'

import type { DocTab } from '../../App'

interface Props {
  tab: DocTab
}

function DocumentViewer({ tab }: Props) {


  return (

    <div className={styles.container}>
      {/* 문서 뷰: GET /documents/{id} → 본문 렌더, highlightChunkId 있으면 스크롤+하이라이트 */}
      <h2>{tab.title}</h2>
    </div>

  )
}

export default DocumentViewer
