/**
 * エージェント詳細情報の型定義
 */
export interface AgentDetail {
  name: string;
  description: string;
  instruction: string;
  model: string;
  output_key: string;
  sub_agents: string[];
  tools: string[];
}

/**
 * エージェントリストAPIレスポンスの型定義
 */
export interface AgentListApiResponse {
  status: 'success' | 'error';
  result: string; // stringified JSON array
}

/**
 * エージェント詳細APIレスポンスの型定義
 */
export interface AgentDetailApiResponse {
  status: 'success' | 'error';
  agent_name: string;
  result: string; // stringified JSON object
}

/**
 * エージェント更新APIレスポンスの型定義
 */
export interface AgentUpdateApiResponse {
  status: 'success' | 'error';
  agent_name?: string;
  result: string; // stringified JSON object
}

/**
 * エージェント更新用のリクエストボディ型定義
 * AgentDetailと同じ構造を持つ
 */
export type UpdateAgentRequest = AgentDetail; 