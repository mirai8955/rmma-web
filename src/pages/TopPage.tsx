import { Link } from 'react-router-dom';

const TopPage = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to RMMA
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Rakuten Mobile Marketing Agent
          </h2>
          <p className="text-gray-600 leading-relaxed">
            RMMA is an agent system that supports marketing activities for Rakuten Mobile.
            Through various agents, we support efficient marketing strategy planning and execution.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/agent/lists" className="block">
              <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                <h3 className="font-semibold text-blue-800 mb-2">Agent Management</h3>
                <p className="text-blue-600 text-sm">
                  Configuration and management of various marketing agents
                </p>
              </div>
            </Link>
            <Link to="/rmma" className="block">
              <div className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                <h3 className="font-semibold text-green-800 mb-2">Execution</h3>
                <p className="text-green-600 text-sm">
                  Execute marketing strategies and campaigns
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPage; 