import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import './index.css' // or your central CSS
import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'
import { RoomProvider } from './context/RoomContext'
import { FileTreeProvider } from './context/FileTreeContext'

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/Login/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Room = lazy(() => import('./pages/Room/Room'))
const Signup = lazy(() => import('./pages/Signup/Signup'))

function App() {
  return (
    <RoomProvider>
    <UserProvider>
    <FileTreeProvider>
      <BrowserRouter>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="room/:roomId" element={<Room />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
      </BrowserRouter>
    </FileTreeProvider>
    </UserProvider>
    </RoomProvider>
  );
}

export default App;
