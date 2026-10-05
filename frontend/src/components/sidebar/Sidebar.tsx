/**
 * 왼쪽 사이드 패널 영역
 */

import styles from "./Sidebar.module.css"

import FavoriteList from "./FavoriteList"
import RecentList from "./RecentList"

// interface Props {
//   onSelectDoc: (docId: string, title: string) => void
// }

// onSelectDoc은 즐겨찾기·최근 목록 구현 때 사용
function Sidebar( ) {

  return (

    <aside className={styles.container}>
      <button>문서 업로드</button>

      <section>
        <FavoriteList />
      </section>

      <section>
        <RecentList />
      </section>

      <footer className={styles.userBadge}>김대리 · 재무팀</footer>
    </aside>
  )
}

export default Sidebar
