export interface Command {
  name: string;
  description: string;
  usage?: string;
  execute: (args?: string[]) => string | JSX.Element;
}

export interface TerminalState {
  history: HistoryItem[];
  commandHistory: string[];
  currentHistoryIndex: number;
  theme: Theme;
  font: Font;
  fontSize: number;
  opacity: number;
  addToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
  addToCommandHistory: (command: string) => void;
  setCurrentHistoryIndex: (index: number) => void;
  setTheme: (theme: Theme) => void;
  setFont: (font: Font) => void;
  setFontSize: (size: number) => void;
  setOpacity: (opacity: number) => void;
}

export interface HistoryItem {
  command: string;
  output: string | JSX.Element;
  timestamp: Date;
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  screenshot?: string;
}

export type Theme = 'matrix' | 'cyberpunk' | 'retro' | 'midnight' | 'synthwave' | 'dracula' | 'nord' | 'solarized';
export type Font = 'Fira Code' | 'JetBrains Mono' | 'Source Code Pro' | 'Ubuntu Mono' | 'Cascadia Code';

export interface ThemeConfig {
  background: string;
  text: string;
  accent: string;
  terminal: string;
  gradients?: {
    primary: string;
    secondary: string;
  };
  video: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  preview: string;
}