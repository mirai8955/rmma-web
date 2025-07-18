import type { 
  AgentDetail, 
  AgentListApiResponse, 
  AgentDetailApiResponse, 
  AgentUpdateApiResponse,
  UpdateAgentRequest 
} from '../types';

/**
 * バックエンドのベースURL
 */
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

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
    const data: AgentListApiResponse = await response.json();

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
    const requestBody = JSON.stringify(updateData);
    const requestUrl = `${BACKEND_URL}/agent/${agentName}`;
    
    console.log('Sending update request:', {
      url: requestUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
      parsedBody: updateData
    });

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (!response.ok) {
      // エラーレスポンスの詳細を取得
      const errorText = await response.text();
      console.error('Update failed:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: requestUrl,
        requestData: updateData
      });
      
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data: AgentUpdateApiResponse = await response.json();
    
    console.log('Raw API response:', data);
    console.log('Response status:', data.status);
    console.log('Response result (raw):', data.result);

    if (data.status !== 'success') {
      throw new Error(`API returned error status: ${data.status}`);
    }

    // resultは文字列化されたJSONまたは直接オブジェクトの可能性がある
    let agentDetail: AgentDetail;
    try {
      // まず文字列として解析を試行
      if (typeof data.result === 'string') {
        agentDetail = JSON.parse(data.result);
      } else {
        // 既にオブジェクトの場合はそのまま使用
        agentDetail = data.result as AgentDetail;
      }
      console.log('Parsed agent detail:', agentDetail);
    } catch (parseError) {
      console.error('Failed to parse result JSON:', parseError);
      console.error('Raw result:', data.result);
      console.error('Result type:', typeof data.result);
      throw new Error('Failed to parse API response');
    }
    
    return agentDetail;

  } catch (error) {
    console.error("Failed to update agent detail:", error);
    throw error;
  }
}; 


/**
 * エージェントをストリーミングで呼び出します。
 * @param agentName 呼び出すエージェント名
 * @param prompt プロンプト文字列
 * @param onMessage ストリームから受け取ったチャンクごとに呼ばれるコールバック
 * @param signal AbortController.signal。中断したいときに利用。
 */
export async function runAgentStream(
  agentName: string,
  prompt: string,
  onMessage: (chunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const url = `${BACKEND_URL}/agent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent_name: agentName, prompt }),
    signal,
  });
  if (!res.ok || !res.body) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const reader = res.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      // value は受け取ったテキストチャンク
      onMessage(value);
    }
  } finally {
    reader.releaseLock();
  }
}