import { lazy } from 'react'

// Lazy load pages
const Login = lazy(() => import('../pages/Login/Login'))
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))
const Room = lazy(() => import('../pages/Room/Room'))

// Route configuration
const routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
    protected: false,
  },
  {
    path: '/',
    component: Dashboard,
    exact: true,
    protected: true,
  },
  {
    path: '/room',
    component: Room,
    exact: true,
    protected: true,
  },
]

export default routes