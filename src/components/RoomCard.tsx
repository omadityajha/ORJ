import { Link } from "react-router-dom";

interface RoomCardProps {
  id: number;
  name: string;
  users: number;
}
const RoomCard = ({ id, name, users }: RoomCardProps) => (
  <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
    <div className="font-semibold text-lg">{name}</div>
    <div className="text-sm text-gray-500">Users: {users}</div>
    <Link to={`./room/${id}`} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-center">Enter Room</Link>
  </div>
);
export default RoomCard;