import './App.css'
import { useEffect } from 'react'
import useAuthStore from './store/authStore'
import AppWithChatBubble from './components/AppWithChatBubble'

function App() {
  const { initialize } = useAuthStore();
  
  useEffect(() => {
    // Initialize authentication state when app starts
    initialize();
  }, [initialize]);

  return (
    <AppWithChatBubble />
  )
}

export default App;

