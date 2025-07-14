import { Route, Routes, Link } from 'react-router-dom';
import AgentListPage from './pages/AgentListPage';
import AgentDetailPage from './pages/AgentDetailPage';

function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="text-center">
        <h1 className="text-4xl font-bold">
          Rakuten Mobile Marketing Agent
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Frontend Project
        </p>
        <Link to="/agent/lists">
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            Go to Agent List
          </button>
        </Link>
      </header>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/agent/lists" element={<AgentListPage />} />
      <Route path="/agent/detail/:agentName" element={<AgentDetailPage />} />
    </Routes>
  )
}

export default App
