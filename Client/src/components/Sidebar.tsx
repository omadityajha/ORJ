import { Link } from "react-router-dom";

const mockUsers = [
  { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/40?img=1', online: true },
  { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/40?img=2', online: true },
  { id: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/40?img=3', online: false },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 h-full p-6 flex flex-col gap-4 shadow-lg rounded-r-2xl">
      <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Create Room</button>
      <button className="w-full py-2 px-4 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition">Join Room</button>
      <nav className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-200">Rooms</h3>
        <ul className="space-y-2">
          {[1,2,3].map(id => (
            <li key={id}>
              <Link to={`/room/${id}`} className="block px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 transition">Room {id}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-200">Online Users</h3>
        <ul className="space-y-3">
          {mockUsers.map(user => (
            <li key={user.id} className="flex items-center gap-3">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-gray-700" />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${user.online ? 'bg-green-500' : 'bg-gray-500'}`}></span>
              </div>
              <span className="text-gray-300 text-sm">{user.name}</span>
              {user.id === 1 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded bg-primary-700 text-white">Owner</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
export default Sidebar;