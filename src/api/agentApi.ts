/**
 * APIレスポンスの型定義
 */
interface AgentApiResponse {
  status: 'success' | 'error';
  result: string; // stringified JSON array
}

/**
 * 利用可能なエージェントのリストを取得します。
 * @returns エージェント名の文字列の配列
 */
export const fetchAgents = async (): Promise<string[]> => {
  try {
    const response = await fetch("http://localhost:8000/agent/lists");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: AgentApiResponse = await response.json();

    if (data.status !== 'success') {
      throw new Error('API returned an error status');
    }

    // resultは文字列化されたJSONなので、パースして配列に変換する
    const agentList: string[] = JSON.parse(data.result);
    return agentList;

  } catch (error) {
    console.error("Failed to fetch agents:", error);
    // エラーが発生した場合は空の配列を返すか、エラーを再スローするかは設計次第
    // ここでは呼び出し側でハンドリングできるよう、再スローします
    throw error;
  }
}; 