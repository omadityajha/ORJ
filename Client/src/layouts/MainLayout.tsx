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
      {/* Header */}
      <header className="bg-gray-900 shadow-lg rounded-b-2xl w-full">
        <div className="px-4 sm:px-6 lg:px-8 w-full">
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

      {/* Main content */}
      <main className="flex-grow w-full">
        <div className="px-4 sm:px-6 lg:px-10 py-4 w-full">
          {user && (
            <div className="mb-4 text-sm text-gray-400">
              Logged in as: {user.email}
            </div>
          )}
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 rounded-t-2xl shadow-lg w-full">
        <div className="px-4 py-6 sm:px-6 lg:px-10 w-full">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
