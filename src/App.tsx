import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import TopPage from './pages/TopPage';
import AgentListPage from './pages/AgentListPage';
import AgentDetailPage from './pages/AgentDetailPage';

function App() {
  return (
    <Layout>
      <Routes>
        {/* ルートパスは/topにリダイレクト */}
        <Route path="/" element={<Navigate to="/top" replace />} />
        <Route path="/top" element={<TopPage />} />
        <Route path="/agent/lists" element={<AgentListPage />} />
        <Route path="/agent/detail/:agentName" element={<AgentDetailPage />} />
      </Routes>
    </Layout>
  )
}

export default App
