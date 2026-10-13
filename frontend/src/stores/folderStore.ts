// librarys
import { create } from 'zustand'

// types
import type { Folder } from '../api/types'

// api
import { getFolders } from '../api/folders'

interface FolderState {
  folders: Folder[]
  foldersLoaded: boolean
  fetchFolders: () => Promise<void>

  lastFolderId: string | null
  setLastFolderId: (folderId: string|null) => void
}

export const useFolderStore = create<FolderState>() (set => ({
  folders: [],
  foldersLoaded: false,
  fetchFolders: async () => {
    const data = await getFolders()
    set({ folders: data, foldersLoaded: true })
  },

  lastFolderId: null,
  setLastFolderId: (folderId) => set({ lastFolderId: folderId })
}))
