import { useUser } from '../context/UserContext';

const Header = () => {
  const { logout } = useUser();
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <img src="https://i.pravatar.cc/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
      </div>
    </header>
  );
};
export default Header;