import React from 'react';
import useAuthStore from '../store/authStore';

function UserDebugger() {
    const { user } = useAuthStore();

    return (
        <div className="p-4 bg-gray-800 text-white">
            <h2 className="text-xl font-bold mb-4">User Debug Information</h2>
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>
    );
}

export default UserDebugger;
