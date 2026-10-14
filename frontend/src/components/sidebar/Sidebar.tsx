/**
 * 왼쪽 사이드 패널 영역
 * - 넓은 화면(1024px ~): 옆 영역을 밀면서 열림, 열림 상태 로컬스토리지 저장
 * - 좁은 화면: 자리는 접힌 폭(w-14) 그대로, absolute로 위에 겹쳐서 열림 (열림 상태 저장 안 함)
 */

// library
import { PanelLeftClose, PanelLeftOpen, Upload } from "lucide-react"

// components
import FavoriteList from "./FavoriteList"
import RecentList from "./RecentList"

// hooks
import { useEffect, useRef, useState } from "react"
import useIsWide from "../../hooks/useIsWide"

// utils
import localStorageUtil from "../../utils/localStorageUtil"

// interface Props {
//   onSelectDoc: (docId: string, title: string) => void
// }
// onSelectDoc은 즐겨찾기·최근 목록 구현 때 사용

function Sidebar( ) {
  // 화면 모드
  const isWide = useIsWide()
  // 밀림 모드 열림 여부
  const [wideOpen, setWideOpen] = useState(localStorageUtil.getSidebarOpen)
  // 겹침 모드 열림 여부
  const [overlayOpen, setOverlayOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // 모드 변경 순간 사이드바 열림 방지
  const [prevIsWide, setPrevIsWide] = useState(isWide)
  if (isWide !== prevIsWide) {
    setPrevIsWide(isWide)
    setOverlayOpen(false)
  }

  // 화면의 실제 펼침
  const isExpanded = isWide ? wideOpen : overlayOpen
  const isOverlay = !isWide && overlayOpen

  /**
   * 버튼 누르는 순간 열림 상태 변경
   * 밀림 열림의 경우, 로컬 스토리지 저장
   */
  function toggle() {
    // 1. 넓은 화면의 경우
    if (isWide) {
      const next = !wideOpen
      setWideOpen(next)
      localStorageUtil.setSidebarOpen(next)
    // 2. 좁은 화면의 경우
    } else {
      setOverlayOpen(prev => !prev)
    }
  }

  // 겹침 열림 제어: 바깥 클릭, Esc, -> 닫기 (OpenDocsMenu와 같은 패턴)
  useEffect(() => {
    if (!isOverlay) return

    function handleMouseDown(e: MouseEvent) {
      if (!panelRef.current?.contains(e.target as Node)) setOverlayOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOverlayOpen(false)
    }

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOverlay])

  return (

    // 레이아웃 영역 - 겹쳐 열려도 이 폭은 그대로
    <aside className={`relative shrink-0 ${isWide && wideOpen ? "w-55" : "w-14"}`}>

      {/* 실제 패널 */}
      <div
        ref={panelRef}
        className={`flex h-full flex-col gap-4 border-r border-border bg-background p-3 ${isExpanded ? "w-55" : "w-14 items-center"} ${isOverlay ? "absolute inset-y-0 left-0 z-20 shadow-lg" : ""}`}
      >
        {/* 펼침/접힘 버튼 */}
        <button
          className={`rounded-md p-1 text-muted-foreground hover:bg-surface hover:text-foreground ${isExpanded ? "self-end" : ""}`}
          onClick={toggle}
          aria-label={isExpanded ? "사이드바 접기" : "사이드바 펼치기"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <PanelLeftClose className="size-5" /> : <PanelLeftOpen className="size-5" />}
        </button>

        {/* 업로드 버튼 */}
        <button
          className={`flex items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-white hover:bg-primary/90 ${isExpanded ? "px-3 py-2" : "size-8"}`}
          aria-label="문서 업로드"
          title="문서 업로드"
        >
          <Upload className="size-4" />
          {isExpanded && "문서 업로드"}
        </button>

        {/* 즐겨찾기 */}
        <section>
          <FavoriteList collapsed={!isExpanded} />
        </section>

        {/* 최근 기록 */}
        <section>
          <RecentList collapsed={!isExpanded} />
        </section>

        {/* 사용자 배지 */}
        <footer className="mt-auto flex items-center gap-2" title="김대리 · 재무팀">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-medium text-primary">
            김
          </span>
          {isExpanded && (
            <span className="text-sm leading-tight">
              <span className="block font-medium">김대리</span>
              <span className="block text-xs text-muted-foreground">재무팀</span>
            </span>
          )}
        </footer>
      </div>
    </aside>
  )
}

export default Sidebar
