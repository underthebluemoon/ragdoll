/**
 * 가운데 영역, 탭 아래 - 경로
 */

// library
import { ChevronRight } from 'lucide-react'

// 경로. folderId가 있으면 누를 수 있고, 없으면 현재 위치
interface Crumb {
  label: string
  folderId?: string
}

interface Props {
  crumbs: Crumb[]
  onNavigate: (folderId: string) => void
}

function Breadcrumb({crumbs, onNavigate}: Props) {
    return(
        <nav aria-label="경로" className="flex h-8 shrink-0 items-center border-b border-border px-3 text-xs text-muted-foreground">
            <ol className="flex min-w-0 items-center gap-1">
                {crumbs.map(({ label, folderId }, i) => (
                    // 폴더 조각은 줄어들지 않고, 현재 위치(문서 제목 등)만 길면 말줄임
                    <li key={i} className={`flex items-center gap-1 ${folderId ? 'shrink-0' : 'min-w-0'}`}>
                        {/* 첫 조각이 아니면 앞에 구분 기호 */}
                        {i > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />}

                        {/* folderId가 있으면 누를 수 있는 버튼, 없으면 현재 위치라 그냥 글자 */}
                        {folderId ? (
                            <button className="hover:text-foreground" onClick={() => onNavigate(folderId)}>
                                {label}
                            </button>
                        ) : (
                            <span className="truncate font-medium text-foreground" aria-current="page">
                                {label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumb
