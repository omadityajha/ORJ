import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-gray-950 via-blue-900 to-primary-950 transition-all duration-300">
      {/* Left: Illustration/Branding */}
      <div className="hidden md:flex flex-col justify-center items-center md:w-1/2 p-12 bg-gradient-to-br from-primary-900/80 to-blue-800/80 rounded-br-3xl shadow-inner animate-fade-in">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center shadow-lg mb-4">
            {/* Logo/Icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#0ea5e9" /><text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold" dy=".3em">O</text></svg>
          </div>
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">Welcome Back!</h2>
          <p className="text-lg text-blue-100 text-center max-w-xs font-medium">"Collaboration is the key to innovation. Create, code, and draw together in real time."</p>
          <p className="text-base text-blue-200 text-center max-w-xs italic mt-4">Empowering teams to build, brainstorm, and launch ideas — together.</p>
        </div>
      </div>
      {/* Right: Login Form and children */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-gray-950/80 animate-fade-in">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout; 