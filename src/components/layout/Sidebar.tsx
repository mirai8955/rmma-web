import { Link, useLocation } from 'react-router-dom';
import { Home, Users } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      {/* Logo/Title */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">RMMA</h1>
        <p className="text-sm text-gray-400">Marketing Agent</p>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {/* Top */}
        <Link
          to="/top"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/top')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Top</span>
        </Link>

        {/* Agents */}
        <div
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname.startsWith('/agent')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Agents</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 