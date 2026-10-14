// librarys
import { create } from 'zustand'

// util
import localStorageUtil from '../utils/localStorageUtil'

interface FolderState {
  lastFolderId: string
  setLastFolderId: (folderId: string) => void
}

export const useFolderStore = create<FolderState>() (set => ({
  lastFolderId: localStorageUtil.getLastFolderId(),
  setLastFolderId: (folderId) => {
    set({ lastFolderId: folderId })
    localStorageUtil.setLastFolderId(folderId)
  }
}))
