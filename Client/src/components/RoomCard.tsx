import { Link } from "react-router-dom";

interface RoomCardProps {
  id: number;
  name: string;
  users: number;
  index?: number;
}
const RoomCard = ({ id, name, users, index = 0 }: RoomCardProps) => (
  <div
    className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-6 flex flex-col gap-3 border border-white/10 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <div className="font-semibold text-lg text-white drop-shadow-sm">{name}</div>
    <div className="text-sm text-gray-200">Users: {users}</div>
    <Link
      to={`./room/${id}`}
      className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center font-medium transition"
    >
      Enter Room
    </Link>
  </div>
);
export default RoomCard;