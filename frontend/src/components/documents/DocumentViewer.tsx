/**
 * 가운데 영역 문서 뷰어
 */

// librarys
import { useEffect, useState } from 'react'

// components
import Breadcrumb from './Breadcrumb'

// api
import { getDocument } from '../../api/documents'

// utils
import { findFolderPath } from '../../utils/folders'

// types
import type { Document } from '../../api/types'
import type { DocTab } from '../../stores/tabStore'

// stores
import { useFolderStore } from '../../stores/folderStore'

interface Props {
  activeDoc: DocTab
}

function DocumentViewer({ activeDoc }: Props) {
  // ===== stores =====
    const folders = useFolderStore(state => state.folders)
  
  // 어느 문서의 결과인지 같이 저장 → 탭을 바꾼 직후 이전 문서 정보가 잠깐 보이는 일을 막음
  const [loaded, setLoaded] = useState<{ docId: string; doc: Document | undefined } | null>(null)

  useEffect(() => {
    let ignore = false
    getDocument(activeDoc.docId).then(doc => {
      if (!ignore) setLoaded({ docId: activeDoc.docId, doc })
    })
    return () => {
      ignore = true
    }
  }, [activeDoc.docId])

  const doc = loaded?.docId === activeDoc.docId ? loaded.doc : undefined
  const folderPath = doc ? findFolderPath(folders, doc.folderId) : []

  // 문서가 속한 폴더 조각들 + 마지막에 문서 제목(folderId 없음 → 누를 수 없음)
  const crumbs = [
    ...folderPath.map(folder => ({ label: folder.name, folderId: folder.id })),
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
