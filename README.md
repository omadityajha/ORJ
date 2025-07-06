# ORJ - Real-Time Collaborative Web App

A powerful real-time collaborative web application built with **React**, **TypeScript**, and **TailwindCSS**. ORJ enables multiple users to work together simultaneously with features like real-time editing, canvas drawing, and live previews — all inside dedicated project rooms.

---

## ✨ Features

- 🔄 **Real-Time Editing**  
  Collaborate with team members with instant updates

- 🎨 **Shared Canvas**  
  Draw, sketch, and visualize ideas together on a canvas

- 👁️ **Live Preview**  
  Instantly see changes made by any team member

- 🏠 **Room System**  
  Create and join rooms to organize work by project or team

- 🔒 **User Authentication**  
  Secure login system to protect your data and sessions

- 📱 **Responsive Design**  
  Fully optimized for desktop and mobile devices

---

## 🛠️ Tech Stack

- ⚛️ [React](https://reactjs.org/)  
- 🟦 [TypeScript](https://www.typescriptlang.org/)  
- ⚡ [Vite](https://vitejs.dev/)  
- 🎨 [TailwindCSS](https://tailwindcss.com/)  
- 🧭 [React Router](https://reactrouter.com/)  
- 🧠 Context API & Custom Hooks

---

## 📁 Folder Structure

```
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Reusable UI components
├── context/        # React context for global state
├── hooks/          # Custom React hooks
├── layouts/        # Layout components (e.g., MainLayout)
├── pages/          # Route pages
│   ├── Dashboard/  # Dashboard view
│   ├── Login/      # Authentication page
│   └── Room/       # Collaborative workspace
├── routes/         # App routing configuration
├── styles/         # Tailwind customizations and global styles
├── App.tsx         # Root component
└── main.tsx        # App entry point
```

---

## 🚀 Setup Instructions

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) `v9+`

---

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/orj.git
   cd orj
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**  
   Visit [http://localhost:5173](http://localhost:5173)

---

### 📦 Building for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

---

## 🤝 Contribution Guidelines

We welcome contributions from all collaborators! Please follow these steps:

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Use TypeScript for type safety
   - Follow consistent formatting (based on Prettier & ESLint)
   - Write meaningful commit messages

3. **Lint your code**
   ```bash
   npm run lint
   ```

4. **Submit a pull request**
   - Provide a clear summary of your changes
   - Link any related issues or discussions
   - Be open to code review feedback!

---


## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

---

> Made with ❤️ by the **ORJ Team**
