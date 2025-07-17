import React, { useState, useRef } from 'react';
import { runAgentStream } from '../api/agentApi';
import { Play, Square } from 'lucide-react';

const ChatAgentPage: React.FC = () => {
  const [agentName, setAgentName] = useState('default');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortCtrl = useRef<AbortController | null>(null);

  const handleRun = async () => {
    if (!prompt.trim()) return;
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

      {/* エージェント選択（もし複数あるなら） */}
      <div>
        <label className="block mb-1">Agent:</label>
        <input
          type="text"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
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
            disabled={!prompt.trim()}
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
