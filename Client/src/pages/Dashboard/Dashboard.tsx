import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import RoomCard from '../../components/RoomCard';
import { useNavigate } from 'react-router-dom';
import { useRoom } from '../../context/RoomContext';

const dummyRooms = [
  { id: 1, name: 'Frontend Devs', users: 5 },
  { id: 2, name: 'Backend Wizards', users: 3 },
  { id: 3, name: 'UI/UX Team', users: 7 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { joinRoom } = useRoom();

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    joinRoom(newRoomId);
    navigate(`/room/${newRoomId}`);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen">
        <Header />
        <div className="w-full max-w-6xl px-4 py-8 flex flex-col items-center">
          <div className="w-full rounded-2xl bg-white/10 backdrop-blur-md shadow-xl p-8 mt-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-8 tracking-tight drop-shadow">Dashboard</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyRooms.map((room) => (
                <RoomCard key={room.id} {...room}/>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;