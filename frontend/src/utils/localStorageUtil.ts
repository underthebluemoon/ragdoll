/**
 * 로컬 스토리지 관리
 * - 밖에서는 키별 getter/setter만 사용
 * - getter/setter를 객체 하나로 묶어 default로 내보냄 → import storage from '.../utils/localstorage' → storage.getXxx()
 * - 문자열 ↔ 값 변환, 접근 에러 처리는 아래 공용 함수에서 한 번만
 */

import { ROOT_FOLDER_ID } from '../api/folders'

// =================
// ||     키      ||
// =================
// === 넓은 화면 사이드바 열림 여부 (boolean)
const SIDEBAR_OPEN_KEY = 'sidebar-open'

// === 채팅 영역 폭 px (number)
const CHAT_WIDTH_KEY = 'chat-width'

// === 열린 문서 탭 id 목록 (number[])
const OPEN_TAB_IDS_KEY = 'open-tab-ids'

// === 문서함에서 마지막으로 본 폴더 id (number)
const LAST_FOLDER_ID_KEY = 'last-folder-id'


// ========================================
// ||     공용 함수 (이 파일 안에서만 사용)     ||
// ========================================

// === 읽기

/**
 * 로컬스토리지에서 문자열 읽기
 * @param key 로컬스토리지 키
 * @returns 저장된 문자열 | null
 */
function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * 로컬스토리지에서 boolean 읽기
 * @param key 로컬스토리지 키
 * @param fallback 기본값 (true, false 외의 값이 저장되어있거나, 값이 저장되어 있지 않을 때 반환할 값)
 * @returns true | false | fallback
 */
function getStoredBoolean(key: string, fallback: boolean): boolean {
  const saved = read(key)
  if (saved === 'true') return true
  if (saved === 'false') return false
  return fallback
}

/**
 * 로컬스토리지에서 number 읽기
 * @param key 로컬스토리지 키
 * @param fallback 기본값 (값이 저장되어 있지 않거나, 숫자로 바꿀 수 없는 값일 때 반환할 값)
 * @returns 저장된 숫자 | fallback
 */
function getStoredNumber(key: string, fallback: number): number {
  const saved = read(key)
  if (saved === null) return fallback
  const num = Number(saved)
  // NaN("abc" 등)·Infinity는 제대로 된 숫자가 아니므로 기본값
  return Number.isFinite(num) ? num : fallback
}

function getStoredNumberArray(key: string, fallback: number[]): number[] {
  const saved = read(key);
  if (!saved) return fallback;

  try {
    const parsedSaved = JSON.parse(saved);
    if (Array.isArray(parsedSaved) && parsedSaved.every(item => Number.isInteger(item))) return parsedSaved;
    return fallback;
  } catch {
    return fallback;
  }
}

// === 쓰기

/**
 * 로컬스토리지에 값 저장. 실패 시 처리 없음 → 계속 동작
 * @param key 로컬스토리지 키
 * @param value 저장할 값
 */
function setStored(key: string, value: boolean | number | string) {
  try {
    localStorage.setItem(key, String(value))
  } catch {
    // 저장 못 해도 화면 동작에는 문제 없으므로 무시
  }
}

/**
 * 로컬스토리지에 JSON 저장. 실패 시 처리 없음 → 계속 동작
 * @param key 로컬스토리지 키
 * @param value 저장할 값
 */
function setStoredJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 저장 못 해도 화면 동작에는 문제 없으므로 무시
  }
}


// =================================
// ||     키별 getter / setter     ||
// =================================

// === 사이드바

/**
 * 로컬스토리지에서 사이드바 열림 상태 얻기. 저장된 값이 없거나 이상한 값이면 true 반환
 * @returns boolean: true - 열림 / false - 닫힘
 */
function getSidebarOpen(): boolean {
  return getStoredBoolean(SIDEBAR_OPEN_KEY, true)
}

/**
 * 로컬스토리지에 사이드바 열림 상태 저장
 * @param value true - 열림 / false - 닫힘
 */
function setSidebarOpen(value: boolean) {
  setStored(SIDEBAR_OPEN_KEY, value)
}

// === 채팅

/**
 * 로컬스토리지에서 채팅 영역 폭 얻기. 저장된 값이 없거나 이상한 값이면 320 반환
 * @returns 채팅 영역 폭 | 320 (px)
 */
function getChatWidth(): number {
  return getStoredNumber(CHAT_WIDTH_KEY, 320)
}

/**
 * 로컬스토리지에 채팅 영역 폭 저장
 * @param value 채팅 영역 폭 (px)
 */
function setChatWidth(value: number) {
  setStored(CHAT_WIDTH_KEY, value)
}

// === 탭

/**
 * 로컬스토리지에서 열려있는 탭들 얻기. 저장된 값이 없거나 이상한 값이면 빈배열 반환
 * @returns 열려있는 탭 아이디들의 배열 | []
 */
function getOpenTabIds(): number[] {
  return getStoredNumberArray(OPEN_TAB_IDS_KEY, []);
}

/**
 * 로컬스토리지에 열려있는 탭들 저장 (JSON)
 * @param value 열려있는 탭 아이디들의 배열
 */
function setOpenTabIds(value: number[]) {
  setStoredJson(OPEN_TAB_IDS_KEY, value)
}

// === 폴더

/**
 * 로컬스토리지에서 마지막으로 위치했던 폴더의 아이디 얻기
 * @returns 마지막으로 위치했던 폴더의 아이디 | 루트 폴더 아이디
 */
function getLastFolderId(): number {
  return getStoredNumber(LAST_FOLDER_ID_KEY, ROOT_FOLDER_ID);
}

/**
 * 로컬스토리지에 마지막으로 위치했던 폴더의 아이디 저장
 * @param value 마지막으로 위치했던 폴더의 아이디
 */
function setLastFolderId(value: number) {
  setStored(LAST_FOLDER_ID_KEY, value)
}

// ===== 내보내기 =====

export default {
  getSidebarOpen,
  setSidebarOpen,

  getChatWidth,
  setChatWidth,

  getOpenTabIds,
  setOpenTabIds,

  getLastFolderId,
  setLastFolderId,
}
