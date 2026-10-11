/**
 * 가운데 영역 홈 - 폴더 둘러보기 (홈 → 부서 → 분류 → 문서)
 * 폴더를 누르면 그 폴더 안으로 들어가고, 문서를 누르면 탭으로 열림
 */

// library
import { useEffect, useState } from 'react'
import { ArrowLeft, ChevronRight, FileText, FolderIcon } from 'lucide-react'

// api, utils
import { getDocuments } from '../../api/documents'
import { findFolderPath } from '../../utils/folders'

// types
import type { Document, Folder } from '../../api/types'

interface Props {
  folders: Folder[]
  currentFolderId: string | null   // null = 홈(맨 위)
  onOpenFolder: (folderId: string | null) => void   // null = 홈으로
  onSelectDoc: (docId: string, title: string) => void
}

type SortKey = 'date' | 'name'

// 한 줄 공통 스타일
const rowBase = 'grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm hover:bg-background'

function DocumentTable({ folders, currentFolderId, onOpenFolder, onSelectDoc }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('date')
  // 폴더 아이디 + 문서 같이 저장 → 폴더를 바꾼 직후 이전 폴더 문서가 잠깐 보이는 일을 막음
  const [loaded, setLoaded] = useState<{ folderId: string; documents: Document[] } | null>(null)

  // 폴더가 바뀌면 그 폴더의 문서를 불러옴
  useEffect(() => {
    if (!currentFolderId) return

    // 응댭이 늦을 경우 버림 처리
    let ignore = false
    getDocuments(currentFolderId).then(documents => {
      if (!ignore) setLoaded({ folderId: currentFolderId, documents })
    })
    return () => {
      ignore = true
    }
  }, [currentFolderId])

  // 경로 계산
  const path = currentFolderId ? findFolderPath(folders, currentFolderId) : []
  const currentFolder = path.at(-1)
  const parentId = path.length >= 2 ? path[path.length - 2].id : null

  // 하위 폴더 목록
  const subFolders = currentFolder ? currentFolder.children : folders
  // 폴더 로딩
  const isLoading = currentFolderId !== null && loaded?.folderId !== currentFolderId
  // 현재 위치에서 보여줄 파일 목록
  const documents = loaded?.folderId === currentFolderId ? loaded.documents : []
  // 정렬 문서
  const sortedDocuments = [...documents].sort((a, b) =>
    sortKey === 'date' ? b.updatedAt.localeCompare(a.updatedAt) : a.title.localeCompare(b.title, 'ko'),
  )

  const isEmpty = !isLoading && subFolders.length === 0 && sortedDocuments.length === 0

  return (

    <div className="flex min-h-0 flex-1 flex-col">
      {/* 머리 줄: 위로 가기 / 현재 위치 / 정렬 */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border px-3">
        <button
          className="rounded-md p-1 text-muted-foreground hover:bg-background hover:text-foreground disabled:opacity-30"
          onClick={() => onOpenFolder(parentId)}
          disabled={!currentFolderId}
          aria-label="상위 폴더로"
          title="상위 폴더로"
        >
          <ArrowLeft className="size-4" />
        </button>
        <span className="min-w-0 flex-1 truncate text-sm font-medium">
          {path.length > 0 ? path.map(folder => folder.name).join(' / ') : '문서함'}
        </span>
        <select
          className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted-foreground"
          value={sortKey}
          onChange={e => setSortKey(e.target.value as SortKey)}
          aria-label="정렬"
        >
          <option value="date">최근 수정순</option>
          <option value="name">이름순</option>
        </select>
      </div>

      {/* 목록: 폴더 먼저, 그 아래 문서 */}
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <ul>
          {subFolders.map(folder => (
            <li key={folder.id}>
              <button className={rowBase} onClick={() => onOpenFolder(folder.id)}>
                <span className="flex min-w-0 items-center gap-2">
                  <FolderIcon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{folder.name}</span>
                </span>
                <span />
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            </li>
          ))}

          {sortedDocuments.map(doc => (
            <li key={doc.id}>
              <button className={rowBase} onClick={() => onSelectDoc(doc.id, doc.title)} title={doc.title}>
                <span className="flex min-w-0 items-center gap-2">
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{doc.title}</span>
                </span>
                <span className="text-xs text-muted-foreground">{doc.uploader}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{doc.updatedAt}</span>
              </button>
            </li>
          ))}
        </ul>

        {isLoading && <p className="px-2 py-1.5 text-sm text-muted-foreground">불러오는 중…</p>}
        {isEmpty && <p className="px-2 py-1.5 text-sm text-muted-foreground">이 폴더에 문서가 없어요.</p>}
      </div>
    </div>

  )
}

export default DocumentTable
