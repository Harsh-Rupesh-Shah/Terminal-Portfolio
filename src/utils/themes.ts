import { Theme, ThemeConfig } from '../types';

export const themes: Record<Theme, ThemeConfig> = {
  matrix: {
    background: 'bg-black',
    text: 'text-green-400',
    accent: 'text-green-500',
    terminal: 'bg-black/50',
    gradients: {
      primary: 'from-green-900/20',
      secondary: 'to-green-500/5'
    }
  },
  cyberpunk: {
    background: 'bg-purple-900',
    text: 'text-pink-400',
    accent: 'text-cyan-400',
    terminal: 'bg-purple-950/50',
    gradients: {
      primary: 'from-pink-900/20',
      secondary: 'to-cyan-500/5'
    }
  },
  retro: {
    background: 'bg-amber-950',
    text: 'text-amber-400',
    accent: 'text-amber-500',
    terminal: 'bg-amber-900/50',
    gradients: {
      primary: 'from-amber-900/20',
      secondary: 'to-amber-500/5'
    }
  },
  midnight: {
    background: 'bg-slate-900',
    text: 'text-blue-400',
    accent: 'text-indigo-400',
    terminal: 'bg-slate-800/50',
    gradients: {
      primary: 'from-blue-900/20',
      secondary: 'to-indigo-500/5'
    }
  },
  synthwave: {
    background: 'bg-violet-950',
    text: 'text-pink-500',
    accent: 'text-purple-400',
    terminal: 'bg-violet-900/50',
    gradients: {
      primary: 'from-pink-900/20',
      secondary: 'to-purple-500/5'
    }
  },
  dracula: {
    background: 'bg-gray-900',
    text: 'text-purple-400',
    accent: 'text-pink-400',
    terminal: 'bg-gray-800/50',
    gradients: {
      primary: 'from-purple-900/20',
      secondary: 'to-pink-500/5'
    }
  },
  nord: {
    background: 'bg-slate-900',
    text: 'text-blue-300',
    accent: 'text-cyan-400',
    terminal: 'bg-slate-800/50',
    gradients: {
      primary: 'from-blue-900/20',
      secondary: 'to-cyan-500/5'
    }
  },
  solarized: {
    background: 'bg-teal-900',
    text: 'text-teal-400',
    accent: 'text-orange-400',
    terminal: 'bg-teal-800/50',
    gradients: {
      primary: 'from-teal-900/20',
      secondary: 'to-orange-500/5'
    }
  }
};