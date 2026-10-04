interface Props {
  onSelectDoc: (docId: string, title: string) => void
  onGoHome: () => void
}

// onSelectDoc은 즐겨찾기·최근 목록 구현 때 사용
function Sidebar({ onGoHome }: Props) {
  return (
    <aside className="sidebar">
      <button>문서 업로드</button>
      <nav>
        <button onClick={onGoHome}>전체 문서</button>
      </nav>

      <section>
        <h3>즐겨찾기</h3>
        {/* 후순위: 즐겨찾기 목록 → onSelectDoc(id, title) */}
      </section>

      <section>
        <h3>최근 열어본</h3>
        {/* 후순위: 열람 기록 목록 → onSelectDoc(id, title) */}
      </section>

      <footer className="user-badge">김대리 · 재무팀</footer>
    </aside>
  )
}

export default Sidebar
