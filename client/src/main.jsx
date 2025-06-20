import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Test from './components/test.jsx';
import Splash from './components/Splash.jsx';
import UserDetails from './components/UserDetails.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserDetails />
  </StrictMode>,
)
