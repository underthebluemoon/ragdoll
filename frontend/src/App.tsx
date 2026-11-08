/**
 * 전체 레이아웃 (사이드바 | 가운데 | 채팅)
 * 탭 목록에 없고 주소에만 있는 문서(새로고침·공유 링크)의 탭 만들기, 불러오지 못하면 마지막 폴더로
 * 진입/새로고침 시 탭 복원
 */

// librarys
import { toast, Toaster } from 'sonner';
import axios from 'axios';

// components
import Sidebar from './components/sidebar/Sidebar';
import CenterArea from './components/documents/CenterArea';
import ChatPanel from './components/chat/ChatPanel';

// api
import { getDocument, getDocumentsByIds } from './api/documents';

// utils
import { folderHref, HOME_TAB_ID } from './utils/routingUtil';
import localStorageUtil from './utils/localStorageUtil';

// hooks
import { useEffect, useEffectEvent } from 'react';
import { useNavigate } from 'react-router';
import useCenterLocation from './hooks/useCenterLocation';

// stores
import { useTabStore } from './stores/tabStore';
import { useFolderStore } from './stores/folderStore';


function App() {
  // ===== hooks =====
  const navigate = useNavigate();
  const { activeTabId } = useCenterLocation();
  // ===== store =====
  const tabs = useTabStore(state => state.tabs);
  const putTab = useTabStore(state => state.putTab);
  const lastFolderId = useFolderStore(state => state.lastFolderId);

  // ===================
  // ||     탭 제어     ||
  // ===================
  // 주소에 있는 문서인데 탭이 없으면 탭을 새로 열기 (새로고침, 공유 링크, 닫은 탭으로 뒤로가기)
  // 문서 정보(제목)를 서버에서 받아서 탭 추가. 없거나 권한 밖이면 마지막 폴더로 (replace)

  // 주소의 문서가 탭에 없는 경우
  const missingDocId = (activeTabId !== HOME_TAB_ID && !tabs.some(t => t.docId === activeTabId)) ? activeTabId : null;

  // ===== 주소의 activeTabId로 문서 호출 =====

  // 마지막 폴더 위치로 이동 - 의존성 회피를 위해
  const goBackToFolder = useEffectEvent(() => {
    navigate(folderHref(lastFolderId), { replace: true });
  });

  useEffect(() => {
    if (missingDocId === null) return;

    let ignore = false;

    /**
     * activeTabId가 탭 목록에 없는 경우 해당 문서 호출 api. 즉, 현재 주소에 해당하는 문서가 탭 목록에 없는 경우 요청.
     * @param missingDocId 탭 목록에 누락된, 현재 주소에 해당하는 문서 아이디
     */
    async function loadDocument(missingDocId: number) {
      try {
        const doc = await getDocument(missingDocId);
        if(ignore) return;
        putTab(doc.id, doc.title);

      } catch (error) {
        if(ignore) return;

        // 404
        if(axios.isAxiosError(error) && error.response?.status === 404) {
          toast.error('문서를 찾을 수 없습니다.');
          goBackToFolder();
          return;
        }

        // 나머지 처리
        toast.error('문서를 불러오는 것에 실패했습니다.', { id: 'doc-load-error' });
        console.error('loadDocument api error:', error);
        goBackToFolder();
      }
    };

    loadDocument(missingDocId);

    return () => {
      ignore = true;
    };
  }, [missingDocId, putTab]);

  // ===== 새로고침 및 진입 시 이전 탭 불러오기 =====

  // 현재 주소의 문서 아이디 - 의존성 회피를 위해
  const getEntryDocId = useEffectEvent(() => activeTabId);

  useEffect(() => {
    const entryDocId = getEntryDocId();
    // 로컬스토리지 불러오기
    const restoreIds = localStorageUtil.getOpenTabIds().filter(id => id !== entryDocId);
    if (restoreIds.length === 0) return;

    let ignore = false;

    /**
     * 로컬 스토리지에 저장된 문서 id 배열로 한번에 호출 api 처리.
     * 단, 현재 주소에 해당하는 문서는 요청하지 않음.
     * 로컬 스토리지에 저장된 id들의 문서 정보(id, title)을 tabs에 저장.
     */
    async function loadDocumentsByIds() {
      try {
        const docs = await getDocumentsByIds(restoreIds);
        if(ignore) return;
        docs.forEach(doc => putTab(doc.id, doc.title));

        // 문서가 누락된 경우 로컬스토리지 다시 저장
        if (docs.length < restoreIds.length) {
          const message = docs.length === 0 ? '이전 탭을 불러오지 못했습니다.' : '이전 탭 일부를 불러오지 못했습니다.';
          toast.error(message);
          localStorageUtil.setOpenTabIds(useTabStore.getState().tabs.map(tab => tab.docId));
        }

      } catch (error) {
        if(ignore) return;

        // 나머지 처리
        toast.error('문서를 불러오는 것에 실패했습니다.', { id: 'doc-load-error' });
        console.error('loadDocumentsByIds api error:', error);

      }
    };

    loadDocumentsByIds();

    return () => {
      ignore = true;
    };
  }, [putTab]);


  return (
    <div className="flex h-screen min-w-180 bg-background text-foreground">

      {/* 사이드바 */}
      <Sidebar />

      {/* 가운데 영역 - 폴더, 문서 뷰어 */}
      <CenterArea />

      {/* 채팅 패널 */}
      <ChatPanel />

      {/* sonner toast */}
      <Toaster
        position="top-center"
        duration={3000}
        toastOptions={{
          classNames: {
            error: '[&_[data-icon]]:text-danger',
          },
        }}
      />

    </div>
  );
}

export default App;
