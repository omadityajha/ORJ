# 📁 RealTime Collaborative App (Code Editor + Canvas + Terminal + Live Preview)

A **real-time collaborative platform** for developers and teams to work together inside shared rooms (folder-based workspaces). Includes live file editing, a whiteboard (Excalidraw), terminal execution, and preview – all synced live via CRDTs.

---

## 🚀 Features

✅ **Folder-based workspaces**
🦰 **Monaco Editor** for code with language support
🎨 **Excalidraw Whiteboard** for sketching ideas
📱 **Real-time collaboration** using Yjs + Socket.IO
👭 **Live presence & cursor sharing**
🔐 **JWT-based authentication** with role control
🔦 **Terminal Integration** (run files based on extension)
📅 **Persistent folder/file structure using local FS**
📊 **Live FS sync with chokidar**
🌟 **Electron-compatible**

---

## 🧱 Tech Stack

### Frontend

* React + TypeScript
* TailwindCSS
* Monaco Editor
* Excalidraw (Canvas whiteboard)
* Yjs (with Awareness API)
* Socket.IO-client

### Backend

* Node.js + Express
* Socket.IO
* node-pty (cross-platform terminal support)
* chokidar (FS watching)
* chardet (encoding detection)
* MongoDB (file tree persistence - planned)

---

## ⚙️ How It Works

```
🧑 User (Browser)
   │
 └️️️️️️️️️️️️️️┐
 ▼              ▼
Monaco        Excalidraw
Editor        Canvas
   │              │
   └️Yjs CRDT Doc┘
         │
     Awareness + Sync
         │
    Socket.IO Provider
         │
 └️️️️️️️️️️️️️️┐
 ▼                ▼
File System    Terminal (pty)
     │               │
     ▼               ▼
Backend FS     Real Shell Process
```

---

## 💻 Folder & File Schema (MongoDB - planned)

```ts
{
  _id: ObjectId,
  roomId: 'team123',
  name: 'index.js',
  type: 'file' | 'folder',
  parent: 'src/',
  content: '...code...',
  createdBy: 'userId123'
}
```

---

## 📂 Folder Tree from Backend (`GET /files`)

* Dynamically generated from the `./user` folder
* Files/folders emit live updates via `chokidar`
* Synced with frontend automatically

---

## 💡 Run File via Terminal

A run button is available per file. When clicked, a mapped command is executed via `node-pty`.

### Supported Extensions & Commands:

| Extension | Command                            |
| --------- | ---------------------------------- |
| `.js`     | `node file.js`                     |
| `.ts`     | `ts-node file.ts`                  |
| `.py`     | `python file.py`                   |
| `.sh`     | `bash script.sh`                   |
| `.c`      | `gcc file.c -o out && ./out`       |
| `.cpp`    | `g++ file.cpp -o out && ./out`     |
| `.java`   | `javac file.java && java FileName` |
| `.go`     | `go run file.go`                   |
| `.rb`     | `ruby file.rb`                     |
| `.php`    | `php file.php`                     |
| `.rs`     | `rustc file.rs && ./file`          |

---

## 🔌 node-pty Installation

### 🛠️ Windows

```bash
npm install --save node-pty
```

Ensure:

```bash
npm install --global windows-build-tools
```

### 🐙 Linux / 📕 macOS

```bash
sudo apt install -y make g++ python3
npm install --save node-pty
```

> Node.js 20+ required
> On Linux/macOS, ensure `make`, `g++`, and `python3` are available

---

## 💦 Setup & Run

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/omadityajha/ORJ.git
cd ORJ
```

### 2️⃣ Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3️⃣ Start the Development Servers

```bash
# Backend
cd server
node index.js

# Frontend
cd ../client
npm run dev  # or npm start
```

Visit: `http://localhost:3000`

---

## ⚠️ In Progress

* ❌ **Download as ZIP** (Not yet added)
* ✅ **Excalidraw canvas replacing Fabric.js**
* ✅ Folder-specific file creation, terminal execution
* ✅ Fixes for new-file behavior and folder toggling

---

## 🤝 Contributing

All feedback, issues, and PRs are welcome!
Fork the repo, make your change, and submit a pull request.

---

## 📄 License

MIT © 2025 – Team TechSena
