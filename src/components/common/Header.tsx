import React from 'react';
import { ArrowLeft, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showNotification?: boolean;
  showSettings?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showNotification = true,
  showSettings = true,
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
        )}
        {title && <h1 className="text-lg font-bold text-gray-900">{title}</h1>}
      </div>

      <div className="flex items-center gap-2">
        {showNotification && (
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell size={22} className="text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}
        {showSettings && (
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings size={22} className="text-gray-700" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
