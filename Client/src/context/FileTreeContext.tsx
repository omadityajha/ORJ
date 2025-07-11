import React, { createContext, useContext, useState, useEffect } from 'react';
import { type FileNode } from '../lib/utility'; // your FileNode type

// Context type
interface FileTreeContextType {
  fileTree: FileNode[];
  setFileTree: React.Dispatch<React.SetStateAction<FileNode[]>>;
  selectedFile: FileNode | null;
  setSelectedFile: (file: FileNode | null) => void;
  fetchFileTree: ()=>void;
}

// Create context
const FileTreeContext = createContext<FileTreeContextType | undefined>(undefined);

// Provider component
export const FileTreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  const fetchFileTree = async () => {
      try {
        const res = await fetch('http://localhost:9000/files'); // backend endpoint
        const data = await res.json();
        setFileTree(data); // update context state
      } catch (err) {
        console.error('Failed to fetch file tree:', err);
      }
    };

  return (
    <FileTreeContext.Provider
      value={{
        fileTree,
        setFileTree,
        selectedFile,
        setSelectedFile,
        fetchFileTree
      }}
    >
      {children}
    </FileTreeContext.Provider>
  );
};

// Custom hook
export const useFileTree = (): FileTreeContextType => {
  const context = useContext(FileTreeContext);
  if (!context) throw new Error('useFileTree must be used within FileTreeProvider');
  return context;
};
