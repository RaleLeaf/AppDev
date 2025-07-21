import { useLocation, Routes, Route } from 'react-router-dom';
import Test from './Test.jsx';
import Splash from './Splash.jsx';
import UserDetails from './UserDetails.jsx';
import WorkoutCategories from './WorkoutCategories.jsx';
import HomePage from './HomePage.jsx';
import Notifications from './Notifications.jsx';
import ExerciseList from './ExerciseList.jsx';
import TrainersList from './TrainersList.jsx';
import ProfilePage from './ProfilePage.jsx';
import EditProfile from './EditProfile.jsx';
import Settings from './Settings.jsx';
import FitnessLeaderboard from './FitnessLeaderboard.jsx';
import Appointment from './Appointment.jsx';
import UsersFeed from './UsersFeed.jsx';
import TrainerProfile from './TrainerProfile.jsx';
import ProgressTracker from './ProgressTracker.jsx';
import AIFitnessHelper from './AIFitnessHelper.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ChatBubble from './ChatBubble';
import Macro from './MacroTracker.jsx';
import AddFood from './AddFood.jsx';
import AuthDemo from './dev/AuthDemo.jsx';
import ApiTester from './dev/ApiTester.jsx';
import FirestoreTester from './dev/FirestoreTester.jsx';
import DevDashboard from './dev/DevDashboard.jsx';
import AuthTester from './dev/AuthTester.jsx';
import LastLoginDebugger from './dev/LastLoginDebugger.jsx';
import UserIdTest from './dev/UserIdTest.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import useAuthStore from '../store/authStore';

function AppWithChatBubble() {
  const location = useLocation();
  const { isLoading } = useAuthStore();
  const normalizedPath = location.pathname.toLowerCase().replace(/\/$/, '');
  const hiddenPaths = ['/login', '/signup', '/splash', '/ai-helper', '/user-details', '/profile', '/settings', '', '/', 'edit-profile'];

  // Hide chat bubble during loading states or on specific pages
  const showChatBubble = !isLoading && !hiddenPaths.includes(normalizedPath);

  return (
    <>
      {showChatBubble && <ChatBubble />}
      <Routes>
        {/* Public routes - redirect to home if already authenticated */}
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/splash" element={<Splash />} />
        
        {/* Protected routes - require authentication */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/user-details" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
        <Route path="/workout-categories" element={<ProtectedRoute><WorkoutCategories /></ProtectedRoute>} />
        <Route path="/exercises" element={<ProtectedRoute><ExerciseList /></ProtectedRoute>} />
        <Route path="/trainers" element={<ProtectedRoute><TrainersList /></ProtectedRoute>} />
        <Route path="/userprofile" element={<ProtectedRoute><TrainerProfile /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><FitnessLeaderboard /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
        <Route path="/feed" element={<ProtectedRoute><UsersFeed /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><ProgressTracker /></ProtectedRoute>} />
        <Route path="/ai-helper" element={<ProtectedRoute><AIFitnessHelper /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
        <Route path="/macros" element={<ProtectedRoute><Macro /></ProtectedRoute>} />
        <Route path="/add-food" element={<ProtectedRoute><AddFood /></ProtectedRoute>} />
        
        {/* Developer Tools - protected routes */}
        <Route path="/dev" element={<ProtectedRoute><DevDashboard /></ProtectedRoute>} />
        <Route path="/auth-demo" element={<ProtectedRoute><AuthDemo /></ProtectedRoute>} />
        <Route path="/api-tester" element={<ProtectedRoute><ApiTester /></ProtectedRoute>} />
        <Route path="/firestore-tester" element={<ProtectedRoute><FirestoreTester /></ProtectedRoute>} />
        <Route path="/auth-tester" element={<ProtectedRoute><AuthTester /></ProtectedRoute>} />
        <Route path="/lastlogin-debugger" element={<ProtectedRoute><LastLoginDebugger /></ProtectedRoute>} />
        <Route path="/user-id-test" element={<ProtectedRoute><UserIdTest /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default AppWithChatBubble;
