import React, { useState, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  File, 
  Folder, 
  FolderOpen,
  Plus,
  MoreHorizontal,
  Edit3,
  Trash2,
  Copy
} from 'lucide-react';

// TypeScript interfaces
export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  isOpen?: boolean;
  children?: FileNode[];
  content?:string;
}

interface FileIconProps {
  fileName: string;
  className?: string;
}

interface FileTreeNodeProps {
  node: FileNode;
  level?: number;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
  onContextMenu: (e: React.MouseEvent, node: FileNode) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onAddFile: (parentId: string) => void;
  onAddFolder: (parentId: string) => void;
}

interface FileTreeProps {
  fileTree: FileNode[]
  setFileTree: React.Dispatch<React.SetStateAction<FileNode[]>>
  onFileSelect: (node: FileNode) => void
}
// File type definitions
type FileType = 
  | 'javascript'
  | 'typescript'
  | 'css'
  | 'html'
  | 'json'
  | 'markdown'
  | 'python'
  | 'java'
  | 'cpp'
  | 'csharp'
  | 'php'
  | 'ruby'
  | 'go'
  | 'rust'
  | 'swift'
  | 'xml'
  | 'yaml'
  | 'dockerfile'
  | 'shell'
  | 'image'
  | 'video'
  | 'audio'
  | 'pdf'
  | 'archive'
  | 'text'
  | 'config'
  | 'unknown';

interface FileTypeInfo {
  type: FileType;
  color: string;
  category: 'code' | 'markup' | 'data' | 'media' | 'document' | 'config' | 'other';
  language?: string;
}

// File type detection function
const getFileTypeInfo = (fileName: string): FileTypeInfo => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  if (!extension) {
    return { type: 'unknown', color: 'text-gray-500', category: 'other' };
  }

  const fileTypeMap: Record<string, FileTypeInfo> = {
    // JavaScript/TypeScript
    'js': { type: 'javascript', color: 'text-yellow-500', category: 'code', language: 'JavaScript' },
    'jsx': { type: 'javascript', color: 'text-yellow-500', category: 'code', language: 'JavaScript' },
    'ts': { type: 'typescript', color: 'text-blue-500', category: 'code', language: 'TypeScript' },
    'tsx': { type: 'typescript', color: 'text-blue-500', category: 'code', language: 'TypeScript' },
    'mjs': { type: 'javascript', color: 'text-yellow-500', category: 'code', language: 'JavaScript' },
    'cjs': { type: 'javascript', color: 'text-yellow-500', category: 'code', language: 'JavaScript' },
    
    // Web technologies
    'html': { type: 'html', color: 'text-orange-500', category: 'markup', language: 'HTML' },
    'htm': { type: 'html', color: 'text-orange-500', category: 'markup', language: 'HTML' },
    'css': { type: 'css', color: 'text-blue-400', category: 'markup', language: 'CSS' },
    'scss': { type: 'css', color: 'text-pink-500', category: 'markup', language: 'SCSS' },
    'sass': { type: 'css', color: 'text-pink-500', category: 'markup', language: 'Sass' },
    'less': { type: 'css', color: 'text-blue-600', category: 'markup', language: 'Less' },
    
    // Data formats
    'json': { type: 'json', color: 'text-green-500', category: 'data', language: 'JSON' },
    'xml': { type: 'xml', color: 'text-orange-600', category: 'data', language: 'XML' },
    'yaml': { type: 'yaml', color: 'text-purple-500', category: 'data', language: 'YAML' },
    'yml': { type: 'yaml', color: 'text-purple-500', category: 'data', language: 'YAML' },
    'toml': { type: 'config', color: 'text-gray-600', category: 'config', language: 'TOML' },
    
    // Documentation
    'md': { type: 'markdown', color: 'text-gray-700', category: 'document', language: 'Markdown' },
    'markdown': { type: 'markdown', color: 'text-gray-700', category: 'document', language: 'Markdown' },
    'txt': { type: 'text', color: 'text-gray-600', category: 'document', language: 'Text' },
    'pdf': { type: 'pdf', color: 'text-red-500', category: 'document', language: 'PDF' },
    
    // Programming languages
    'py': { type: 'python', color: 'text-green-600', category: 'code', language: 'Python' },
    'java': { type: 'java', color: 'text-red-600', category: 'code', language: 'Java' },
    'cpp': { type: 'cpp', color: 'text-blue-600', category: 'code', language: 'C++' },
    'c': { type: 'cpp', color: 'text-blue-600', category: 'code', language: 'C' },
    'h': { type: 'cpp', color: 'text-blue-600', category: 'code', language: 'C/C++ Header' },
    'cs': { type: 'csharp', color: 'text-purple-600', category: 'code', language: 'C#' },
    'php': { type: 'php', color: 'text-indigo-500', category: 'code', language: 'PHP' },
    'rb': { type: 'ruby', color: 'text-red-500', category: 'code', language: 'Ruby' },
    'go': { type: 'go', color: 'text-cyan-500', category: 'code', language: 'Go' },
    'rs': { type: 'rust', color: 'text-orange-700', category: 'code', language: 'Rust' },
    'swift': { type: 'swift', color: 'text-orange-500', category: 'code', language: 'Swift' },
    
    // Shell scripts
    'sh': { type: 'shell', color: 'text-green-700', category: 'code', language: 'Shell' },
    'bash': { type: 'shell', color: 'text-green-700', category: 'code', language: 'Bash' },
    'zsh': { type: 'shell', color: 'text-green-700', category: 'code', language: 'Zsh' },
    'fish': { type: 'shell', color: 'text-green-700', category: 'code', language: 'Fish' },
    'ps1': { type: 'shell', color: 'text-blue-700', category: 'code', language: 'PowerShell' },
    
    // Config files
    'env': { type: 'config', color: 'text-gray-600', category: 'config', language: 'Environment' },
    'ini': { type: 'config', color: 'text-gray-600', category: 'config', language: 'INI' },
    'conf': { type: 'config', color: 'text-gray-600', category: 'config', language: 'Config' },
    'config': { type: 'config', color: 'text-gray-600', category: 'config', language: 'Config' },
    'dockerfile': { type: 'dockerfile', color: 'text-blue-500', category: 'config', language: 'Dockerfile' },
    
    // Images
    'png': { type: 'image', color: 'text-purple-500', category: 'media', language: 'PNG Image' },
    'jpg': { type: 'image', color: 'text-purple-500', category: 'media', language: 'JPEG Image' },
    'jpeg': { type: 'image', color: 'text-purple-500', category: 'media', language: 'JPEG Image' },
    'gif': { type: 'image', color: 'text-purple-500', category: 'media', language: 'GIF Image' },
    'svg': { type: 'image', color: 'text-purple-500', category: 'media', language: 'SVG Image' },
    'webp': { type: 'image', color: 'text-purple-500', category: 'media', language: 'WebP Image' },
    'ico': { type: 'image', color: 'text-purple-500', category: 'media', language: 'Icon' },
    
    // Video
    'mp4': { type: 'video', color: 'text-red-500', category: 'media', language: 'MP4 Video' },
    'avi': { type: 'video', color: 'text-red-500', category: 'media', language: 'AVI Video' },
    'mov': { type: 'video', color: 'text-red-500', category: 'media', language: 'MOV Video' },
    'mkv': { type: 'video', color: 'text-red-500', category: 'media', language: 'MKV Video' },
    'webm': { type: 'video', color: 'text-red-500', category: 'media', language: 'WebM Video' },
    
    // Audio
    'mp3': { type: 'audio', color: 'text-green-500', category: 'media', language: 'MP3 Audio' },
    'wav': { type: 'audio', color: 'text-green-500', category: 'media', language: 'WAV Audio' },
    'flac': { type: 'audio', color: 'text-green-500', category: 'media', language: 'FLAC Audio' },
    'ogg': { type: 'audio', color: 'text-green-500', category: 'media', language: 'OGG Audio' },
    
    // Archives
    'zip': { type: 'archive', color: 'text-yellow-600', category: 'other', language: 'ZIP Archive' },
    'rar': { type: 'archive', color: 'text-yellow-600', category: 'other', language: 'RAR Archive' },
    'tar': { type: 'archive', color: 'text-yellow-600', category: 'other', language: 'TAR Archive' },
    'gz': { type: 'archive', color: 'text-yellow-600', category: 'other', language: 'GZ Archive' },
    '7z': { type: 'archive', color: 'text-yellow-600', category: 'other', language: '7-Zip Archive' },
  };

  return fileTypeMap[extension] || { type: 'unknown', color: 'text-gray-500', category: 'other' };
};

// Export the function for external use
export { getFileTypeInfo, type FileTypeInfo, type FileType };


const FileIcon: React.FC<FileIconProps> = ({ fileName, className = "" }) => {
  const fileTypeInfo = getFileTypeInfo(fileName);
  const iconClass = `w-4 h-4 ${className}`;
  
  switch (fileTypeInfo.type) {
    case 'javascript':
    case 'typescript':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'css':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'html':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'json':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'markdown':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'python':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'java':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'cpp':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'csharp':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'php':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'ruby':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'go':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'rust':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'swift':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'shell':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'xml':
    case 'yaml':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'dockerfile':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'config':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'image':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'video':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'audio':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'pdf':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'archive':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    case 'text':
      return <File className={`${iconClass} ${fileTypeInfo.color}`} />;
    default:
      return <File className={`${iconClass} text-gray-500`} />;
  }
};

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ 
  node, 
  level = 0, 
  onToggle, 
  onSelect, 
  selectedId, 
  onContextMenu,
  onRename,
  onDelete,
  onAddFile,
  onAddFolder 
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(node.name);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id);
  };

  const handleSelect = () => {
    onSelect(node.id);
  };

  const handleRename = () => {
    if (newName.trim() && newName !== node.name) {
      onRename(node.id, newName.trim());
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setNewName(node.name);
      setIsRenaming(false);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowContextMenu(true);
    onContextMenu(e, node);
  };

  const startRename = () => {
    setIsRenaming(true);
    setShowContextMenu(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const paddingLeft = level * 16;

  return (
    <div className="relative">
      <div
        className={`flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer select-none relative group ${
          selectedId === node.id ? 'bg-primary-50 border-r-2 border-primary-500' : ''
        }`}
        style={{ paddingLeft: paddingLeft + 8 }}
        onClick={handleSelect}
        onContextMenu={handleContextMenu}
      >
        {node.type === 'folder' && (
          <button
            onClick={handleToggle}
            className="flex items-center justify-center w-4 h-4 mr-1 hover:bg-gray-200 rounded"
          >
            {node.isOpen ? (
              <ChevronDown className="w-3 h-3 text-gray-600" />
            ) : (
              <ChevronRight className="w-3 h-3 text-gray-600" />
            )}
          </button>
        )}
        
        {node.type === 'file' && <div className="w-4 h-4 mr-1" />}
        
        <div className="flex items-center mr-2">
          {node.type === 'folder' ? (
            node.isOpen ? (
              <FolderOpen className="w-4 h-4 text-primary-600" />
            ) : (
              <Folder className="w-4 h-4 text-primary-600" />
            )
          ) : (
            <FileIcon fileName={node.name} />
          )}
        </div>
        
        {isRenaming ? (
          <input
            ref={inputRef}
            type="text"
            value={newName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleKeyDown}
            className="flex-1 px-1 py-0.5 text-sm border border-primary-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
        ) : (
          <span className="flex-1 text-sm text-gray-800 truncate">{node.name}</span>
        )}
        
        {!isRenaming && (
          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setShowContextMenu(!showContextMenu);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
          >
            <MoreHorizontal className="w-3 h-3 text-gray-500" />
          </button>
        )}
      </div>
      
      {showContextMenu && (
        <div className="absolute top-full left-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[150px]">
          <button
            onClick={startRename}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Rename
          </button>
          <button
            onClick={() => {
              onDelete(node.id);
              setShowContextMenu(false);
            }}
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
          {node.type === 'folder' && (
            <>
              <hr className="my-1 border-gray-200" />
              <button
                onClick={() => {
                  onAddFile(node.id);
                  setShowContextMenu(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <File className="w-4 h-4 mr-2" />
                New File
              </button>
              <button
                onClick={() => {
                  onAddFolder(node.id);
                  setShowContextMenu(false);
                }}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Folder className="w-4 h-4 mr-2" />
                New Folder
              </button>
            </>
          )}
        </div>
      )}
      
      {node.children && node.isOpen && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedId={selectedId}
              onContextMenu={onContextMenu}
              onRename={onRename}
              onDelete={onDelete}
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileTree: React.FC<FileTreeProps> = ({ fileTree, setFileTree, onFileSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const findNodeById = (nodes: FileNode[], id: string): FileNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateTree = (nodes: FileNode[], id: string, updater: (node: FileNode) => FileNode): FileNode[] => {
    return nodes.map(node => {
      if (node.id === id) {
        return updater(node);
      }
      if (node.children) {
        return {
          ...node,
          children: updateTree(node.children, id, updater)
        };
      }
      return node;
    });
  };

  const removeFromTree = (nodes: FileNode[], id: string): FileNode[] => {
    return nodes.filter(node => {
      if (node.id === id) return false;
      if (node.children) {
        return {
          ...node,
          children: removeFromTree(node.children, id)
        };
      }
      return true;
    }).map(node => {
      if (node.children) {
        return {
          ...node,
          children: removeFromTree(node.children, id)
        };
      }
      return node;
    });
  };

  const handleToggle = (id: string) => {
    setFileTree(prev => updateTree(prev, id, node => ({
      ...node,
      isOpen: !node.isOpen
    })));
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const node = findNodeById(fileTree, id);
    if (node && node.type === 'file') {
      onFileSelect?.(node);
    }
  };

  const handleRename = (id: string, newName: string) => {
    setFileTree(prev => updateTree(prev, id, node => ({
      ...node,
      name: newName
    })));
  };

  const handleDelete = (id: string) => {
    setFileTree(prev => removeFromTree(prev, id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const addToTree = (nodes: FileNode[], parentId: string, newNode: FileNode): FileNode[] => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newNode],
          isOpen: true
        };
      }
      if (node.children) {
        return {
          ...node,
          children: addToTree(node.children, parentId, newNode)
        };
      }
      return node;
    });
  };

  const handleAddFile = (parentId: string) => {
    const newId = Date.now().toString();
    const newFile: FileNode = {
      id: newId,
      name: 'new-file.txt',
      type: 'file',
      content:'',
    };
    
    setFileTree(prev => addToTree(prev, parentId, newFile));
  };

  const handleAddFolder = (parentId: string) => {
    const newId = Date.now().toString();
    const newFolder: FileNode = {
      id: newId,
      name: 'new-folder',
      type: 'folder',
      isOpen: true,
      children: []
    };
    
    setFileTree(prev => addToTree(prev, parentId, newFolder));
  };

  const handleContextMenu = (e: React.MouseEvent, node: FileNode) => {
    // Context menu handling is done in the FileTreeNode component
  };

  return (
    <div className="h-full bg-white border-r border-gray-200 overflow-y-auto">
      <div className="h-10 p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Files</h3>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleAddFile(fileTree[0]?.id)}
              className="p-1 hover:bg-gray-200 rounded"
              title="New File"
            >
              <File className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => handleAddFolder(fileTree[0]?.id)}
              className="p-1 hover:bg-gray-200 rounded"
              title="New Folder"
            >
              <Folder className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="py-2">
        {fileTree.map((node) => (
          <FileTreeNode
            key={node.id}
            node={node}
            onToggle={handleToggle}
            onSelect={handleSelect}
            selectedId={selectedId}
            onContextMenu={handleContextMenu}
            onRename={handleRename}
            onDelete={handleDelete}
            onAddFile={handleAddFile}
            onAddFolder={handleAddFolder}
          />
        ))}
      </div>
    </div>
  );
};
export default FileTree;