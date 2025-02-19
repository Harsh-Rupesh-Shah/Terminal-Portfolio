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
    },
    video: 'https://cdn.pixabay.com/vimeo/328816299/matrix-23532.mp4?width=1280&hash=f32407a4e5c3c1e7863f5ee0ad721d9f6cd2b8c6'
  },
  cyberpunk: {
    background: 'bg-purple-900',
    text: 'text-pink-400',
    accent: 'text-cyan-400',
    terminal: 'bg-purple-950/50',
    gradients: {
      primary: 'from-pink-900/20',
      secondary: 'to-cyan-500/5'
    },
    video: 'https://cdn.pixabay.com/vimeo/529929876/future-102371.mp4?width=1280&hash=6b1d634c34f68f1b2c3f2c6629b93ad6d10ed33f'
  },
  retro: {
    background: 'bg-amber-950',
    text: 'text-amber-400',
    accent: 'text-amber-500',
    terminal: 'bg-amber-900/50',
    gradients: {
      primary: 'from-amber-900/20',
      secondary: 'to-amber-500/5'
    },
    video: 'https://cdn.pixabay.com/vimeo/805977868/synthwave-169933.mp4?width=1280&hash=6e1c83b4c4e5d0df7ea751e3e2fe130a0e06ebe0'
  },
  midnight: {
    background: 'bg-slate-900',
    text: 'text-blue-400',
    accent: 'text-indigo-400',
    terminal: 'bg-slate-800/50',
    gradients: {
      primary: 'from-blue-900/20',
      secondary: 'to-indigo-500/5'
    },
    video: 'https://cdn.pixabay.com/vimeo/531005999/stars-102661.mp4?width=1280&hash=f4e8683f6b1c8bfb3c2d9943e0914d95c3f5c716'
  },
  synthwave: {
    background: 'bg-violet-950',
    text: 'text-pink-500',
    accent: 'text-purple-400',
    terminal: 'bg-violet-900/50',
    gradients: {
      primary: 'from-pink-900/20',
      secondary: 'to-purple-500/5'
    },
    video: 'https://cdn.pixabay.com/vimeo/804834028/synthwave-169553.mp4?width=1280&hash=c5cc7b1b0c71c6c6c7d5c3ed5a3c3b5c5c5c5c5c'
  },
  dracula: {
    background: 'bg-gray-900',
    text: 'text-purple-400',
    accent: 'text-pink-400',
    terminal: 'bg-gray-800/50',
    gradients: {
      primary: 'from-purple-900/20',
      secondary: 'to-pink-500/5'
    },
    video: 'https://cdn.pixabay.com/vimeo/540928419/smoke-105004.mp4?width=1280&hash=f32407a4e5c3c1e7863f5ee0ad721d9f6cd2b8c6'
  },
  nord: {
    background: 'bg-slate-900',
    text: 'text-blue-300',
    accent: 'text-cyan-400',
    terminal: 'bg-slate-800/50',
    gradients: {
      primary: 'from-blue-900/20',
      secondary: 'to-cyan-500/5'
    },
    video: 'https://cdn.pixabay.com/vimeo/529930144/northern-lights-102372.mp4?width=1280&hash=6b1d634c34f68f1b2c3f2c6629b93ad6d10ed33f'
  },
  solarized: {
    background: 'bg-teal-900',
    text: 'text-teal-400',
    accent: 'text-orange-400',
    terminal: 'bg-teal-800/50',
    gradients: {
      primary: 'from-teal-900/20',
      secondary: 'to-orange-500/5'
    },
    video: 'https://cdn.pixabay.com/vimeo/540928419/waves-105004.mp4?width=1280&hash=f32407a4e5c3c1e7863f5ee0ad721d9f6cd2b8c6'
  }
};