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
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto">
          {dummyRooms.map(room => (
            <RoomCard key={room.id} {...room} />
          ))}
        </section>
      </main>
    </div>
  );
};
export default Dashboard;