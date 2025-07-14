/**
 * バックエンドのベースURL
 */
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

/**
 * APIレスポンスの型定義
 */
interface AgentApiResponse {
  status: 'success' | 'error';
  result: string; // stringified JSON array
}

/**
 * エージェント詳細情報の型定義
 */
interface AgentDetail {
  name: string;
  description: string;
  instruction: string;
  model: string;
  output_key: string;
  sub_agents: string[];
  tools: string[];
}

/**
 * エージェント詳細APIレスポンスの型定義
 */
interface AgentDetailApiResponse {
  status: 'success' | 'error';
  agent_name: string;
  result: string; // stringified JSON object
}

/**
 * エージェント更新用のリクエストボディ型定義
 */
interface UpdateAgentRequest {
  instruction: string;
}

/**
 * 利用可能なエージェントのリストを取得します。
 * @returns エージェント名の文字列の配列
 */
export const fetchAgents = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/agent/lists`);
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

/**
 * 特定のエージェントの詳細情報を取得します。
 * @param agentName エージェント名
 * @returns エージェントの詳細情報
 */
export const fetchAgentDetail = async (agentName: string): Promise<AgentDetail> => {
  try {
    const response = await fetch(`${BACKEND_URL}/agent/${agentName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: AgentDetailApiResponse = await response.json();

    if (data.status !== 'success') {
      throw new Error('API returned an error status');
    }

    // resultは文字列化されたJSONなので、パースしてオブジェクトに変換する
    const agentDetail: AgentDetail = JSON.parse(data.result);
    return agentDetail;

  } catch (error) {
    console.error("Failed to fetch agent detail:", error);
    throw error;
  }
};

/**
 * エージェントの詳細情報を更新します。
 * @param agentName エージェント名
 * @param updateData 更新するデータ
 * @returns 更新後のエージェント詳細情報
 */
export const updateAgentDetail = async (agentName: string, updateData: UpdateAgentRequest): Promise<AgentDetail> => {
  try {
    const response = await fetch(`${BACKEND_URL}/agent/${agentName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AgentDetailApiResponse = await response.json();

    if (data.status !== 'success') {
      throw new Error('API returned an error status');
    }

    // resultは文字列化されたJSONなので、パースしてオブジェクトに変換する
    const agentDetail: AgentDetail = JSON.parse(data.result);
    return agentDetail;

  } catch (error) {
    console.error("Failed to update agent detail:", error);
    throw error;
  }
}; 