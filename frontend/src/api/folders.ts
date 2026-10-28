// types
import type { FolderItemsResponse, FolderSummary, ResponseCodeDTO } from './types'

// axois
import axiosInstance from './axiosInstance'

// root 폴더의 id = 1 : migration V2에서 생성
export const ROOT_FOLDER_ID = 1;

/**
 * 루트부터 현재 위치까지 폴더 경로를 서버에 요청
 * @param folderId 현재 폴더 아이디
 * @returns 루트부터 현재 위치까지 폴더 경로
 */
export async function getFolderPath(folderId: number): Promise<FolderSummary[]> {
  const url = `/api/folders/${folderId}/path`;
  const response = await axiosInstance.get<ResponseCodeDTO<FolderSummary[]>>(url);

  // console.log("getFolderPath api: ", response.data.data);
  return response.data.data;
}

/**
 * 현재 폴더의 아이템(폴더, 문서 등)을 서버에 요청
 * @param folderId 현재 폴더 아이디
 * @returns 현재 폴더 아이템(폴더, 문서 등)들
 */
export async function getFolderItems(folderId: number): Promise<FolderItemsResponse> {
  const url = `/api/folders/${folderId}/items`;
  const response = await axiosInstance.get<ResponseCodeDTO<FolderItemsResponse>>(url);

  // console.log("getFolderItems api: ", response.data.data);
  return response.data.data;
}
