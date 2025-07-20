import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottonNav';
import SideNav from './SideNav';

const FitnessLeaderboard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/leaderboards');
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        const data = await res.json();
        setLeaderboardData(data);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <SideNav />
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
          <div className="p-5 flex items-center">
            <button className="p-2 md:hidden" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl md:text-3xl font-bold kanit-bold mx-auto md:mx-0 md:pl-0 pr-8 md:pr-0">
              FITNESS LEADERBOARD
            </h1>
          </div>
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 flex-1 mt-2">
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && leaderboardData.length === 0 && (
              <div>No leaderboard data found.</div>
            )}
            {!loading && !error && leaderboardData.map((user, idx) => (
              <div key={user.id || idx} onClick={() => navigate('/userprofile')} className="relative mb-4">
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black border-2 border-lime-500 flex items-center justify-center text-white font-bold">
                  {user.rank ?? idx + 1}
                </div>
                <div className="ml-7 bg-zinc-900 rounded-lg p-3 flex items-center hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-3">
                    <img src={user.userProfilePicture} alt={user.userName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium kanit-medium">{user.userName}</h3>
                    <p className="text-xs text-gray-400">
                      {user.formattedScore || `${user.score ?? 0} ${user.unit || ''}`}
                    </p>
                    <p className="text-xs text-lime-500">
                      {user.category && user.timeframe
                        ? `${user.category.replace('_', ' ')} (${user.timeframe.replace('_', ' ')})`
                        : ''}
                    </p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <BottomNav />
      </div>
    </div>
  );
};

export default FitnessLeaderboard;