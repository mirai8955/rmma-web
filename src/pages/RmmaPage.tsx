import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  ConnectionLineType,
  type OnConnect,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Play,
  Square,
  MessageCircle,
  Workflow,
  Settings,
  Brain,
  Users,
  Target,
  Sparkles,
} from 'lucide-react';

// --- Types for custom node data ---
interface CustomNodeData {
  label: string;
  description: string;
  icon: React.ReactNode;
  colors: {
    bg: string;
    border: string;
    icon: string;
    text: string;
  };
  isExecuting: boolean;
}

// --- Custom Node Component ---
const CustomNode: React.FC<{ data: CustomNodeData }> = ({ data }) => (
  <div
    className={`relative bg-gradient-to-br ${data.colors.bg} border-2 ${data.colors.border} rounded-xl p-4 w-36 text-center shadow-lg backdrop-blur-sm ${
      data.isExecuting ? 'ring-2 ring-green-400' : ''
    }`}
  >
    <div
      className={`flex items-center justify-center w-10 h-10 mx-auto mb-3 ${data.colors.icon} bg-white/80 rounded-lg shadow-sm`}
    >
      {data.icon}
    </div>
    <div className={`text-sm font-semibold ${data.colors.text} mb-1`}>{data.label}</div>
    <div className={`text-xs ${data.colors.text} opacity-70`}>{data.description}</div>
    {data.isExecuting && (
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
    )}
  </div>
);

const nodeTypes = { custom: CustomNode };

// --- Initial Nodes & Edges ---
const initialNodes = [
  {
    id: 'start',
    type: 'custom',
    position: { x: 40, y: 60 },
    data: {
      label: 'Start',
      description: 'Input Prompt',
      icon: <MessageCircle className="w-6 h-6" />,      
      colors: {
        bg: 'from-emerald-50 to-emerald-100',
        border: 'border-emerald-300',
        icon: 'text-emerald-600',
        text: 'text-emerald-800',
      },
      isExecuting: false,
    },
  },
  {
    id: 'rmma',
    type: 'custom',
    position: { x: 240, y: 60 },
    data: {
      label: 'RMMA Agent',
      description: 'Main Processing',
      icon: <Brain className="w-6 h-6" />,        
      colors: {
        bg: 'from-blue-50 to-blue-100',
        border: 'border-blue-300',
        icon: 'text-blue-600',
        text: 'text-blue-800',
      },
      isExecuting: false,
    },
  },
  {
    id: 'sub-agents',
    type: 'custom',
    position: { x: 280, y: 180 },
    data: {
      label: 'Sub Agents',
      description: 'Analysis & Task',
      icon: <Users className="w-6 h-6" />,      
      colors: {
        bg: 'from-purple-50 to-purple-100',
        border: 'border-purple-300',
        icon: 'text-purple-600',
        text: 'text-purple-800',
      },
      isExecuting: false,
    },
  },
  {
    id: 'output',
    type: 'custom',
    position: { x: 480, y: 60 },
    data: {
      label: 'Output',
      description: 'Result',
      icon: <Target className="w-6 h-6" />,      
      colors: {
        bg: 'from-orange-50 to-orange-100',
        border: 'border-orange-300',
        icon: 'text-orange-600',
        text: 'text-orange-800',
      },
      isExecuting: false,
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: 'start', target: 'rmma', type: 'smoothstep', animated: false },
  { id: 'e2-3', source: 'rmma', target: 'sub-agents', type: 'smoothstep', animated: false },
  { id: 'e2-4', source: 'rmma', target: 'output', type: 'smoothstep', animated: false },
  { id: 'e3-4', source: 'sub-agents', target: 'output', type: 'smoothstep', animated: false },
];

const RmmaPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleExecute = async () => {
    if (!prompt.trim()) return;
    setIsExecuting(true);
    setShowResult(false);

    setNodes((nds) =>
      nds.map((n) => ({ ...n, data: { ...n.data, isExecuting: n.id === 'rmma' } })),
    );

    try {
      await new Promise((r) => setTimeout(r, 2000));
      setExecutionResult(`RMMA executed with prompt: "${prompt}"`);
      setShowResult(true);
    } catch {
      setExecutionResult('Execution failed.');
      setShowResult(true);
    } finally {
      setIsExecuting(false);
      setNodes((nds) =>
        nds.map((n) => ({ ...n, data: { ...n.data, isExecuting: false } })),
      );
    }
  };

  const handleStop = () => {
    setIsExecuting(false);
    setExecutionResult('Stopped by user.');
    setShowResult(true);
    setNodes((nds) =>
      nds.map((n) => ({ ...n, data: { ...n.data, isExecuting: false } })),
    );
  };

  return (
    <div className="p-6 h-full">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header & Control Panel components preserved here */}
        <div className="mb-6">
          {/* ...Header Content... */}
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          {/* Flow Diagram */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <ReactFlowProvider>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
              >
                <Background />
                <MiniMap />
                <Controls />
              </ReactFlow>
            </ReactFlowProvider>
          </div>

          {/* Control Panel & Results preserved here */}
        </div>
      </div>
    </div>
  );
};

export default RmmaPage;
