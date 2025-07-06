const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-full p-6 flex flex-col gap-4">
      <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Create Room</button>
      <button className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700">Join Room</button>
      <nav className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Rooms</h3>
        <ul className="space-y-2">
          {[1,2,3].map(id => (
            <li key={id}>
              <a href={`#/room/${id}`} className="block px-3 py-2 rounded hover:bg-gray-200">Room {id}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;