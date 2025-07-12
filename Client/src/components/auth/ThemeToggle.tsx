import React from 'react';

const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <button
    className={`rounded-full p-2 bg-gray-800 hover:bg-gray-700 shadow transition-colors ${className}`}
    title="Toggle theme"
    // TODO: Implement theme switching logic
  >
    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  </button>
);

export default ThemeToggle; 