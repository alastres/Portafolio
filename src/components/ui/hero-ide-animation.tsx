import React, { useState, useEffect } from 'react';
import { Terminal, Code, FolderOpen } from 'lucide-react';

const CODE_LINES: string[] = [
  "const desarrollador = {",
  "  nombre: 'Adrian Roidel Lastres Marinas',",
  "  habilidades: ['React', 'JavaScript', 'CSS', 'Node.js'],",
  "  pasión: 'Creación y refactorización de soluciones web'",
  "  estado: 'Disponible para proyectos'",
  "};",
  "",
  "function construirCosasIncreibles() {",
  "  return desarrollador.habilidades.map(habilidad => {",
  "    return `${habilidad} + creatividad = 🚀`;",
  "  });",
  "}",
  "",
  "// ¡Construyamos algo increíble juntos!",
  "construirCosasIncreibles();"
];

const HeroIDEAnimation: React.FC = () => {
  const [typedCode, setTypedCode] = useState<string>('');
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    // Animation completed - schedule reset
    if (currentLine >= CODE_LINES.length) {
      const resetTimeout = setTimeout(() => {
        // Reset scroll position before clearing state
        const codeContainer = document.getElementById('code-container');
        if (codeContainer) {
          codeContainer.scrollTop = 0;
        }

        // Reset all states to restart animation
        setShouldScroll(false);
        setTypedCode('');
        setCurrentLine(0);
      }, 3000);

      return () => clearTimeout(resetTimeout);
    }

    const currentLineText = CODE_LINES[currentLine];
    const lines = typedCode.split('\n');
    const currentTypedLength = lines[currentLine]?.length || 0;

    // Still typing current line
    if (currentTypedLength < currentLineText.length) {
      const timeout = setTimeout(() => {
        const newChar = currentLineText[currentTypedLength];
        setTypedCode(prev => prev + newChar);
      }, 50);
      return () => clearTimeout(timeout);
    }

    // Finished typing current line - move to next
    const timeout = setTimeout(() => {
      setTypedCode(prev => prev + '\n');
      setCurrentLine(prev => prev + 1);

      // Auto-scroll when reaching line 8
      if (currentLine >= 7) {
        setShouldScroll(true);
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [typedCode, currentLine]);

  // Auto-scroll effect
  useEffect(() => {
    const codeContainer = document.getElementById('code-container');
    if (!codeContainer) return;

    if (shouldScroll) {
      codeContainer.scrollTop = codeContainer.scrollHeight;
    } else {
      // Reset scroll when animation restarts
      codeContainer.scrollTop = 0;
    }
  }, [typedCode, shouldScroll]);

  const displayedLines: string[] = typedCode.split('\n').filter((_, index, arr) => {
    // Keep all lines except the last one if it's empty (happens during reset)
    return index < arr.length - 1 || arr[index] !== '';
  });

  return (

    <div className="w-full text-xs md:text-sm">
      {/* IDE Window */}
      <div className="bg-slate-800 rounded-md md:rounded-lg shadow-2xl overflow-hidden border border-slate-700">
        {/* Window Header */}
        <div className="bg-slate-900 px-3 py-2 md:px-4 md:py-3 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 md:gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-2 md:ml-4 flex items-center gap-2 text-slate-400">
              <Code size={14} className="md:w-4 md:h-4" />
              <span>portfolio.ts</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <FolderOpen size={14} className="text-slate-400 md:w-4 md:h-4" />
            <Terminal size={14} className="text-slate-400 md:w-4 md:h-4" />
          </div>
        </div>

        {/* IDE Content */}
        <div className="flex h-64 md:h-80 overflow-hidden bg-[#0a0f1e]">
          {/* Line Numbers */}
          <div className="bg-slate-900 px-2 py-4 md:px-4 md:py-6 text-slate-600 font-mono select-none overflow-y-auto scrollbar-hide border-r border-slate-700/50 text-right min-w-[2.5rem] md:min-w-[3.5rem]">
            {displayedLines.map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code Area */}
          <div
            id="code-container"
            className="flex-1 min-w-0 p-3 md:p-6 font-mono overflow-y-auto scroll-smooth overflow-x-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#475569 #1e293b'
            }}
          >
            <pre className="text-slate-300 w-max min-w-full">
              {displayedLines.map((line, index) => (
                <div key={index} className="leading-6">
                  {line.split('').map((char, charIndex) => {
                    const isKeyword = ['const', 'function', 'return', 'map'].some(kw =>
                      line.substring(0, charIndex + 1).trim().startsWith(kw)
                    );
                    const isString = line.includes("'") && char === "'" ||
                      (line.substring(0, charIndex).includes("'") &&
                        !line.substring(0, charIndex).split("'").length % 2 === 0);
                    const isComment = line.trim().startsWith('//');

                    let color = 'text-slate-300';
                    if (isComment) color = 'text-green-500';
                    else if (isString) color = 'text-amber-400';
                    else if (isKeyword) color = 'text-purple-400';
                    else if (char === '{' || char === '}' || char === '(' || char === ')' || char === '[' || char === ']') {
                      color = 'text-cyan-400';
                    }

                    return (
                      <span key={charIndex} className={color}>
                        {char}
                      </span>
                    );
                  })}
                  {index === displayedLines.length - 1 && (
                    <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
                      <span className="bg-slate-400 text-slate-900 px-0.5">_</span>
                    </span>
                  )}
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-700">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Codificando
            </span>
            <span>UTF-8</span>
            <span>TypeScript</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Línea {currentLine + 1}</span>
            <span>Col {displayedLines[displayedLines.length - 1]?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroIDEAnimation;