import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Zap, MessageCircle } from 'lucide-react';

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

        {/* RMMA Execution */}
        <Link
          to="/rmma"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/rmma')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <Zap className="w-5 h-5" />
          <span>RMMA</span>
        </Link>

        {/* Agents */}
        <Link
          to="/agent/lists"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/agent/list')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Agents List</span>
        </Link>

        {/* Agent Chat */}
        <Link
          to="/agent/chat"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/agent/chat')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Agent Chat</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar; 