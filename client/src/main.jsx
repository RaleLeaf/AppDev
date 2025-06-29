import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Test from './components/test.jsx';
import Splash from './components/Splash.jsx';
import UserDetails from './components/UserDetails.jsx';
import WorkoutCategories from './components/WorkoutCategories.jsx';
import HomePage from './components/HomePage.jsx';
import Notifications from './components/Notifications.jsx';
import ExerciseList from './components/ExerciseList.jsx';
import TrainersList from './components/TrainersList.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import EditProfile from './components/EditProfile.jsx';
import Settings from './components/Settings.jsx';
import FitnessLeaderboard from './components/FitnessLeaderboard.jsx';
import Appointment from './components/Appointment.jsx';
import UsersFeed from './components/UsersFeed.jsx';
import TrainerProfile from './components/TrainerProfile.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';
import AIFitnessHelper from './components/AIFitnessHelper.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
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
        <Route path="/trainer/:id" element={<TrainerProfile />} />
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
      </Routes>
    </Router>
  </StrictMode>,
)