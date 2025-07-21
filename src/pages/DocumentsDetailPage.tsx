import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { FileText, Save, Edit, Loader2 } from 'lucide-react'; // SaveとEditアイコンを追加
import { fetchDocumentContent, saveDocumentContent } from '../api/agentApi';

// markedの設定を更新
marked.setOptions({
  breaks: true, // 単一の改行を <br> タグに変換
});

const DocumentsDetailPage = () => {
  const { filename } = useParams<{ filename: string }>();
  const [documentContent, setDocumentContent] = useState<string | null>(null); // 表示用のHTML
  const [markdownContent, setMarkdownContent] = useState<string>(''); // 編集用のMarkdown
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // ドキュメントの内容を取得する関数
  const fetchDocument = async () => {
    if (!filename) {
      setError('Filename is missing.');
      setLoading(false);
      return;
    }

    try {
      const decodedFilename = decodeURIComponent(filename);
      const fetchedContent = await fetchDocumentContent(decodedFilename);
      setMarkdownContent(fetchedContent.content);
      const htmlContent = await marked(fetchedContent.content);
      setDocumentContent(htmlContent);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // 保存処理を行う関数
  const handleSave = async () => {
    if (!filename || !markdownContent) return;

    setIsSaving(true);
    setError(null);
    try {
      const decodedFilename = decodeURIComponent(filename);
      const updatedMarkdown = await saveDocumentContent(decodedFilename, markdownContent); // 編集後のMarkdownコンテンツが返る

      const htmlContent = await marked(updatedMarkdown); // 返ってきたMarkdownコンテンツをHTMLに変換
      setDocumentContent(htmlContent); // 表示を更新
      setMarkdownContent(updatedMarkdown); // 編集用textareaの内容も最新に更新

      setIsEditing(false); // 編集モードを終了
    } catch (e: any) {
      setError(`Failed to save document: ${e.message}`); // テンプレートリテラルを正しく閉じる
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, [filename]);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading document...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  if (documentContent === null) {
    return <div className="p-6 text-center text-gray-600">Document not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <FileText className="w-7 h-7 mr-3 text-blue-600" />
        Document Detail: <span className="ml-2 text-gray-700 text-2xl font-semibold">{decodeURIComponent(filename || '')}</span>
      </h1>

      <div className="flex justify-end mb-4 space-x-2">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                // 変更を破棄し、画面を再ロードして最新の内容を取得
                setLoading(true);
                fetchDocument();
              }}
              disabled={isSaving}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        {isEditing ? (
          <textarea
            className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y font-mono text-sm"
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            disabled={isSaving}
          />
        ) : (
          <div
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: documentContent }}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentsDetailPage;