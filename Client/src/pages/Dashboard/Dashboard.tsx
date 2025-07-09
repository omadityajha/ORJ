import React from 'react';
import Sidebar from '@components/Sidebar';
import Header from '@components/Header';
import RoomCard from '@components/RoomCard';
import { useNavigate } from 'react-router-dom';
import { useRoom } from '@context/RoomContext';

const dummyRooms = [
  { id: 1, name: 'Frontend Devs', users: 5 },
  { id: 2, name: 'Backend Wizards', users: 3 },
  { id: 3, name: 'UI/UX Team', users: 7 },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { joinRoom } = useRoom();

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    joinRoom(newRoomId);
    navigate(`/room/${newRoomId}`);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background-dark via-gray-900 to-gray-800 grid grid-cols-1 lg:grid-cols-5 grid-rows-6">
      {/* Sidebar: vertical on lg, horizontal bar on mobile */}
      <aside className="lg:col-span-1 row-span-1 lg:row-span-6 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:h-20 max-lg:z-20 max-lg:flex max-lg:items-center max-lg:justify-between max-lg:bg-background-dark max-lg:shadow-xl">
        <Sidebar />
      </aside>
      {/* Main content area */}
      <main className="lg:col-span-4 row-span-5 flex flex-col min-h-0 max-lg:mt-20">
        <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-2 sm:px-4 py-6">
          {/* Header fixed within main content */}
          <Header />
          {/* Dashboard card wrapper */}
          <div className="w-full mt-6 rounded-xl bg-white/10 backdrop-blur shadow-xl animate-fade-in p-6 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold text-text-primary tracking-tight drop-shadow">Dashboard</h1>
              <button
                className="btn btn-primary px-6 py-2 rounded-lg text-white font-semibold shadow hover:bg-primary-700 transition"
                onClick={handleCreateRoom}
              >
                + Create Room
              </button>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyRooms.map((room, idx) => (
                <RoomCard key={room.id} {...room} index={idx} />
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;