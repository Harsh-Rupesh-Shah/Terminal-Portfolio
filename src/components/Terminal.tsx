import React, { useState, useRef, useEffect } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import { Terminal as TerminalIcon } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import { useTerminalStore } from '../store/terminalStore';
import { executeCommand } from '../utils/commands';
import { themes } from '../utils/themes';

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
    opacity
  } = useTerminalStore();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  
  const [welcome] = useTypewriter({
    words: ['Welcome to my interactive portfolio! Type "help" to get started...'],
    loop: 1,
    typeSpeed: 50,
  });

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const output = executeCommand(input.trim());
      addToHistory({
        command: input,
        output,
        timestamp: new Date(),
      });
      addToCommandHistory(input);
      setInput('');
      if (input === 'playground') {
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
      
      // Override console methods
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

      // Execute the code
      const result = new Function(code)();

      // Restore original console
      Object.assign(console, originalConsole);

      // Combine console output with return value
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

  const currentTheme = themes[theme];

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} p-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="soft-matrix-text">HARSH RUPESH SHAH</div>
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-6 h-6" />
            <h1 className="text-xl font-bold">Terminal Portfolio</h1>
          </div>
        </div>
        
        <div 
          ref={terminalRef}
          className={`${currentTheme.terminal} rounded-lg p-6 h-[80vh] overflow-y-auto backdrop-blur-sm border border-current/20`}
          style={{ fontSize: '16px' }}
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
              style={{ fontSize: '16px' }}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};