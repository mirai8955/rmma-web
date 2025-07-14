import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAgentDetail } from '../api/agentApi';
import { ArrowLeft, Bot, Cog, Wrench } from 'lucide-react';

interface AgentDetail {
  name: string;
  description: string;
  instruction: string;
  model: string;
  output_key: string;
  sub_agents: string[];
  tools: string[];
}

const AgentDetailPage = () => {
  const { agentName } = useParams<{ agentName: string }>();
  const [agentDetail, setAgentDetail] = useState<AgentDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAgentDetail = async () => {
      if (!agentName) {
        setError('Agent name not provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const detail = await fetchAgentDetail(agentName);
        setAgentDetail(detail);
        setError(null);
      } catch (err) {
        setError('Failed to load agent details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAgentDetail();
  }, [agentName]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center h-64 text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center h-64 text-xl text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!agentDetail) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center h-64 text-xl">Agent not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <Link 
          to="/agent/lists" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Agent List
        </Link>

        {/* Agent Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Bot className="w-12 h-12 text-blue-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {agentDetail.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Model: {agentDetail.model}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Description */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {agentDetail.description}
            </p>
          </div>
        </div>

        {/* Agent Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Instructions
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <pre className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                {agentDetail.instruction}
              </pre>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Wrench className="w-5 h-5 mr-2" />
              Available Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {agentDetail.tools.map((tool, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Cog className="w-4 h-4 text-gray-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Technical Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-400">Output Key:</span>
                <span className="font-mono text-sm text-gray-900 dark:text-white">
                  {agentDetail.output_key}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-400">Sub Agents:</span>
                <span className="text-gray-900 dark:text-white">
                  {agentDetail.sub_agents.length > 0 ? agentDetail.sub_agents.join(', ') : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage; 