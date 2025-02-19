import React, { useState, useRef, useEffect } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import { Terminal as TerminalIcon } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import { useTerminalStore } from '../store/terminalStore';
import { executeCommand } from '../utils/commands';
import { themes } from '../utils/themes';

const ASCII_NAME = `
██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗    ██████╗ ██╗   ██╗██████╗ ███████╗███████╗██╗  ██╗    ███████╗██╗  ██╗ █████╗ ██╗  ██╗
██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║    ██╔══██╗██║   ██║██╔══██╗██╔════╝██╔════╝██║  ██║    ██╔════╝██║  ██║██╔══██╗██║  ██║
███████║███████║██████╔╝███████╗███████║    ██████╔╝██║   ██║██████╔╝█████╗  ███████╗███████║    ███████╗███████║███████║███████║
██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║    ██╔══██╗██║   ██║██╔═══╝ ██╔══╝  ╚════██║██╔══██║    ╚════██║██╔══██║██╔══██║██╔══██║
██║  ██║██║  ██║██║  ██║███████║██║  ██║    ██║  ██║╚██████╔╝██║     ███████╗███████║██║  ██║    ███████║██║  ██║██║  ██║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [showPlayground, setShowPlayground] = useState(false);
  const [code, setCode] = useState(`// Write your JavaScript code here
// Example:
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("World"));
`);
  const [output, setOutput] = useState('');
  const { 
    history, 
    addToHistory, 
    commandHistory, 
    currentHistoryIndex, 
    setCurrentHistoryIndex,
    addToCommandHistory,
    theme,
    font,
    fontSize,
    opacity,
    clearHistory
  } = useTerminalStore();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [welcome] = useTypewriter({
    words: ['Welcome to my interactive portfolio! Type "help" to get started...'],
    loop: 1,
    typeSpeed: 50,
  });

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim();
      if (cmd === 'clear') {
        clearHistory();
        setInput('');
        return;
      }
      
      const output = executeCommand(cmd);
      addToHistory({
        command: cmd,
        output,
        timestamp: new Date(),
      });
      addToCommandHistory(cmd);
      setInput('');
      if (cmd === 'playground') {
        setShowPlayground(true);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentHistoryIndex > 0) {
        const newIndex = currentHistoryIndex - 1;
        setCurrentHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentHistoryIndex < commandHistory.length - 1) {
        const newIndex = currentHistoryIndex + 1;
        setCurrentHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setCurrentHistoryIndex(commandHistory.length);
        setInput('');
      }
    }
  };

  const executeJavaScript = () => {
    try {
      let consoleOutput = '';
      const originalConsole = { ...console };
      
      const overrideConsole = (method: 'log' | 'error' | 'warn' | 'info') => {
        console[method] = (...args) => {
          consoleOutput += args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ') + '\n';
        };
      };

      ['log', 'error', 'warn', 'info'].forEach(method => 
        overrideConsole(method as 'log' | 'error' | 'warn' | 'info')
      );

      const result = new Function(code)();

      Object.assign(console, originalConsole);

      let finalOutput = '';
      if (consoleOutput) {
        finalOutput += consoleOutput;
      }
      if (result !== undefined) {
        finalOutput += result !== null ? String(result) : 'null';
      }

      setOutput(finalOutput || 'Code executed successfully!');
    } catch (error) {
      setOutput(`Error: ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (editorRef.current?.contains(e.target as Node)) {
        return;
      }
      inputRef.current?.focus();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    setVideoLoaded(false);
  }, [theme]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const currentTheme = themes[theme];

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} p-4 relative overflow-hidden`}>
      {/* Theme-specific background video */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          key={currentTheme.video}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded ? 'opacity-20' : 'opacity-0'
          }`}
        >
          <source src={currentTheme.video} type="video/mp4" />
        </video>
        <div 
          className={`absolute inset-0 bg-gradient-to-b ${currentTheme.gradients?.primary} ${currentTheme.gradients?.secondary}`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center gap-4 mb-6">
          <pre className="text-xs md:text-sm lg:text-base font-mono leading-tight whitespace-pre overflow-x-auto w-full scrollbar-hide text-green-400">
            {ASCII_NAME}
          </pre>
        </div>
        
        <div 
          ref={terminalRef}
          className={`${currentTheme.terminal} rounded-lg p-4 md:p-6 h-[75vh] overflow-y-auto backdrop-blur-sm border border-current/20`}
          style={{ 
            fontSize: `${fontSize}px`,
            fontFamily: font,
            opacity: opacity
          }}
        >
          <div className="mb-4">{welcome}</div>
          
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center gap-2">
                <span className={currentTheme.accent}>➜</span>
                <span className={currentTheme.accent}>~</span>
                <span>{item.command}</span>
              </div>
              <div className="ml-6 mt-1">{item.output}</div>
            </div>
          ))}
          
          {showPlayground && (
            <div className="my-4 p-4 border border-current/20 rounded">
              <h3 className="text-lg font-bold mb-2">JavaScript Playground</h3>
              <div ref={editorRef} className="playground-editor">
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={code => highlight(code, languages.javascript, 'javascript')}
                  padding={10}
                  style={{
                    fontSize: '16px',
                  }}
                  textareaClassName="focus:outline-none"
                />
              </div>
              <button
                onClick={executeJavaScript}
                className="mt-2 px-4 py-2 bg-current/20 rounded hover:bg-current/30 transition-colors"
              >
                Run Code
              </button>
              {output && (
                <div className="mt-2 p-2 bg-black/20 rounded">
                  <pre className="whitespace-pre-wrap">{output}</pre>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <span className={currentTheme.accent}>➜</span>
            <span className={currentTheme.accent}>~</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none flex-1"
              style={{ 
                fontSize: `${fontSize}px`,
                fontFamily: font
              }}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};