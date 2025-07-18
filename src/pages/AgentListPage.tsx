import { useEffect, useState } from 'react';
import { fetchAgents } from '../api/agentApi';
import AgentList from '../components/agent/AgentList';

const AgentListPage = () => {
  const [agents, setAgents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        setIsLoading(true);
        const agentData = await fetchAgents();
        setAgents(agentData);
        setError(null);
      } catch (err) {
        setError('Failed to load agents. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAgents();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="container mx-auto">
        <AgentList agents={agents} />
      </div>
    </div>
  );
};

export default AgentListPage; 