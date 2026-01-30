import React, { useState, useEffect } from 'react';
import { Terminal, Code, FolderOpen } from 'lucide-react';

const HeroIDEAnimation: React.FC = () => {
  const [typedCode, setTypedCode] = useState<string>('');
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);

  const codeLines: string[] = [
    "const developer = {",
    "  name: 'Tu Nombre',",
    "  skills: ['React', 'JavaScript', 'CSS'],",
    "  passion: 'Crear experiencias web',",
    "  status: 'Disponible para proyectos'",
    "};",
    "",
    "function buildAmazingThings() {",
    "  return developer.skills.map(skill => {",
    "    return `${skill} + creatividad = 🚀`;",
    "  });",
    "}",
    "",
    "// ¡Construyamos algo increíble juntos!",
    "buildAmazingThings();"
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      setTimeout(() => {
        setTypedCode('');
        setCurrentLine(0);
        setShouldScroll(false);
      }, 3000);
      return;
    }

    const currentLineText = codeLines[currentLine];
    const currentTypedLength = typedCode.split('\n')[currentLine]?.length || 0;

    if (currentTypedLength < currentLineText.length) {
      const timeout = setTimeout(() => {
        const newChar = currentLineText[currentTypedLength];
        setTypedCode(prev => prev + newChar);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedCode(prev => prev + '\n');
        setCurrentLine(prev => prev + 1);
        
        // Auto-scroll when reaching line 8
        if (currentLine >= 7) {
          setShouldScroll(true);
        }
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [typedCode, currentLine, codeLines]);

  // Auto-scroll effect
  useEffect(() => {
    if (shouldScroll) {
      const codeContainer = document.getElementById('code-container');
      if (codeContainer) {
        codeContainer.scrollTop = codeContainer.scrollHeight;
      }
    }
  }, [typedCode, shouldScroll]);

  const displayedLines: string[] = typedCode.split('\n');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* IDE Window */}
        <div className="bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-700">
          {/* Window Header */}
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 flex items-center gap-2 text-slate-400 text-sm">
                <Code size={16} />
                <span>portfolio.ts</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FolderOpen size={16} className="text-slate-400" />
              <Terminal size={16} className="text-slate-400" />
            </div>
          </div>

          {/* IDE Content */}
          <div className="flex h-80 overflow-hidden">
            {/* Line Numbers */}
            <div className="bg-slate-900 px-4 py-6 text-slate-600 text-sm font-mono select-none overflow-y-auto scrollbar-hide">
              {displayedLines.map((_, index) => (
                <div key={index} className="leading-6">
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Code Area */}
            <div 
              id="code-container"
              className="flex-1 p-6 font-mono text-sm overflow-y-auto scroll-smooth"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#475569 #1e293b'
              }}
            >
              <pre className="text-slate-300">
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
          <div className="bg-purple-600 px-4 py-2 flex items-center justify-between text-xs text-white">
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

        {/* Text Below IDE */}
        <div className="mt-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Desarrollador <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Full Stack</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Transformando ideas en código, una línea a la vez
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroIDEAnimation;
