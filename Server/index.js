const http = require("http");
const express = require("express");
const cors = require('cors');
const { Server : SocketServer } = require("socket.io");
const pty = require("node-pty");
var os = require('os');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const chokidar = require('chokidar');
const chardet = require('chardet');
const fsExtra = require('fs-extra');

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: path.join(process.env.INIT_CWD || __dirname,'user'),
  env: process.env
});

const app = express();
const server = http.createServer(app);
const io = new SocketServer({
    cors: '*'
})

app.use(cors());

io.attach(server);

chokidar.watch('./user').on('all',(event,path)=>{
  io.emit('file:refresh',path);
  // console.log("files changed in backend");
})

ptyProcess.onData(data =>{
  io.emit("terminal:data",data);
})

io.on("connection",(socket)=>{
    console.log(`Socket connected`, socket.id);
    
    socket.on('file:add', async ({ filePath, isFolder }) => {
      const fullPath = path.resolve('./user', filePath);
      try {
        if (isFolder) {
          await fs.mkdir(fullPath, { recursive: true });
        } else {
          await fs.writeFile(fullPath, '');
        }
      } catch (err) {
        console.error("Failed to add:", err);
      }
    });

    socket.on('file:rename', async ({ oldPath, newPath }) => {
      const from = path.resolve('./user', oldPath);
      const to = path.resolve('./user', newPath);
      try {
        await fs.rename(from, to);
      } catch (err) {
        console.error("Rename error:", err);
      }
    });

    socket.on('file:delete', async ({ filePath }) => {
      const fullPath = path.resolve('./user', filePath);
      try {
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
          await fsExtra.remove(fullPath);
        } else {
          await fs.unlink(fullPath);
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    });

    socket.on('file:change',async ({path,content})=>{
      // console.log("File Changed");
      // console.log(path);
      await fs.writeFile(`./user/${path}`,content);
    })

    socket.on('terminal:write',(data)=>{
      ptyProcess.write(data);
    })
})

app.get('/files',async (req,res)=>{
  const fileTree = await generateFileTree('./user','');
  return res.json(fileTree);
})
app.get("/files/content", async (req, res) => {
  const requestedPath = req.query.path;

  if (!requestedPath) {
    return res.status(400).json({ error: 'Missing "path" query parameter.' });
  }

  // IMPORTANT: prevent directory traversal attack
  const userRoot = path.resolve('./user'); // your root folder
  const safePath = path.resolve(userRoot, requestedPath);

  if (!safePath.startsWith(userRoot)) {
    return res.status(403).json({ error: 'Access denied: outside user directory.' });
  }

  try {
    const encoding = await chardet.detectFile(safePath);

    let content = '';
    if (encoding) {
      const buffer = await fs.readFile(safePath);
      content = buffer.toString(encoding).replace(/^\uFEFF/, '');
    } else {
      content = await fs.readFile(safePath, 'utf-8');
      content = content.replace(/^\uFEFF/, '');
    }

    res.json({ content });

  } catch (error) {
    try {
      const fallback = await fs.readFile(safePath, 'utf-8');
      res.json({ content: fallback.replace(/^\uFEFF/, '') });
    } catch (utf8Error) {
      res.json({ content: `[Binary or unreadable file: ${requestedPath}]` });
    }
  }
});

server.listen(9000, ()=> console.log("🚀 Server running"));

async function generateFileTree(currentDir, parentPath) {
  const files = await fs.readdir(currentDir);
  const tree = [];

  for (const file of files) {
    const filePath = path.join(currentDir, file);
    const stat = await fs.stat(filePath);
    const relativePath = path.join(parentPath, file);

    const node = {
      id: crypto.randomUUID(),
      name: file,
      type: stat.isDirectory() ? 'folder' : 'file',
      path: relativePath.replace(/\\/g, '/'), // Normalize Windows paths
    };

    if (stat.isDirectory()) {
      node.isOpen = true;
      node.children = await generateFileTree(filePath, relativePath); // ✅ fixed here
    }

    tree.push(node);
  }

  return tree;
}
