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


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserDetails />
  </StrictMode>,
)
