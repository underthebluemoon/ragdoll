/**
 * 가운데 영역 최상단 탭
 */

// library
import { Folders, X } from 'lucide-react'

// components
import OpenDocsMenu from './OpenDocsMenu'

// utils
import { HOME_TAB_ID } from '../../utils/routing'

// hooks
import { useEffect, useRef, useState } from 'react'
import useCenterLocation from '../../hooks/useCenterLocation'
import useCenterActions from '../../hooks/useCenterActions'

// stores
import { useTabStore } from '../../stores/tabStore'

// ===== 탭 스타일 : 페이드 =====

// 문서 탭 - 기본 / 활성 / 비활성
const tabBase = 'flex max-w-[12em] shrink-0 items-center gap-0.5 rounded-t-md px-2.5 py-1.5 text-sm'
const tabActive = 'bg-primary-soft font-medium text-primary'
const tabIdle = 'bg-background text-muted-foreground hover:text-foreground'

/**
 * 탭 영역 오버플로우 상태
 */
interface Overflow {
  left: boolean
  right: boolean
}

/**
 * 오버플로우 계산 (1px은 소수점 오차 허용)
 * @param el: HTMLElement
 * @returns 
 */
function measureOverflow(el: HTMLElement): Overflow {
  return {
    left: el.scrollLeft > 1,
    right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
  }
}

/**
 * 화면에 가려진 탭 끝만 흐리게 (24px에 걸쳐 투명해짐)
 * @param left: 왼쪽 넘침 상태
 * @param right: 오른쪽 넘침 상태
 * @returns 
 */
function fadeMask({ left, right }: Overflow) {
  return `linear-gradient(to right, ${left ? 'transparent' : 'black'}, black 24px, black calc(100% - 24px), ${right ? 'transparent' : 'black'})`
}


function CenterTab() {
  // ===== hooks =====
  const { activeTabId } = useCenterLocation()
  const { selectTab, closeTab } = useCenterActions()
  // ===== stores =====
  const tabs = useTabStore(state => state.tabs)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState<Overflow>({ left: false, right: false })

  // 탭 영역이나 탭 크기가 바뀌면 다시 측정 (화면 폭 변경, 탭 열고 닫기). 스크롤할 때는 onScroll에서 측정
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setOverflow(measureOverflow(el)))
    observer.observe(el)
    Array.from(el.children).forEach(child => observer.observe(child))
    return () => observer.disconnect()
  }, [tabs])

  // 켜진 탭이 스크롤 영역 밖에 있으면 보이는 위치까지 밀어줌 (목록·출처 카드로 열었을 때)
  useEffect(() => {
    const activeTab = scrollRef.current?.querySelector('[data-active="true"]')
    activeTab?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [activeTabId, tabs.length])

  return (
    <div className="flex h-11 shrink-0 items-end gap-1 border-b border-border px-2">
      {/* 홈 버튼 */}
      <button
        className={`shrink-0 rounded-md p-2 hover:bg-background ${activeTabId === HOME_TAB_ID ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => selectTab(HOME_TAB_ID)}
        aria-label="문서함"
        title="문서함"
      >
        <Folders className="size-4" />
      </button>

      {/* 문서 탭 */}
      <div
        ref={scrollRef}
        className="flex min-w-0 flex-1 items-end gap-1 overflow-x-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden"
        style={{ maskImage: fadeMask(overflow), WebkitMaskImage: fadeMask(overflow) }}
        onScroll={e => setOverflow(measureOverflow(e.currentTarget))}
        onWheel={e => {
          // 마우스 세로 휠을 가로 이동으로
          if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
          // 파이어폭스 휠 단위 한 줄 → 16px로 환산
          const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
          e.currentTarget.scrollLeft += delta
        }}
      >
        {tabs.map(tab => {
          const isActive = activeTabId === tab.docId
          return (
            <button
              key={tab.docId}
              data-active={isActive}
              className={`${tabBase} ${isActive ? tabActive : tabIdle}`}
              onClick={() => selectTab(tab.docId)}
              title={tab.title}
            >
              <span className="min-w-0 flex-1 truncate text-left">{tab.title}</span>
              <span
                className="shrink-0 rounded p-0.5 hover:bg-primary/10"
                aria-label="탭 닫기"
                onClick={e => {
                  e.stopPropagation()
                  closeTab(tab.docId)
                }}
              >
                <X className="size-3.5" />
              </span>
            </button>
          )
        })}
      </div>

      {tabs.length > 0 && (
        <OpenDocsMenu />
      )}
    </div>
  )
}

export default CenterTab
