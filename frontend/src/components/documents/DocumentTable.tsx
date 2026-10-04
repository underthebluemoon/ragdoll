/**
 * 가운데 영역 테이블
 */

import styles from './DocumentTable.module.css'

interface Props {
  onSelectDoc: (docId: string, title: string) => void
}

function DocumentTable({ onSelectDoc }: Props) {

  return (

    <div className={styles.container}>
      {/* 홈 = 테이블 뷰: 필터 칩 + GET /documents → 행 클릭 시 onSelectDoc */}
      <button onClick={() => onSelectDoc('demo-1', '취업규칙 2026')}>
        (임시) 취업규칙 2026 열기
      </button>
    </div>

  )
}

export default DocumentTable
