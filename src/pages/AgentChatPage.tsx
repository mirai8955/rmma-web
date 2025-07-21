import React, { useState, useRef, useEffect } from 'react'; // useEffectを追加
import { runAgentStream, fetchAgents } from '../api/agentApi'; // fetchAgentsを追加
import { Play, Square } from 'lucide-react';
import type { AgentListApiResponse } from '../types'; // AgentListApiResponseをインポート (未使用ですが型のため)

const ChatAgentPage: React.FC = () => {
  const [agentName, setAgentName] = useState('default');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [agents, setAgents] = useState<string[]>([]); // エージェントリストの状態
  const [agentsLoading, setAgentsLoading] = useState<boolean>(true); // エージェントリストのローディング状態
  const [agentsError, setAgentsError] = useState<string | null>(null); // エージェントリストのエラー状態
  const abortCtrl = useRef<AbortController | null>(null);

  // エージェントリストの取得
  useEffect(() => {
    const getAgents = async () => {
      try {
        const fetchedAgents = await fetchAgents();
        setAgents(fetchedAgents);
        if (fetchedAgents.length > 0 && agentName === 'default') {
          setAgentName(fetchedAgents[0]); // デフォルトで最初のエージェントを選択
        }
      } catch (e: any) {
        setAgentsError(`Failed to load agents: ${e.message}`);
      } finally {
        setAgentsLoading(false);
      }
    };
    getAgents();
  }, []);

  const handleRun = async () => {
    if (!prompt.trim() || !agentName) return; // エージェント名もチェック
    setMessages('');
    setIsStreaming(true);

    // 中断用コントローラを作成
    const controller = new AbortController();
    abortCtrl.current = controller;

    try {
      await runAgentStream(
        agentName,
        prompt,
        (chunk) => {
          // チャンクを受け取るごとに state に追加
          setMessages((prev) => prev + chunk);
        },
        controller.signal
      );
    } catch (e: any) {
      if (e.name === 'AbortError') {
        setMessages((prev) => prev + '\n\n[Cancelled]');
      } else {
        setMessages((prev) => prev + `\n\n[Error: ${e.message}]`);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const handleStop = () => {
    abortCtrl.current?.abort();
    setIsStreaming(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Chat with Agent</h1>

      {/* エージェント選択 */}
      <div>
        <label htmlFor="agent-select" className="block mb-1 font-medium text-gray-700">Agent:</label>
        {agentsLoading ? (
          <p className="text-gray-500">Loading agents...</p>
        ) : agentsError ? (
          <p className="text-red-500">Error: {agentsError}</p>
        ) : (
          <select
            id="agent-select"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            disabled={isStreaming || agents.length === 0}
          >
            {agents.length === 0 ? (
              <option value="">No agents available</option>
            ) : (
              agents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))
            )}
          </select>
        )}
      </div>

      {/* プロンプト入力 */}
      <div>
        <label className="block mb-1">Prompt:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border rounded resize-none"
          disabled={isStreaming}
        />
      </div>

      {/* 実行 / 停止ボタン */}
      <div className="flex space-x-3">
        {!isStreaming ? (
          <button
            onClick={handleRun}
            disabled={!prompt.trim() || isStreaming || !agentName} // エージェント名も無効化条件に追加
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <Play className="w-5 h-5 mr-2" /> Run
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <Square className="w-5 h-5 mr-2" /> Stop
          </button>
        )}
      </div>

      {/* メッセージ表示エリア */}
      <div className="bg-gray-50 p-4 rounded h-64 overflow-y-auto whitespace-pre-wrap">
        {messages || <span className="text-gray-500">Run to see response...</span>}
      </div>
    </div>
  );
};

export default ChatAgentPage;
