import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const DevDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const devTools = [
    {
      name: 'Authentication Demo',
      description: 'Test authentication flows, view user data, and verify auth integration',
      path: '/auth-demo',
      icon: '🔐',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Auth Tester',
      description: 'Comprehensive authentication testing with lastLoginAt verification',
      path: '/auth-tester',
      icon: '🧪',
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      name: 'LastLogin Debugger',
      description: 'Detailed lastLoginAt debugging with step-by-step verification',
      path: '/lastlogin-debugger',
      icon: '🐛',
      color: 'bg-pink-600 hover:bg-pink-700'
    },
    {
      name: 'User ID Test',
      description: 'Test backend user creation and verify ID assignment',
      path: '/user-id-test',
      icon: '🆔',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      name: 'API Tester',
      description: 'Test backend API endpoints with custom requests and quick tests',
      path: '/api-tester',
      icon: '🔗',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'Firestore Tester',
      description: 'Test Firebase Firestore operations and document management',
      path: '/firestore-tester',
      icon: '🔥',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      name: 'Component Library',
      description: 'Browse and test UI components in isolation',
      path: '/component-library',
      icon: '🎨',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      name: 'State Inspector',
      description: 'Inspect and debug Zustand store state',
      path: '/state-inspector',
      icon: '🔍',
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Please log in to access Developer Tools</div>
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
          <div>
            <h1 className="text-white text-4xl font-bold mb-2">Developer Dashboard</h1>
            <p className="text-gray-400">Tools for testing and debugging the baSICK application</p>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Back to App
          </button>
        </div>

        {/* User Info */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-8">
          <h2 className="text-white text-xl font-semibold mb-4">Current User</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
            <div>
              <span className="font-medium">Name:</span> {user?.displayName || user?.name || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Email:</span> {user?.email || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Role:</span> {user?.role || 'N/A'}
            </div>
          </div>
        </div>

        {/* Developer Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {devTools.map((tool, index) => (
            <div
              key={index}
              className="bg-[#2a2a2a] rounded-lg p-6 hover:bg-[#333333] transition-colors cursor-pointer"
              onClick={() => navigate(tool.path)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{tool.icon}</div>
                <div className="flex-1">
                  <h3 className="text-white text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-gray-400 mb-4">{tool.description}</p>
                  <button
                    className={`${tool.color} text-white py-2 px-4 rounded font-medium transition-colors`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(tool.path);
                    }}
                  >
                    Open Tool
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Info */}
        <div className="mt-8 bg-[#2a2a2a] rounded-lg p-6">
          <h2 className="text-white text-xl font-semibold mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-300 text-sm">
            <div>
              <span className="font-medium">Environment:</span> Development
            </div>
            <div>
              <span className="font-medium">Client URL:</span> http://localhost:5173
            </div>
            <div>
              <span className="font-medium">API URL:</span> http://localhost:8080
            </div>
            <div>
              <span className="font-medium">Auth Provider:</span> Firebase
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-[#2a2a2a] rounded-lg p-6">
          <h2 className="text-white text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Clear All Storage
            </button>
            <button
              onClick={() => {
                console.log('Current Auth Store:', useAuthStore.getState());
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Log Auth State
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Test Login Flow
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
            >
              Test Signup Flow
            </button>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="mt-8 bg-[#2a2a2a] rounded-lg p-6">
          <h2 className="text-white text-xl font-semibold mb-4">Environment</h2>
          <div className="bg-[#1a1a1a] p-4 rounded">
            <pre className="text-green-400 text-sm">
              {JSON.stringify({
                NODE_ENV: import.meta.env.MODE,
                VITE_BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL,
                // Add other relevant env vars here (be careful not to expose secrets)
              }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevDashboard;
