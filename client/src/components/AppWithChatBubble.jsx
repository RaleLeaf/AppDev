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

function AppWithChatBubble() {
  const location = useLocation();
  const normalizedPath = location.pathname.toLowerCase().replace(/\/$/, '');
  const hiddenPaths = ['/login', '/signup', '/splash','/ai-helper','/user-details','','/'];

  const showChatBubble = !hiddenPaths.includes(normalizedPath);

  return (
    <>
      {showChatBubble && <ChatBubble />}
      <Routes>
        {/* Splash screen as separate route */}
        <Route path="/splash" element={<Splash />} />
        
        {/* Login and Signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Default route redirects to login */}
        <Route path="/" element={<Login />} />
        
        {/* Main app routes after login */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/workout-categories" element={<WorkoutCategories />} />
        <Route path="/exercises" element={<ExerciseList />} />
        <Route path="/trainers" element={<TrainersList />} />
        <Route path="/userprofile" element={<TrainerProfile />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/leaderboard" element={<FitnessLeaderboard />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/feed" element={<UsersFeed />} />
        <Route path="/progress" element={<ProgressTracker />} />
        <Route path="/ai-helper" element={<AIFitnessHelper />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/test" element={<Test />} />
        <Route path ="/macros" element={<Macro />} />
        <Route path="/add-food" element={<AddFood />}/>
        
        {/* Developer Tools */}
        <Route path="/dev" element={<DevDashboard />} />
        <Route path="/auth-demo" element={<AuthDemo />} />
        <Route path="/api-tester" element={<ApiTester />} />
        <Route path="/firestore-tester" element={<FirestoreTester />} />
        <Route path="/auth-tester" element={<AuthTester />} />
        <Route path="/lastlogin-debugger" element={<LastLoginDebugger />} />
        <Route path="/user-id-test" element={<UserIdTest />} />
      </Routes>
    </>
  );
}

export default AppWithChatBubble;
