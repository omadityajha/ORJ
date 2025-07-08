# 📁 RealTime Collaborative App ( Code-Editor + Canvas + Preview )

This project is a **real-time collaborative platform** where multiple users can work inside a shared "room" (folder), each editing different files (code editors or canvas) with live synchronization, user presence, and role-based access.

---

## 🚀 Features

* 📂 Folder-based workspace (room = folder)
* 🧑‍💻 Monaco-based code editor with multiple files
* 🎨 Fabric.js-based whiteboard with color tools
* 📡 Real-time collaboration via Yjs + Socket.IO
* 👤 Live presence & cursor sharing (Awareness API)
* 🔐 JWT-based authentication (Leader / Member roles)
* 🗃️ File + folder save/load system using MongoDB
* 📥 Download full folder as ZIP
* 🖥️ Electron-ready for future desktop version

---

## 🧱 Tech Stack

### Frontend

* React + TypeScript
* Monaco Editor (VS Code experience)
* Fabric.js (Canvas Drawing)
* Socket.IO-client
* Yjs (for CRDT-based syncing + awareness)

### Backend

* Node.js + Express
* Socket.IO
* JWT Auth
* MongoDB + GridFS (file tree, folders, file content)

---

## 🧠 Architecture Overview

```
🧑‍💻 User (Browser or Electron)
     │
 ┌───┴─────────────┐
 ▼                 ▼
Monaco Editor   Fabric Canvas
     │                 │
     └──── Yjs Document (Shared) ───┘
               │
         Socket.IO (Custom Yjs Provider)
               │
      ┌────────┴────────┐
      ▼                 ▼
  Yjs CRDT Engine   Awareness State
               │
      ┌────────┴────────┐
      ▼                 ▼
 MongoDB (files,     JWT Auth (roles,
 folders, tree)      access control)
```

---

## 📁 Folder & File Model (MongoDB)

```js
{
  _id: ObjectId,
  roomId: 'team123',
  type: 'file' | 'folder',
  name: 'main.tsx',
  parent: 'src/',
  content: '...code or base64...',
  createdBy: 'userId123'
}
```

---

## 🛠️ Setup & Run

### 1️⃣ Clone the Project

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

### 3️⃣ Start Development Servers

```bash
# Backend
cd server
node index.js

# Frontend
cd ../client
npm start
```

App runs at `http://localhost:3000`.

---

## 🔧 Development Phases

| Phase | Focus                          |
| ----- | ------------------------------ |
| 1️⃣   | Monaco + file tree UI          |
| 2️⃣   | Fabric + canvas tools          |
| 3️⃣   | Socket.IO + Yjs syncing        |
| 4️⃣   | Awareness & multi-user editing |
| 5️⃣   | JWT auth, room roles           |
| 6️⃣   | MongoDB persistence + GridFS   |
| 7️⃣   | Download folder as ZIP         |
| 8️⃣   | Optional: Electron version     |

---

## 🤝 Contributing

Suggestions, bug reports, and contributions are welcome! Fork it, PR it, or raise an issue.

---

## 📄 License

MIT © 2025 Team - TechSena
