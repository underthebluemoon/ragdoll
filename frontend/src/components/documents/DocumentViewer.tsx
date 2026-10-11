/**
 * 가운데 영역 문서 뷰어
 */

// library
import { useEffect, useState } from 'react'

// components
import Breadcrumb from './Breadcrumb'

// api, utils
import { getDocument } from '../../api/documents'
import { findFolderPath } from '../../utils/folders'

// types
import type { DocTab } from '../../App'
import type { Document, Folder } from '../../api/types'

interface Props {
  tab: DocTab
  folders: Folder[]
  onSelectFolder: (folderId: string) => void
}

function DocumentViewer({ tab, folders, onSelectFolder }: Props) {
  // 어느 문서의 결과인지 같이 저장 → 탭을 바꾼 직후 이전 문서 정보가 잠깐 보이는 일을 막음
  const [loaded, setLoaded] = useState<{ docId: string; doc: Document | undefined } | null>(null)

  useEffect(() => {
    let ignore = false
    getDocument(tab.docId).then(doc => {
      if (!ignore) setLoaded({ docId: tab.docId, doc })
    })
    return () => {
      ignore = true
    }
  }, [tab.docId])

  const doc = loaded?.docId === tab.docId ? loaded.doc : undefined
  const folderPath = doc ? findFolderPath(folders, doc.folderId) : []

  // 문서가 속한 폴더 조각들 + 마지막에 문서 제목(folderId 없음 → 누를 수 없음)
  const crumbs = [
    ...folderPath.map(folder => ({ label: folder.name, folderId: folder.id })),
    { label: tab.title },
  ]

  return (

    <div className="flex min-h-0 flex-1 flex-col">
      {/* 경로는 고정, 아래 본문만 스크롤 */}
      <Breadcrumb
        crumbs={crumbs}
        onNavigate={onSelectFolder}
      />

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {/* 문서 머리: 전체 제목(자르지 않음) + 업로더 · 수정일 */}
        <h2 className="text-xl font-semibold">{tab.title}</h2>
        {doc && (
          <p className="mt-1 text-xs text-muted-foreground">
            {doc.uploader} · {doc.updatedAt}
          </p>
        )}

        {/* 본문: GET /documents/{id} 응답의 텍스트 렌더, highlightChunkId 있으면 스크롤+하이라이트 */}
      </div>
    </div>

  )
}

export default DocumentViewer
