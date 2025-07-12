import React from 'react';

const FooterLinks: React.FC<{ className?: string }> = ({ className = '' }) => (
  <footer className={`flex flex-wrap justify-center gap-4 text-xs text-gray-500 mt-8 ${className}`}>
    <a href="#" className="hover:underline">Privacy Policy</a>
    <span>|</span>
    <a href="#" className="hover:underline">Terms of Service</a>
    <span>|</span>
    <a href="#" className="hover:underline">Help</a>
  </footer>
);

export default FooterLinks; 