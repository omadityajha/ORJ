import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import './index.css' // or your central CSS
import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/Login/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Room = lazy(() => import('./pages/Room/Room'))

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="room" element={<Room />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
