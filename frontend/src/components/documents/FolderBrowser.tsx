/**
 * 가운데 영역 홈 - 폴더 둘러보기 (홈 → 부서 → 분류 → 문서)
 * 폴더를 누르면 그 폴더 안으로 들어가고, 문서를 누르면 탭으로 열림
 */

// librarys
import { ArrowLeft, ChevronRight, FileText, FolderIcon } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

import Breadcrumb from './Breadcrumb';

// api
import { getFolderItems, getFolderPath, ROOT_FOLDER_ID } from '../../api/folders';

// utils
import { folderHref } from '../../utils/routingUtil';
import { getErrorMessage } from '../../utils/errorUtil';

// types
import type { FolderItemsResponse, FolderSummary } from '../../api/types';

// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useCenterLocation from '../../hooks/useCenterLocation';
import useCenterActions from '../../hooks/useCenterActions';
import { useFolderStore } from '../../stores/folderStore';

type SortKey = 'date' | 'name';

// 한 줄 공통 스타일
const rowBase = 'grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm hover:bg-background';

function FolderBrowser() {

  // ===== hooks =====
  const navigate = useNavigate();
  const { folderId } = useCenterLocation();
  const { openFolder, openDocTab } = useCenterActions();

  // ===== store =====
  const setLastFolderId = useFolderStore(state => state.setLastFolderId);

  // ===== 데이터 호출 =====

  // 표시할 폴더 데이터 : 폴더 아이디 + 루트 ~ 현재 폴더 경로 + 현재 폴더가 가진 아이템들
  const [folderDetail, setFolderDetail] = useState<{
    folderId: number
    path: FolderSummary[]
    items: FolderItemsResponse
  } | null>(null);

  // 서버 실패
  const [failFolderId, setFailFolderId] = useState<number | null>(null);
  const isFolderFailed = folderId === failFolderId;

  // api 호출 : 루트 ~ 현재 폴더 경로, 현재 폴더의 아이템들
  useEffect(() => {
    let ignore = false;

    // 루트 ~ 현재 폴더 경로 호출 api
    async function loadPathAndItems() {
      try {
        const [path, items] = await Promise.all([getFolderPath(folderId), getFolderItems(folderId)]);
        if(ignore) return;  // 주소 변경 시
        setFolderDetail({ folderId, path, items });
        setFailFolderId(null);

      } catch (error) {
        if(ignore) return;  // 주소 변경 시

        // 404
        if(axios.isAxiosError(error) && error.response?.status === 404) {
          navigate(folderHref(ROOT_FOLDER_ID), { replace: true });
          toast.error(getErrorMessage(error));
          return;
        }

        // 나머지 에러 처리 : 500 등 서버 에러 포함
        setFailFolderId(folderId);
        toast.error(getErrorMessage(error, '폴더를 불러오는 것에 실패했습니다.'));
        console.error('loadPathAndItems api error:', error);
      }
    };

    loadPathAndItems();

    return () => {
      ignore = true
    };
  }, [folderId, navigate]);

  // 로딩 중
  const isFolderPending = folderDetail?.folderId !== folderId;
  // 로딩 후 데이터 - 가공용
  const folderItems = isFolderPending ? undefined : folderDetail.items;
  const documents = folderItems?.documents ?? [];
  const subFolders = folderItems?.folders ?? [];
  // 로딩 후 경로 - 가공용
  const path = isFolderPending ? undefined : folderDetail.path;
  const parentId = path?.at(-2)?.id ?? ROOT_FOLDER_ID;


  // ===== 마지막에 위치했던 폴더 경로 기억 =====
  useEffect(() => {
    if (!isFolderPending && !isFolderFailed) setLastFolderId(folderId);
  }, [isFolderPending, isFolderFailed, folderId, setLastFolderId]);

  // ===== 정렬 =====
  const [sortKey, setSortKey] = useState<SortKey>('date');
  // 정렬 문서
  const sortedDocuments = [...documents].sort((a, b) =>
    sortKey === 'date' ? b.updatedAt.localeCompare(a.updatedAt) : a.title.localeCompare(b.title, 'ko'),
  );

  // ===== 폴더의 내용이 비어있는 경우 =====
  const isEmpty = !isFolderPending && subFolders.length === 0 && sortedDocuments.length === 0;

  // ===== Crumb =====
  const crumbsProps = ( path ?? [] ).map((folder, i, arr) =>
    i === arr.length -1
      ? {label: folder.name}
      : { label: folder.name, folderId: folder.id }
  );

  return (

    <div className="flex min-h-0 flex-1 flex-col">
      {/* 머리 줄: 위로 가기 / 현재 위치 / 정렬 */}
      <div className="flex min-h-10 shrink-0 items-center gap-2 border-b border-border px-3 py-1">
        <button
          className="rounded-md p-1 text-muted-foreground hover:bg-background hover:text-foreground disabled:opacity-30"
          onClick={() => openFolder(parentId)}
          disabled={folderId === ROOT_FOLDER_ID}
          aria-label="상위 폴더로"
          title="상위 폴더로"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="min-w-0 flex-1">
          <Breadcrumb
            crumbs={crumbsProps}
            wrap
          />
        </div>
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
              <button className={rowBase} onClick={() => openFolder(folder.id)}>
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
              <button className={rowBase} onClick={() => openDocTab(doc.id, doc.title)} title={doc.title}>
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

        {isFolderPending && !isFolderFailed && <p className="px-2 py-1.5 text-sm text-muted-foreground">불러오는 중…</p>}
        {isFolderFailed && <p className="px-2 py-1.5 text-sm text-muted-foreground">불러오기 실패</p>}
        {isEmpty && <p className="px-2 py-1.5 text-sm text-muted-foreground">이 폴더에 문서가 없습니다.</p>}
      </div>
    </div>

  )
}

export default FolderBrowser
