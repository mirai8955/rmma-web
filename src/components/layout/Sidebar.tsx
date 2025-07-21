import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Zap, MessageCircle, X, Menu, FileText } from 'lucide-react'; // FileTextを追加

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`bg-gray-900 text-white min-h-screen p-4 transition-all duration-300 ${
      isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
    }`}>
      {/* Logo/Title & Toggle Button */}
      <div className={`flex items-center justify-between mb-8 ${
        isSidebarOpen ? '' : 'hidden'
      }`}>
        <div>
          <h1 className="text-xl font-bold text-white">RMMA</h1>
          <p className="text-sm text-gray-400">Marketing Agent</p>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Collapsed Sidebar Toggle Button (when sidebar is closed) */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 text-gray-400 fixed top-4 left-4 z-50"
          title="Open Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Navigation Menu */}
      <nav className={`${isSidebarOpen ? '' : 'hidden'} space-y-2`}>
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

        {/* Agents List */}
        <Link
          to="/agent/lists"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/agent/lists')
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

        {/* Documents */}
        <Link
          to="/documents/lists"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/documents/lists')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Documents</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar; 