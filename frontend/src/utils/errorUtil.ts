/**
 * 에러 코드와 문구
 */

// librarys
import axios from 'axios';

// types
import type { ResponseCodeDTO } from '../api/types';

const ERROR_MESSAGES: Record<string, string> = {
  D001: "문서를 찾을 수 없습니다.",
  F001: "폴더를 찾을 수 없습니다."
};

const DEFAULT_ERROR_MESSAGE = '요청을 처리하지 못했습니다.';

/**
 * 지정한 메세지나, 에러 코드에 맞는 문구를 반환. 문구는 ERROR_MESSAGES에 지정.
 * 지정메세지도 없고 에러 메세지도 없는 경우, DEFAULT_ERROR_MESSAGE 사용
 * @param error catch에서 받은 에러
 * @param [message] 지정한 에러 메세지
 * @returns 지정 문구 > 코드별 문구 > 기본 문구
 */
export function getErrorMessage(error: unknown, message?: string): string {
  // 지정 메세지가 있는 경우, 그대로 반환
  if(message) return message;

  // 지정 메세지가 없는 경우, 코드로 메세지를 찾아서 반환
  if(axios.isAxiosError<ResponseCodeDTO<null>>(error)) {
    const code = error.response?.data?.code;
    if(code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];
  }

  // 지정메세지도 없고 에러 메세지도 없는 경우, 기본 메세지 반환
  return DEFAULT_ERROR_MESSAGE;
}
