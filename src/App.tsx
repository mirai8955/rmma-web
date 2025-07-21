import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import TopPage from './pages/TopPage';
import RmmaPage from './pages/RmmaPage';
import AgentListPage from './pages/AgentListPage';
import AgentDetailPage from './pages/AgentDetailPage';
import AgentChatPage from './pages/AgentChatPage';
import DocumentsListPage from './pages/DocumentsListPage';
import DocumentsDetailPage from './pages/DocumentsDetailPage';

function App() {
  return (
    <Layout>
      <Routes>
        {/* ルートパスは/topにリダイレクト */}
        <Route path="/" element={<Navigate to="/top" replace />} />
        <Route path="/top" element={<TopPage />} />
        <Route path="/rmma" element={<RmmaPage />} />
        <Route path="/agent/lists" element={<AgentListPage />} />
        <Route path="/agent/detail/:agentName" element={<AgentDetailPage />} />
        <Route path="/agent/chat" element={<AgentChatPage />} />
        <Route path="/documents/lists" element={<DocumentsListPage />} />
        <Route path="/documents/:filename" element={<DocumentsDetailPage />} />
      </Routes>
    </Layout>
  )
}

export default App
