/**
 * 왼쪽 사이드 패널 - 최근 열어본 목록
 */

// library
import { History } from "lucide-react"

interface Props {
  collapsed: boolean
  // onSelectDoc: (docId: string, title: string) => void
}

// onSelectDoc은 즐겨찾기·최근 목록 구현 때 사용
function RecentList({ collapsed }: Props) {

  return (

    <>
        <h3 className="flex items-center gap-2 px-1 text-xs font-medium text-muted-foreground" title="최근 열어본">
          <History className="size-4 shrink-0" />
          {!collapsed && "최근 열어본"}
        </h3>
        {/* 후순위: 열람 기록 목록 → onSelectDoc(id, title) */}

    </>
  )
}

export default RecentList
