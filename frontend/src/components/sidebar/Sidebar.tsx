/**
 * 왼쪽 사이드 패널 영역
 */

import FavoriteList from "./FavoriteList"
import RecentList from "./RecentList"

// interface Props {
//   onSelectDoc: (docId: string, title: string) => void
// }

// onSelectDoc은 즐겨찾기·최근 목록 구현 때 사용
function Sidebar( ) {

  return (

    <aside className="flex w-55 shrink-0 flex-col gap-4 border-r border-border p-3">
      <button>문서 업로드</button>

      <section>
        <FavoriteList />
      </section>

      <section>
        <RecentList />
      </section>

      <footer className="mt-auto">김대리 · 재무팀</footer>
    </aside>
  )
}

export default Sidebar
