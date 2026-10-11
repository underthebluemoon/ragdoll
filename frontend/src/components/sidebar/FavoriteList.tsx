/**
 * 왼쪽 사이드 패널 - 즐겨찾기 목록
 */

// library
import { Star } from "lucide-react"

interface Props {
  collapsed: boolean
  // onSelectDoc: (docId: string, title: string) => void
}

// onSelectDoc은 즐겨찾기·최근 목록 구현 때 사용
function FavoriteList({ collapsed }: Props) {

  return (

    <>
        <h3 className="flex items-center gap-2 px-1 text-xs font-medium text-muted-foreground" title="즐겨찾기">
          <Star className="size-4 shrink-0" />
          {!collapsed && "즐겨찾기"}
        </h3>
        {/* 후순위: 즐겨찾기 목록 → onSelectDoc(id, title) */}

    </>
  )
}

export default FavoriteList
