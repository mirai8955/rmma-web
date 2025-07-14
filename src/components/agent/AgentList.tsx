import AgentCard from './AgentCard';

interface AgentListProps {
  agents: string[];
}

const AgentList = ({ agents }: AgentListProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
        Available Agents
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <AgentCard key={index} agentName={agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentList; 