/**
 * 가운데 영역 탭에서 팝업 - 열린 문서 전체 목록 + 탭 관련 동작(모두 닫기)
 */

// library
import { Ellipsis, FileText, X } from 'lucide-react'

// types
import type { DocTab } from '../../App'

// hooks
import { useEffect, useRef, useState } from 'react'


interface Props {
  tabs: DocTab[]
  activeTabId: string
  onSelectTab: (id: string) => void
  onCloseTab: (docId: string) => void
  onCloseAll: () => void
}

function OpenDocsMenu({ tabs, activeTabId, onSelectTab, onCloseTab, onCloseAll }: Props) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // 목록이 열려 있을 때만: 바깥을 누르거나 Esc를 누르면 닫기
  useEffect(() => {
    if (!open) return

    /**
     * 마우스 클릭 위치 계산
     * @param e : MouseEvent
     */
    function handleMouseDown(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false)
    }
    /**
     * esc 누으면 false로 설정
     * @param e : KeyboardEvent
     */
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    // 이벤트 등록
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  /**
   * 열린 문서 중 선택
   * @param docId : 문서 id
   */
  function handleSelect(docId: string) {
    onSelectTab(docId)
    setOpen(false)
  }

  /**
   * 열린 문서 전체 닫기
   */
  function handleCloseAll() {
    onCloseAll()
    setOpen(false)
  }

  return (
    <div ref={menuRef} className="relative shrink-0">
      {/* ... */}
      <button
        className={`rounded-md p-2 hover:bg-background hover:text-foreground ${open ? 'bg-background text-foreground' : 'text-muted-foreground'}`}
        onClick={() => setOpen(prev => !prev)}
        aria-label="열린 문서 목록"
        aria-expanded={open}
        title="열린 문서 목록"
      >
        <Ellipsis className="size-4" />
      </button>

      {/* 열린 문서 목록 팝업 */}
      {open && (
        <div className="absolute top-full right-0 z-10 mt-1 w-72 rounded-lg border border-border bg-surface p-1 shadow-md">
          <p className="px-2 pt-1.5 pb-1 text-xs font-medium text-muted-foreground">열린 문서 {tabs.length}개</p>

          <ul>
            {tabs.map(tab => {
              const isActive = activeTabId === tab.docId
              return (
                <li
                  key={tab.docId}
                  className={`flex items-start rounded-md ${isActive ? 'bg-primary-soft text-primary' : 'hover:bg-background'}`}
                >
                  {/* 제목을 자르지 않고 줄바꿈해서 전체를 보여줌 */}
                  <button
                    className="flex min-w-0 flex-1 items-start gap-2 px-2 py-1.5 text-left text-sm"
                    onClick={() => handleSelect(tab.docId)}
                  >
                    <FileText className="mt-0.5 size-4 shrink-0" />
                    <span className="min-w-0">{tab.title}</span>
                  </button>
                  <button
                    className="m-1 shrink-0 rounded p-1 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                    onClick={() => onCloseTab(tab.docId)}
                    aria-label={`${tab.title} 닫기`}
                  >
                    <X className="size-3.5" />
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="my-1 h-px bg-border" />

          <button
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground hover:bg-background hover:text-foreground"
            onClick={handleCloseAll}
          >
            <X className="size-4" />
            모두 닫기
          </button>
        </div>
      )}
    </div>
  )
}

export default OpenDocsMenu
