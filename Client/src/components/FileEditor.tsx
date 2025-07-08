import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import FileTree from './FileTree';
import { PanelLeft } from 'lucide-react';
import { ResizableBox } from 'react-resizable';
import { useFileTree } from '../context/FileTreeContext';
import { type FileNode,getFileTypeInfo,updateTree } from '../lib/utility';

const FileEditor: React.FC = () => {
  const {fileTree, setFileTree, selectedFile ,setSelectedFile} = useFileTree();
  const [panel,setPanel] = useState<boolean>(true);

  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file);
  };

  const handleFileChange = (value: string | undefined) => {
    if (!selectedFile) return;

    const updatedTree = updateTree(fileTree, selectedFile.id, (node) => ({
      ...node,
      content: value || ''
    }));

    setFileTree(updatedTree);
    setSelectedFile({ ...selectedFile, content: value || '' });
  };

  return (
    <div className="w-full h-screen flex">
      {panel && (
      <ResizableBox 
        axis="x"
        resizeHandles={['e']}
        handle={
          <span className="absolute top-0 right-0 w-2 h-full cursor-col-resize z-10 bg-transparent" />
        }
        width={300}
        minConstraints={[150, 0]}
        maxConstraints={[600, 0]}
        // className="w-2/6 flex-shrink-0 border-r resize-x overflow-auto"
        >
        <FileTree
          onFileSelect={handleFileSelect}
        />
      </ResizableBox>)}

      {selectedFile ? (
        <div className="flex-1 w-4/6">
          <div className="h-10 p-3 bg-gray-800 text-secondary-500 flex justify-between">
            <h3 className="text-sm font-medium ">{selectedFile.name}</h3>
            <PanelLeft className="cursor-pointer " onClick={()=>{setPanel((prev)=>!prev)}}/>
          </div>
          <Editor
            height="100%"
            language={getFileTypeInfo(selectedFile.name)?.type} // or use 
            value={selectedFile.content ?? ''}
            onChange={handleFileChange}
            theme="vs-dark"
            options={{
              fontSize: 14,
              wordWrap: 'on',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true
            }}
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-gray-500">
          <p>Select a file to view its contents</p>
        </div>
      )}
    </div>
  );
};

export default FileEditor;
