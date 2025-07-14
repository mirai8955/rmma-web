import { Bot, Cog, Search } from 'lucide-react';

interface AgentCardProps {
  agentName: string;
}

// A simple function to pick an icon based on the agent name
const getAgentIcon = (agentName: string) => {
  const lowerCaseName = agentName.toLowerCase();
  if (lowerCaseName.includes('search')) {
    return <Search className="w-8 h-8 text-blue-500" />;
  }
  if (lowerCaseName.includes('post')) {
    return <Bot className="w-8 h-8 text-green-500" />;
  }
  if (lowerCaseName.includes('generation')) {
      return <Bot className="w-8 h-8 text-purple-500" />;
  }
  return <Cog className="w-8 h-8 text-gray-500" />;
};

const AgentCard = ({ agentName }: AgentCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {getAgentIcon(agentName)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {agentName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Agent Description Placeholder
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors">
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard; 