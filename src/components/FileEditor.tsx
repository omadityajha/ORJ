import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import FileTree, { getFileTypeInfo } from './FileTree';
import type { FileNode } from './FileTree';
import { PanelLeft } from 'lucide-react';

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
const initialFileTree: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        isOpen: true,
        children: [
          { id: '3', name: 'Header.jsx', type: 'file' },
          { id: '4', name: 'Sidebar.jsx', type: 'file' },
          { id: '5', name: 'FileTree.jsx', type: 'file' }
        ]
      },
      {
        id: '6',
        name: 'utils',
        type: 'folder',
        isOpen: false,
        children: [
          { id: '7', name: 'helpers.js', type: 'file' },
          { id: '8', name: 'constants.js', type: 'file' }
        ]
      },
      { id: '9', name: 'App.jsx', type: 'file' },
      { id: '10', name: 'index.js', type: 'file' }
    ]
  },
  {
    id: '11',
    name: 'public',
    type: 'folder',
    isOpen: false,
    children: [
      { id: '12', name: 'index.html', type: 'file' },
      { id: '13', name: 'favicon.ico', type: 'file' }
    ]
  },
  { id: '14', name: 'package.json', type: 'file' },
  { id: '15', name: 'README.md', type: 'file' }
];

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
      <div className="w-2/6 flex-shrink-0 border-r">
        <FileTree
          fileTree={fileTree}
          setFileTree={setFileTree}
          onFileSelect={handleFileSelect}
        />
      </div>)}

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
