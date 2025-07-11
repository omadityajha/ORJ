import { Terminal as Xterminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { useEffect, useRef } from 'react';
import '@xterm/xterm/css/xterm.css';
import { useSocket } from '../context/SocketProvider';

interface TerminalProps {
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ className }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Xterminal | null>(null); // <== persist terminal
  const fitAddonRef = useRef<FitAddon | null>(null);
  const socket = useSocket();

  useEffect(() => {
    if (terminalRef.current && !termRef.current) {
      const term = new Xterminal();
      const fitAddon = new FitAddon();

      termRef.current = term;
      fitAddonRef.current = fitAddon;

      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();

      term.onData(data => {
        socket.emit('terminal:write', data);
      });

      socket.on('terminal:data', data => {
        term.write(data);
      });
    }

    // Fit terminal on resize
    const handleResize = () => {
      fitAddonRef.current?.fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [socket]);

  return (
    <div className={`${className} h-full w-full`}>
      <span className="bg-gray-900 px-10">Terminal</span>
      <div ref={terminalRef} className="h-[90%] w-full" id="terminal" />
    </div>
  );
};

export default Terminal;
