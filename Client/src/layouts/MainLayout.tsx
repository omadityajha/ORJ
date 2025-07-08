import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const MainLayout = () => {
  const { logout, user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <header className="bg-gray-900 shadow-lg rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-400">App Logo</span>
            </div>
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-300 hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition">
                Dashboard
              </Link>
              <Link to="/room/2" className="text-gray-300 hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition">
                Room
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-400 hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {user && (
            <div className="mb-4 text-sm text-gray-400">
              Logged in as: {user.email}
            </div>
          )}
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-gray-900 rounded-t-2xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;