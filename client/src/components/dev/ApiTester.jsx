import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useAuthStore from '../../store/authStore';

const ApiTester = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [url, setUrl] = useState('/api/health');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Common API endpoints for quick testing
  const quickEndpoints = [
    { name: 'Health Check', method: 'GET', url: '/api/health' },
    { name: 'Get All Users', method: 'GET', url: '/api/users' },
    { name: 'Get Current User', method: 'GET', url: `/api/users/${user?.id || 'USER_ID'}` },
    { name: 'Search Users', method: 'GET', url: '/api/users/search?query=test' },
    { name: 'Get User by Firebase UID', method: 'GET', url: `/api/users/firebase/${user?.uid || 'FIREBASE_UID'}` },
    { name: 'Update Last Login', method: 'PATCH', url: `/api/users/${user?.id || 'USER_ID'}/last-login` },
    { name: 'Create User', method: 'POST', url: '/api/users', body: JSON.stringify({
      firebaseUid: 'test-uid',
      name: 'Test User',
      email: 'test@example.com',
      authType: 'email',
      role: 'USER'
    }, null, 2) },
  ];

  const handleRequest = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let requestData = null;
      if (body && body.trim()) {
        try {
          requestData = JSON.parse(body);
        } catch (parseError) {
          throw new Error(`Invalid JSON in request body: ${parseError.message}`);
        }
      }
      
      const config = {
        method: method.toLowerCase(),
        url,
        ...(requestData && { data: requestData })
      };
      
      const res = await api(config);
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: res.data,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      const errorData = {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        timestamp: new Date().toISOString()
      };
      setError(errorData);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickTest = (endpoint) => {
    setUrl(endpoint.url);
    setMethod(endpoint.method);
    setBody(endpoint.body || '');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Please log in to use API Tester</div>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-3xl font-bold">API Tester</h1>
          <button
            onClick={() => navigate('/dev')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Back to Dev Tools
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Configuration */}
          <div className="bg-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-white text-xl font-semibold mb-4">Request Configuration</h2>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white p-2 rounded border border-gray-600"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white p-2 rounded border border-gray-600"
                placeholder="/api/endpoint"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Request Body (JSON)</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white p-2 rounded h-32 font-mono text-sm border border-gray-600"
                placeholder='{"key": "value"}'
              />
            </div>
            
            <button
              onClick={handleRequest}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-2 px-4 rounded font-medium"
            >
              {loading ? 'Sending Request...' : 'Send Request'}
            </button>
          </div>

          {/* Quick Tests */}
          <div className="bg-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-white text-xl font-semibold mb-4">Quick Tests</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {quickEndpoints.map((endpoint, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickTest(endpoint)}
                  className="w-full text-left bg-[#1a1a1a] hover:bg-[#333333] text-white p-3 rounded border border-gray-600"
                >
                  <div className="font-medium">{endpoint.name}</div>
                  <div className="text-sm text-gray-400">
                    {endpoint.method} {endpoint.url}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-red-900 border border-red-700 rounded-lg p-6">
            <h3 className="text-white font-medium mb-2 flex items-center">
              <span className="mr-2">❌</span>
              Error Response
            </h3>
            <div className="text-sm text-gray-300 mb-2">
              Status: {error.status || 'Unknown'} {error.statusText || ''}
            </div>
            <div className="text-sm text-gray-300 mb-2">
              Time: {error.timestamp}
            </div>
            <pre className="bg-[#1a1a1a] p-4 rounded overflow-auto text-red-400 text-sm max-h-64">
              {JSON.stringify(error.data || error.message, null, 2)}
            </pre>
          </div>
        )}
        
        {/* Success Response */}
        {response && (
          <div className="mt-6 bg-green-900 border border-green-700 rounded-lg p-6">
            <h3 className="text-white font-medium mb-2 flex items-center">
              <span className="mr-2">✅</span>
              Response: {response.status} {response.statusText}
            </h3>
            <div className="text-sm text-gray-300 mb-2">
              Time: {response.timestamp}
            </div>
            <div className="text-sm text-gray-300 mb-4">
              Headers: {Object.keys(response.headers).length} items
            </div>
            <pre className="bg-[#1a1a1a] p-4 rounded overflow-auto text-green-400 text-sm max-h-96">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTester;
