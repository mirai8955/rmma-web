import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Folder, Plus } from 'lucide-react'; // Plusアイコンを追加
import { fetchDocumentsList } from '../api/agentApi';
import type { DocumentItem } from '../types';
import { createEmptyDocument } from '../api/agentApi'; // createEmptyDocumentを追加

const DocumentsListPage = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewDocumentModal, setShowNewDocumentModal] = useState<boolean>(false); // モーダル表示状態
  const [newFilename, setNewFilename] = useState<string>(''); // 新規ファイル名
  const [isCreating, setIsCreating] = useState<boolean>(false); // 新規作成中かどうかの状態
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const fetchedDocuments = await fetchDocumentsList();
        setDocuments(fetchedDocuments);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDocumentClick = (filename: string) => {
    navigate(`/documents/${encodeURIComponent(filename)}`);
  };

  const handleCreateDocument = async () => {
    if (!newFilename.trim()) {
      alert('ファイル名を入力してください。');
      return;
    }

    setIsCreating(true);
    setError(null);
    try {
      await createEmptyDocument(newFilename.trim()); // 空のドキュメントを作成
      // 成功したら詳細ページに遷移
      navigate(`/documents/${encodeURIComponent(newFilename.trim())}`);
      setShowNewDocumentModal(false);
      setNewFilename(''); // 入力欄をクリア
    } catch (e: any) {
      setError(`Failed to create document: ${e.message}`);
      alert(`ドキュメントの作成に失敗しました: ${e.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateDocument();
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <FileText className="w-7 h-7 mr-3 text-blue-600" />
          Documents
        </h1>
        <button
          onClick={() => setShowNewDocumentModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Document
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          <p>No documents found. Click 'New Document' to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.filepath}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-100"
              onClick={() => handleDocumentClick(doc.filename)}
            >
              <div className="flex items-center mb-4">
                <Folder className="w-6 h-6 mr-3 text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-800">{doc.title}</h2>
              </div>
              <p className="text-sm text-gray-600">{doc.filename}</p>
            </div>
          ))}
        </div>
      )}

      {/* New Document Modal */}
      {showNewDocumentModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Document</h2>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              placeholder="Enter document filename (e.g., my_new_doc.md)"
              value={newFilename}
              onChange={(e) => setNewFilename(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewDocumentModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDocument}
                disabled={isCreating}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsListPage; 