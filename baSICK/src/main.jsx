import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Test from './components/test.jsx';
import Splash from './components/Splash.jsx';
import UserDetails from './components/UserDetails.jsx';
import LoginSignup from './components/loginSignup.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      {/* <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/UserDetails" element={<UserDetails />} />
      </Routes> */}
      <LoginSignup />
    </Router>
  </StrictMode>,
)
