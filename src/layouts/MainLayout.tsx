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
    <div className="min-h-screen flex flex-col min-w-[100vw]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">App Logo</span>
            </div>
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/room" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Room
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-400 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
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
            <div className="mb-4 text-sm text-gray-600">
              Logged in as: {user.email}
            </div>
          )}
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-white">
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