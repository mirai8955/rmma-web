import { Link } from 'react-router-dom';

const TopPage = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to RMMA
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Rakuten Mobile Marketing Agent
          </h2>
          <p className="text-gray-600 leading-relaxed">
            RMMAは楽天モバイルのマーケティング活動を支援するエージェントシステムです。
            様々なエージェントを通じて、効率的なマーケティング戦略の立案と実行をサポートします。
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/agent/lists" className="block">
              <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                <h3 className="font-semibold text-blue-800 mb-2">エージェント管理</h3>
                <p className="text-blue-600 text-sm">
                  各種マーケティングエージェントの設定と管理
                </p>
              </div>
            </Link>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">自動化</h3>
              <p className="text-green-600 text-sm">
                マーケティングタスクの自動化と効率化
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPage; 