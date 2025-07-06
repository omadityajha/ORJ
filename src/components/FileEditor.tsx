import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const FileEditor: React.FC = () => {
  const [code, setCode] = useState<string>("<html>\n  <head>\n    <title>Sample</title>\n  </head>\n  <body>\n    <h1>Hello, Monaco Editor!</h1>\n  </body>\n</html>");

  return (
    <div className="h-full p-4">
      <Editor
        height="100%"
        defaultLanguage="html"
        value={code}
        onChange={(value) => setCode(value || '')}
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
  );
};

export default FileEditor;