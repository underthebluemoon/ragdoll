/**
 * 가운데 영역 문서 뷰어
 */

// librarys
import { useEffect, useState } from 'react'

// components
import Breadcrumb from './Breadcrumb'

// api
import { getDocument } from '../../api/documents'
import { getFolderPath } from '../../api/folders'

// types
import type { DocumentSummary, FolderSummary } from '../../api/types'
import type { DocTab } from '../../stores/tabStore'

interface Props {
  activeDoc: DocTab
}

function DocumentViewer({ activeDoc }: Props) {

  const [docDetail, setDocDetail] = useState<{ docId: number; doc: DocumentSummary | undefined; path: FolderSummary[] | undefined } | null>(null)

  // 문서 호출 → 호출된 문서의 폴더id로 문서의 경로 호출
  useEffect(() => {
    let ignore = false

    async function load() {
      // 1. 문서 호출
      const doc = await getDocument(activeDoc.docId)
      // 2. 문서가 호출된 뒤 폴더 경로 호출
      const path = doc ? await getFolderPath(doc.folderId) : undefined
      if (!ignore) setDocDetail({ docId: activeDoc.docId, doc, path })
    }
    load()

    return () => { ignore = true }
  }, [activeDoc.docId])

  // 로딩 중
  const isDocPending = docDetail?.docId !== activeDoc.docId
  // 로딩 완료 후 담기 - 사용 및 가공용
  const doc = isDocPending ? undefined : docDetail.doc
  const path = isDocPending ? undefined : docDetail.path

  // 문서가 속한 폴더 조각들 + 마지막에 문서 제목(folderId 없음 → 누를 수 없음)
  const crumbs = [
    ...(path ?? []).map(folder => ({ label: folder.name, folderId: folder.id })),
    { label: activeDoc.title },
  ]

  return (

    <div className="flex min-h-0 flex-1 flex-col">
      {/* 경로는 고정, 아래 본문만 스크롤 */}
      <Breadcrumb
        crumbs={crumbs}
      />

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {/* 문서 머리: 전체 제목(자르지 않음) + 업로더 · 수정일 */}
        <h2 className="text-xl font-semibold">{activeDoc.title}</h2>
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
