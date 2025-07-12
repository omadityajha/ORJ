import React, { useState } from 'react';
import Sidebar from '@components/Sidebar';
import RoomCard from '@components/RoomCard';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRoom } from '@context/RoomContext';

const dummyRooms = [
  { id: 1, name: 'Frontend Devs', users: 5 },
  { id: 2, name: 'Backend Wizards', users: 3 },
  { id: 3, name: 'UI/UX Team', users: 7 },
];

const DashboardHeader: React.FC<{
  onCreateRoom: () => void;
  onJoinRoom: () => void;
  onSidebarToggle: () => void;
  showSidebarToggle: boolean;
}> = ({ onCreateRoom, onJoinRoom, onSidebarToggle, showSidebarToggle }) => (
  <div className="flex items-center justify-between gap-4 px-4 pt-6 md:px-8 animate-fade-in w-full">
    <div className="flex items-center gap-2">
      {showSidebarToggle && (
        <button
          className="inline-flex items-center justify-center p-2 rounded-lg bg-indigo-900 text-white hover:bg-indigo-700 transition shadow-lg focus:outline-none"
          onClick={onSidebarToggle}
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight drop-shadow">
        Welcome to Your Dashboard
      </h1>
    </div>
    <div className="flex gap-2">
      <button
        className="bg-indigo-600 px-5 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 hover:shadow-xl transition-all duration-200"
        onClick={onCreateRoom}
      >
        + Create Room
      </button>
      <button
        className="bg-purple-600 px-5 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 hover:shadow-xl transition-all duration-200"
        onClick={onJoinRoom}
      >
        Join Room
      </button>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { joinRoom } = useRoom();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    joinRoom(newRoomId);
    navigate(`/room/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    alert('Join Room feature coming soon!');
  };

  return (
    <div className="min-h-screen h-screen w-screen overflow-hidden flex flex-col bg-gradient-to-br from-[#6a8dff]/60 via-[#b67cff]/60 to-[#f7f8fa]/60 font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed z-40 top-0 left-0 h-full w-72 transform transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-full scale-95 opacity-0'
        } bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-2xl rounded-r-2xl`}
        aria-label="Sidebar"
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      <main className="flex-1 flex flex-col w-full h-full">
        <DashboardHeader
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
          onSidebarToggle={() => setSidebarOpen((open) => !open)}
          showSidebarToggle={true}
        />
        <div className="flex-1 flex flex-col justify-center w-full h-full px-6 sm:px-10 lg:px-16 pb-8">
        <section className="flex flex-wrap gap-10 items-start justify-start sm:justify-center w-full h-full">
        {dummyRooms.map((room, idx) => (
              <div
                key={room.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 flex flex-col gap-4 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 animate-fade-in group cursor-pointer"
              >
                <RoomCard {...room} index={idx} />
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
