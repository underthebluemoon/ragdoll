// librarys
import { create } from 'zustand'

// api
import { ROOT_FOLDER_ID } from '../api/folders'

interface FolderState {
  lastFolderId: string
  setLastFolderId: (folderId: string) => void
}

export const useFolderStore = create<FolderState>() (set => ({
  lastFolderId: ROOT_FOLDER_ID,
  setLastFolderId: (folderId) => set({ lastFolderId: folderId })
}))
