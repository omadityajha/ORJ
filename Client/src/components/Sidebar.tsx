import { Link } from "react-router-dom";
import { X } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/40?img=1', online: true },
  { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/40?img=2', online: true },
  { id: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/40?img=3', online: false },
];

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <aside className="w-72 bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-800 h-full p-6 flex flex-col gap-6 shadow-2xl rounded-r-2xl relative text-sm text-white transition-colors duration-500 overflow-y-auto">
      
      {/* Close Button */}
      {onClose && (
        <button
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-indigo-800 hover:bg-indigo-700 text-white shadow-lg transition"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-8">
        <button className="btn btn-primary w-full">+ Create Room</button>
        <button className="btn btn-secondary w-full">Join Room</button>
      </div>

      {/* Rooms List */}
      <nav className="mt-4">
        <h3 className="text-indigo-100 font-semibold mb-2 tracking-wide">Your Rooms</h3>
        <ul className="space-y-2">
          {[1, 2, 3].map(id => (
            <li key={id}>
              <Link
                to={`/room/${id}`}
                className="block px-3 py-2 rounded-lg bg-white/5 hover:bg-indigo-700/30 transition duration-200"
              >
                Room {id}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Online Users */}
      <div className="mt-6">
        <h3 className="text-indigo-100 font-semibold mb-2 tracking-wide">Online Users</h3>
        <ul className="space-y-3">
          {mockUsers.map(user => (
            <li key={user.id} className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-indigo-700"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-indigo-900 ${
                    user.online ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
              </div>
              <span className="text-indigo-100 font-medium truncate">{user.name}</span>
              {user.id === 1 && (
                <span className="ml-auto px-2 py-0.5 text-xs rounded bg-primary-700 text-white">
                  Owner
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
