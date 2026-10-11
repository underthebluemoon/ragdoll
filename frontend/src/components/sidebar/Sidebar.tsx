/**
 * 왼쪽 사이드 패널 영역
 */

// library
import { PanelLeftClose, PanelLeftOpen, Upload } from "lucide-react"

// components
import FavoriteList from "./FavoriteList"
import RecentList from "./RecentList"

// hooks
import { useState } from "react"

// 사용자가 마지막으로 고른 접힘 상태를 저장하는 키
const COLLAPSED_KEY = "sidebar-collapsed"

// 저장된 선택이 있으면 그대로, 없으면 화면 폭 1024px 미만일 때 접힌 채 시작
function getInitialCollapsed() {
  const saved = localStorage.getItem(COLLAPSED_KEY)
  if (saved !== null) return saved === "true"
  return window.innerWidth < 1024
}

// interface Props {
//   onSelectDoc: (docId: string, title: string) => void
// }

// onSelectDoc은 즐겨찾기·최근 목록 구현 때 사용
function Sidebar( ) {
  const [collapsed, setCollapsed] = useState(getInitialCollapsed)

  function toggleCollapsed() {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem(COLLAPSED_KEY, String(next))
  }

  return (

    <aside className={`flex shrink-0 flex-col gap-4 border-r border-border p-3 ${collapsed ? "w-14 items-center" : "w-55"}`}>
      <button
        className={`rounded-md p-1 text-muted-foreground hover:bg-surface hover:text-foreground ${collapsed ? "" : "self-end"}`}
        onClick={toggleCollapsed}
        aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
      >
        {collapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
      </button>

      <button
        className={`flex items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-white hover:bg-primary/90 ${collapsed ? "size-8" : "px-3 py-2"}`}
        aria-label="문서 업로드"
        title="문서 업로드"
      >
        <Upload className="size-4" />
        {!collapsed && "문서 업로드"}
      </button>

      <section>
        <FavoriteList collapsed={collapsed} />
      </section>

      <section>
        <RecentList collapsed={collapsed} />
      </section>

      <footer className="mt-auto flex items-center gap-2" title="김대리 · 재무팀">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-medium text-primary">
          김
        </span>
        {!collapsed && (
          <span className="text-sm leading-tight">
            <span className="block font-medium">김대리</span>
            <span className="block text-xs text-muted-foreground">재무팀</span>
          </span>
        )}
      </footer>
    </aside>
  )
}

export default Sidebar
