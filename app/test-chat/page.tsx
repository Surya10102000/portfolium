'use client';

import { useState } from 'react';
import { askAssistant } from '@/services/assistantApi';

export default function TestChatPage() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setLoading(true);
    try {
      const result = await askAssistant(message);
      setResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Chat API Test</h1>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>

        <div className="bg-gray-50 p-4 rounded">
          <h2 className="font-semibold mb-2">API Response:</h2>
          <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm">
            {response || 'Send a message to see the response...'}
          </pre>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <p className="font-medium">Test Endpoints:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><code>GET /api/test</code> - Test API connectivity</li>
            <li><code>POST /api/assistance</code> - Chat API endpoint</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
