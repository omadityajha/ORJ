import React, { createContext, useContext, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';

// Type the context as Socket or null
const SocketContext = createContext<Socket | null>(null);

// Custom hook to use socket
export const useSocket = (): Socket => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};

// SocketProvider component
export function SocketProvider({ children }: React.PropsWithChildren) {
  const socket = useMemo(() => io('http://localhost:9000'), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
