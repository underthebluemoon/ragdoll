/**
 * 로컬 스토리지 관리
 * - 밖에서는 키별 getter/setter만 사용
 * - getter/setter를 객체 하나로 묶어 default로 내보냄 → import storage from '.../utils/localstorage' → storage.getXxx()
 * - 문자열 ↔ 값 변환, 접근 에러 처리는 아래 공용 함수에서 한 번만
 */

// ===== 키 =====
const SIDEBAR_OPEN_KEY = 'sidebar-open'   // 넓은 화면 사이드바 열림 여부 (boolean)
const CHAT_WIDTH_KEY = 'chat-width'       // 채팅 영역 폭 px (number)


// ===== 공용 함수 (이 파일 안에서만 사용) =====

/**
 * 읽기
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
 * 값 읽기 - 로컬스토리지에 저장한 값이 boolean인 경우
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
 * 값 읽기 - 로컬스토리지에 저장한 값이 number인 경우
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

/**
 * 저장 - 문자열로 바꿔서 저장. 실패 시 처리 없음 → 계속 동작
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


// ===== 키별 getter / setter =====

// 사이드바

/**
 * 사이드바 열림 상태 얻기. 저장된 값이 없거나 이상한 값이면 true 반환
 * @returns boolean: true - 열림 / false - 닫힘
 */
function getSidebarOpen(): boolean {
  return getStoredBoolean(SIDEBAR_OPEN_KEY, true)
}

/**
 * 사이드바 열림 상태 저장
 * @param value true - 열림 / false - 닫힘
 */
function setSidebarOpen(value: boolean) {
  setStored(SIDEBAR_OPEN_KEY, value)
}


// 채팅

/**
 * 채팅 영역 폭 얻기. 저장된 값이 없거나 이상한 값이면 320 반환
 * @returns 채팅 영역 폭 (px)
 */
function getChatWidth(): number {
  return getStoredNumber(CHAT_WIDTH_KEY, 320)
}

/**
 * 채팅 영역 폭 저장
 * @param value 채팅 영역 폭 (px)
 */
function setChatWidth(value: number) {
  setStored(CHAT_WIDTH_KEY, value)
}


// ===== 내보내기 =====

export default {
  getSidebarOpen,
  setSidebarOpen,
  getChatWidth,
  setChatWidth,
}
