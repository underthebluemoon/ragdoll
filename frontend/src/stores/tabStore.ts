// librarys
import { create } from 'zustand';

// utils
import localStorageUtil from '../utils/localStorageUtil';

export interface DocTab {
  docId: string;
  title: string;
  highlightChunkId?: string;
}

interface TabState {
  tabs: DocTab[];
  putTab: (docId: string, title: string, highlightChunkId?: string) => void;
  removeTab: (docId: string) => void;
  clearTabs: () => void;
}

export const useTabStore = create<TabState>() ((set, get) => ({
  tabs: [],
  putTab: (docId, title, highlightChunkId) => {
    set(state => ({ tabs:
       state.tabs.some(t => t.docId === docId)
         ? state.tabs.map(t => (t.docId === docId ? { ...t, highlightChunkId } : t))
         : [...state.tabs, { docId, title, highlightChunkId }],
     }));
    localStorageUtil.setOpenTabIds(get().tabs.map(t => t.docId));
  },
  removeTab: (docId) => {
    set(state => ({ tabs: state.tabs.filter(t => t.docId !== docId) }));
    localStorageUtil.setOpenTabIds(get().tabs.map(t => t.docId));
  },
  clearTabs: () => {
    set({ tabs: [] });
    localStorageUtil.setOpenTabIds([]);
  },
}))
