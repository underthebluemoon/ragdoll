// types
import type { DocumentSummary, ResponseCodeDTO } from './types'

// axios
import axiosInstance from './axiosInstance';

/**
 * 문서 하나를 서버에 요청
 * @param docId 문서 아이디
 * @returns 문서 객체 { id, title, folderId, uploader, updatedAt }
 */
export async function getDocument(documentId: number): Promise<DocumentSummary> {
  const url = `/api/documents/${documentId}`;
  const response = await axiosInstance.get<ResponseCodeDTO<DocumentSummary>>(url);

  console.log("getDocument api: ", response.data.data);
  return response.data.data;
}

export async function getDocumentsByIds(documentIds: number[]): Promise<DocumentSummary[]> {
  const url = `/api/documents`;
  const response = await axiosInstance.get<ResponseCodeDTO<DocumentSummary[]>>(url, {
    params: {ids: documentIds.join(',')}
  });

  console.log("getDocumentsByIds api: ", response.data.data);
  return response.data.data;
}
