import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Test from './components/test.jsx';
import Splash from './components/Splash.jsx';
import UserDetails from './components/UserDetails.jsx';
import LoginSignup from './components/loginSignup.jsx';
import WorkoutCategories from './components/WorkoutCategories.jsx';
import HomePage from './components/HomePage.jsx';
import Notifications from './components/Notifications.jsx';
import ExerciseList from './components/ExerciseList.jsx';
import TrainersList from './components/TrainersList.jsx';import ProfilePage from './components/ProfilePage.jsx';
import EditProfile from './components/EditProfile.jsx';
import Settings from './components/Settings.jsx';
import FitnessLeaderboard from './components/FitnessLeaderboard.jsx';
import Appointment from './components/Appointment.jsx';
import UsersFeed from './components/UsersFeed.jsx';
import TrainerProfile from './components/TrainerProfile.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProgressTracker />
  </StrictMode>,
)
