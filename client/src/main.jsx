import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import AppWithChatBubble from './components/AppWithChatBubble.jsx';
import AuthProvider from './components/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <AppWithChatBubble />
      </AuthProvider>
    </Router>
  </StrictMode>
)