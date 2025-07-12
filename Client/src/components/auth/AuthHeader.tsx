import React from 'react';

const AuthHeader: React.FC = () => (
  <div className="flex flex-col items-center gap-2 animate-fade-in">
    <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center shadow-lg">
      {/* Logo/Icon */}
      <svg width="32" height="32" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#0ea5e9" /><text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" dy=".3em">O</text></svg>
    </div>
    <h1 className="text-3xl font-bold text-white">Sign in to your account</h1>
    <p className="text-gray-400 text-base text-center">Please enter your details to sign in and start collaborating.</p>
  </div>
);

export default AuthHeader; 