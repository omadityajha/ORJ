import React, { useEffect, useRef, useState, useCallback } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import FileTree from './FileTree';
import Terminal from './Terminal';
import { Command, PanelBottom, PanelLeft, Play } from 'lucide-react';
import { useFileTree } from '../context/FileTreeContext.tsx';
import { getFileTypeInfo } from '../lib/utility';
import { useSocket } from '@context/SocketProvider.tsx';
import { extensionCommandMap } from '../lib/runCommands.ts';

const FileEditor: React.FC = () => {
  const { selectedFile, setSelectedFile,fetchFileTree } = useFileTree();
  const socket = useSocket();

  const [code,setCode] = useState('');
  const [selectedFileContent,setSelectedFileContent] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [isDraggingSidebar, setIsDraggingSidebar] = useState(false);
  const [isDraggingTerminal, setIsDraggingTerminal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isSaved,setIsSaved] = useState(selectedFileContent === code);

  // Fetch file tree from backend
  useEffect(() => {
    fetchFileTree();
  }, []);
  const fetchTreeAndSetSave = () =>{
    fetchFileTree();
    getFileContents();
  }
  useEffect(()=>{
    socket.on('file:refresh',fetchTreeAndSetSave);
    return ()=>{
      socket.off("file:refresh",fetchTreeAndSetSave);
    }
  })
  
  // Debounced layout update for smoother resizing
  const updateEditorLayout = useCallback(() => {
    if (editorRef.current) {
      // Small delay to ensure DOM has updated
      requestAnimationFrame(() => {
        editorRef.current?.layout();
      });
    }
  }, []);

  // Sidebar resize handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSidebar) {
        e.preventDefault();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
          const newWidth = Math.max(200, Math.min(600, e.clientX - containerRect.left));
          setSidebarWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSidebar(false);
      updateEditorLayout();
    };

    if (isDraggingSidebar) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDraggingSidebar, updateEditorLayout]);

  // Terminal resize handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingTerminal) {
        e.preventDefault();
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (containerRect) {
          const newHeight = Math.max(100, Math.min(400, containerRect.bottom - e.clientY));
          setTerminalHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingTerminal(false);
      updateEditorLayout();
    };

    if (isDraggingTerminal) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDraggingTerminal, updateEditorLayout]);

  // Update editor layout when panels are toggled
  useEffect(() => {
    const timer = setTimeout(updateEditorLayout, 100);
    return () => clearTimeout(timer);
  }, [showSidebar, showTerminal, updateEditorLayout]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => updateEditorLayout();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateEditorLayout]);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    // Initial layout after mount
    setTimeout(() => editor.layout(), 50);
  };

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  const toggleTerminal = () => {
    setShowTerminal(prev => !prev);
  };
  
  const handleCodeRunner = () =>{
    if(selectedFile){
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();
      if(!extension)return;
      const getCmd = extensionCommandMap[extension];
      if(getCmd){
        const cmd = getCmd(selectedFile.path);
        socket.emit("terminal:write",`${cmd}\r`);
      }
      else{
        alert("Unsupported file type for execution.");
      }
    }
  }

  const getFileContents = useCallback(async () =>{
    if(!selectedFile) return;
    const response = await fetch(`http://localhost:9000/files/content?path=${encodeURIComponent(selectedFile.path)}`);
    const result = await response.json();
    setSelectedFileContent(result.content);

  },[selectedFile])

  useEffect(() =>{
    if(selectedFile)
      getFileContents();
  },[selectedFile])

  useEffect(()=>{
    if(code && !isSaved && selectedFile?.path){
      const timer = setTimeout(()=>{
        socket.emit('file:change',{
          path:selectedFile.path,
          content:code,
        })
      },5*1000)
      return ()=>{
        clearInterval(timer);
      }
    }
  },[code,selectedFile,isSaved]);

  useEffect(()=>{
    setCode("");
  },[selectedFile]);

  useEffect(()=>{
    setCode(selectedFileContent);
  },[selectedFileContent]);

  useEffect(()=>{
    if(code===selectedFileContent){
      setIsSaved(true);
    }
    else setIsSaved(false);
  },[code,selectedFileContent])

  return (
    <div className="w-full h-screen flex flex-col bg-[#1e1e1e]" ref={containerRef}>
      {/* Main content area */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        {showSidebar && (
          <div
            className="relative bg-[#181818] flex-shrink-0 transition-all duration-200 ease-in-out"
            style={{ width: sidebarWidth }}
          >
            <FileTree onFileSelect={setSelectedFile} />
            {/* Sidebar resize handle */}
            <div
              className="absolute top-0 right-0 w-1 h-full bg-transparent hover:bg-blue-500 cursor-col-resize z-10 transition-colors duration-150"
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingSidebar(true);
              }}
            />
          </div>
        )}

        {/* Editor area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Top bar */}
          <div className="h-10 bg-gray-800 text-gray-300 px-4 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
            <h3 className="text-sm font-medium truncate">
              {selectedFile?.name ?? 'No file selected'}
              <span className='mx-2 text-gray-600'>{isSaved?"(Saved)":"(Unsaved)"}</span>
            </h3>
            <div className="flex gap-3">
              <span className='text-secondary-500'>Run Code</span><Play
                className="cursor-pointer hover:text-white transition-colors w-4 h-4" 
                onClick={handleCodeRunner}
              />
              <PanelLeft 
                className="cursor-pointer hover:text-white transition-colors w-4 h-4" 
                onClick={toggleSidebar}
              />
              <PanelBottom 
                className="cursor-pointer hover:text-white transition-colors w-4 h-4" 
                onClick={toggleTerminal}
              />
            </div>
          </div>

          {/* Editor and Terminal container */}
          <div className="flex flex-col flex-1 min-h-0">
            {/* Editor */}
            <div 
              className="flex-1 min-h-0 relative"
              style={{ 
                height: showTerminal ? `calc(100% - ${terminalHeight}px)` : '100%'
              }}
            >
              {selectedFile?
                (
                <Editor
                  height="100%"
                  width="100%"
                  language={getFileTypeInfo(selectedFile.name)?.type}
                  value={code}
                  onChange={e =>setCode(e?e:"")}
                  onMount={handleEditorMount}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: false,
                    lineNumbers: 'on',
                    glyphMargin: true,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <p className="text-lg mb-2">No file selected</p>
                    <p className="text-sm text-gray-400">Choose a file from the sidebar to start editing</p>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal */}
            {showTerminal && (
              <div className="relative bg-black flex-shrink-0" style={{ height: terminalHeight }}>
                {/* Terminal resize handle */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-transparent hover:bg-blue-500 cursor-row-resize z-10 transition-colors duration-150"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsDraggingTerminal(true);
                  }}
                />
                <div className="h-full pt-1">
                  <Terminal />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileEditor;