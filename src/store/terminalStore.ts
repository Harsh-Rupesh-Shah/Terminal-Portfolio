import { create } from 'zustand';
import { TerminalState, HistoryItem, Theme, Font } from '../types';

export const useTerminalStore = create<TerminalState>((set) => ({
  history: [],
  commandHistory: [],
  currentHistoryIndex: -1,
  theme: 'matrix',
  font: 'Fira Code',
  fontSize: 18,
  opacity: 0.9,
  addToHistory: (item: HistoryItem) =>
    set((state) => ({ history: [...state.history, item] })),
  clearHistory: () => set({ history: [] }),
  addToCommandHistory: (command: string) =>
    set((state) => ({ 
      commandHistory: [...state.commandHistory, command],
      currentHistoryIndex: state.commandHistory.length
    })),
  setCurrentHistoryIndex: (index: number) =>
    set({ currentHistoryIndex: index }),
  setTheme: (theme: Theme) =>
    set({ theme }),
  setFont: (font: Font) =>
    set({ font }),
  setFontSize: (fontSize: number) =>
    set({ fontSize }),
  setOpacity: (opacity: number) =>
    set({ opacity }),
}));