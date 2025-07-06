import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useRoom } from '../../context/RoomContext';
import React from 'react';

const FileEditor = () => <div>File Editor Placeholder</div>;
const CanvasBoard = () => <div>Canvas Board Placeholder</div>;
const LivePreview = () => <div>Live Preview Placeholder</div>;

const Room = () => {
  const { roomId } = useParams();
  const { logout } = useUser();
  const { joinRoom } = useRoom();
  const [activeTab, setActiveTab] = useState<'files' | 'canvas' | 'preview'>('files');

  // Join room on mount
  React.useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
    }
  }, [roomId, joinRoom]);

  return (
    <div className="flex h-screen">
      <aside className="w-20 bg-gray-100 flex flex-col items-center py-4 space-y-4">
        <button onClick={() => setActiveTab('files')} className={activeTab === 'files' ? 'active' : ''}>Files</button>
        <button onClick={() => setActiveTab('canvas')} className={activeTab === 'canvas' ? 'active' : ''}>Canvas</button>
        <button onClick={() => setActiveTab('preview')} className={activeTab === 'preview' ? 'active' : ''}>Preview</button>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white shadow">
          <h1 className="text-xl font-bold">Room: {roomId}</h1>
          <button onClick={logout} className="btn-logout">Logout</button>
        </header>
        <section className="flex-1 p-4 overflow-auto">
          {activeTab === 'files' && <FileEditor />}
          {activeTab === 'canvas' && <CanvasBoard />}
          {activeTab === 'preview' && <LivePreview />}
        </section>
      </main>
    </div>
  );
};

export default Room;