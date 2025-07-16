import { useState } from 'react';
import { Send, Play, Square, MessageCircle, Workflow, Settings } from 'lucide-react';

const RmmaPage = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleExecute = async () => {
    if (!prompt.trim()) return;
    
    setIsExecuting(true);
    setShowResult(false);
    
    try {
      // TODO: 実際のAPIコール
      // const result = await executeRmma(prompt);
      
      // Mock execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      setExecutionResult(`RMMA executed successfully with prompt: "${prompt}"`);
      setShowResult(true);
    } catch (error) {
      console.error('Execution failed:', error);
      setExecutionResult('Execution failed. Please try again.');
      setShowResult(true);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleStop = () => {
    setIsExecuting(false);
    setExecutionResult('Execution stopped by user.');
    setShowResult(true);
  };

  return (
    <div className="p-6 h-full">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            RMMA - Execution Flow
          </h1>
          <p className="text-gray-600">
            Visual agent flow execution with prompt-based control
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          {/* Flow Diagram */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Workflow className="w-5 h-5 mr-2" />
                Agent Flow Diagram
              </h2>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            
            {/* Flow Canvas */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg h-96 relative bg-gray-50 overflow-hidden">
              {/* Flow nodes */}
              <div className="absolute inset-0 p-4">
                {/* Start Node */}
                <div className="absolute top-8 left-8 bg-green-100 border-2 border-green-400 rounded-lg p-3 w-32 text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium text-green-800">Start</div>
                  <div className="text-xs text-green-600">Input Prompt</div>
                </div>

                {/* RMMA Agent Node */}
                <div className="absolute top-8 left-52 bg-blue-100 border-2 border-blue-400 rounded-lg p-3 w-40 text-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium text-blue-800">RMMA Agent</div>
                  <div className="text-xs text-blue-600">Main Processing</div>
                </div>

                {/* Sub Agents */}
                <div className="absolute top-32 left-64 bg-purple-100 border-2 border-purple-400 rounded-lg p-3 w-36 text-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium text-purple-800">Sub Agents</div>
                  <div className="text-xs text-purple-600">Analysis & Task</div>
                </div>

                {/* Output Node */}
                <div className="absolute top-8 right-8 bg-orange-100 border-2 border-orange-400 rounded-lg p-3 w-32 text-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium text-orange-800">Output</div>
                  <div className="text-xs text-orange-600">Result</div>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Start to RMMA */}
                  <path
                    d="M 140 50 L 208 50"
                    stroke="#6366f1"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  {/* RMMA to Sub Agents */}
                  <path
                    d="M 272 70 L 320 90"
                    stroke="#6366f1"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  {/* RMMA to Output */}
                  <path
                    d="M 392 50 L 460 50"
                    stroke="#6366f1"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  {/* Sub Agents to Output */}
                  <path
                    d="M 400 110 L 480 70"
                    stroke="#6366f1"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#6366f1"
                      />
                    </marker>
                  </defs>
                </svg>

                {/* Execution Status Indicator */}
                {isExecuting && (
                  <div className="absolute top-2 right-2 flex items-center space-x-2 bg-yellow-100 border border-yellow-400 rounded-lg px-3 py-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-yellow-800">Executing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Prompt Input
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your prompt for RMMA:
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter your marketing task or question here..."
                    disabled={isExecuting}
                  />
                </div>
                
                <div className="flex space-x-2">
                  {!isExecuting ? (
                    <button
                      onClick={handleExecute}
                      disabled={!prompt.trim()}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Execute
                    </button>
                  ) : (
                    <button
                      onClick={handleStop}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </button>
                  )}
                  
                  <button
                    onClick={() => setPrompt('')}
                    disabled={isExecuting}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Execution Result */}
            {showResult && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Execution Result
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {executionResult}
                  </p>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setPrompt('Analyze current market trends for mobile services')}
                  className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  📊 Market Analysis
                </button>
                <button
                  onClick={() => setPrompt('Generate social media campaign ideas for new product launch')}
                  className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  📱 Social Media Campaign
                </button>
                <button
                  onClick={() => setPrompt('Create customer retention strategy for mobile users')}
                  className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  🎯 Customer Retention
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RmmaPage; 