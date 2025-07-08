import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import FileTree, { getFileTypeInfo } from './FileTree';
import type { FileNode } from './FileTree';
import { PanelLeft } from 'lucide-react';
import { ResizableBox } from 'react-resizable';

// ✅ Recursive tree updater to update file content
const updateTree = (
  nodes: FileNode[],
  id: string,
  updater: (node: FileNode) => FileNode
): FileNode[] => {
  return nodes.map((node) => {
    if (node.id === id) return updater(node);
    if (node.children) {
      return {
        ...node,
        children: updateTree(node.children, id, updater)
      };
    }
    return node;
  });
};

// File tree data structure
const initialFileTree: FileNode[] = [{
 id: '1',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children:[
      { id: '2', name: 'index.html', type: 'file' , content:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <script src="script.js" href="script.js"></script>
</body>
</html>`},
      { id: '3', name: 'style.js', type: 'file' ,content:`*{
        margin: 0;
        padding: 0;
        }`},
      { id: '4', name: 'script.js', type: 'file',content:`// code here`}
    ] 
}];

const FileEditor: React.FC = () => {
  const [fileTree, setFileTree] = useState<FileNode[]>(initialFileTree); // set initial tree if needed
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
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
    <div className="w-full h-full flex">
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
          fileTree={fileTree}
          setFileTree={setFileTree}
          onFileSelect={handleFileSelect}
        />
      </ResizableBox>)}

      {selectedFile ? (
        <div className="flex-1 w-4/6">
          <div className="h-10 p-3 border-b border-gray-200 bg-gray-50 flex justify-between">
            <h3 className="text-sm font-medium text-gray-900">{selectedFile.name}</h3>
            <PanelLeft className="cursor-pointer" onClick={()=>{setPanel((prev)=>!prev)}}/>
          </div>
          <Editor
            height="100%"
            language={getFileTypeInfo(selectedFile.name)?.type} // or use 
            value={selectedFile.content ?? ''}
            onChange={handleFileChange}
            theme="vs"
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
