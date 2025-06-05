import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login';
import Chat from './pages/Chat';
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  return (
    <div style={{ padding: 20 }}>
      {user ? <Chat user={user} setUser={setUser} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App
