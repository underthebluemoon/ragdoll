/**
 * 탭과 폴더 이동을 위한 훅
 * tabStore, folderStore의 state 이용
 */

// utils
import { DOC_ROUTE, docHref, folderHref, HOME_TAB_ID } from '../utils/routing'

// hooks
import { matchPath, useNavigate } from 'react-router'

// stores
import { useTabStore } from '../stores/tabStore'
import { useFolderStore } from '../stores/folderStore'

function getActiveTabId() {
  return matchPath(DOC_ROUTE, window.location.pathname)?.params.docId ?? HOME_TAB_ID
}

function getLastFolderHref() {
  return folderHref(useFolderStore.getState().lastFolderId)
}

export default function useCenterActions() {
  // ===== hooks =====
  const navigate = useNavigate()
  // 탭
  const putTab = useTabStore(state => state.putTab)
  const removeTab = useTabStore(state => state.removeTab)
  const clearTabs = useTabStore(state => state.clearTabs)

  // ===== 함수 =====

  /**
   * 폴더 열기. 홈 탭으로 가서 그 폴더 안을 보여줌. null인 경우, 맨 위
   * @param folderId 폴더 아이디
   */
  function openFolder(folderId: string) {
    navigate(folderHref(folderId))
  }

  /**
   * 탭 선택 시 주소 이동
   * @param id 문서 아이디 | 'HOME_TAB_ID'
   */
  function selectTab(id: string) {
    navigate(id === HOME_TAB_ID ? getLastFolderHref() : docHref(id))
  }

  /**
   * 문서 아이디로 탭 생성 후 그 탭으로 이동
   * @param docId 문서 아이디
   * @param title 문서 제목
   * @param highlightChunkId
   */
  function openDocTab(docId: string, title: string, highlightChunkId?: string) {
    putTab(docId, title, highlightChunkId)
    navigate(docHref(docId))
  }

  /**
   * 탭 닫기. 보고 있던 탭이면 문서함으로 (replace: 닫은 문서로 뒤로가기 되지 않게)
   * @param docId 문서 아이디
   */
  function closeTab(docId: string) {
    removeTab(docId)
    if (getActiveTabId() === docId) navigate(getLastFolderHref(), { replace: true })
  }

  /**
   * 열려있는 모든 문서 닫기
   */
  function closeAllTabs() {
    clearTabs()
    if (getActiveTabId() !== HOME_TAB_ID) navigate(getLastFolderHref(), { replace: true })
  }

  return {
    openFolder,
    selectTab,
    openDocTab,
    closeTab,
    closeAllTabs,
  }
}
