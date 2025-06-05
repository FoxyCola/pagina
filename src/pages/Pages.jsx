import { useState } from 'react';
import axios from 'axios';

export default function Chat({ user, setUser }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const res = await axios.post('/api/chat', {
      userId: user._id,
      message,
    });
    setMessages([...messages, { role: 'user', text: message }, { role: 'ia', text: res.data.reply }]);
    setMessage('');
  };

  const handleLogout = async () => {
    await axios.post('/api/logout', {
      userId: user._id,
      messages,
    });
    setUser(null);
  };

  return (
    <div>
      <h2>Chat con IA</h2>
      <div>
        {messages.map((m, i) => (
          <div key={i}><b>{m.role === 'user' ? 'Tú' : 'IA'}:</b> {m.text}</div>
        ))}
      </div>
      <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Escribe un mensaje" />
      <button onClick={sendMessage}>Enviar</button>
      <button onClick={handleLogout}>Salir</button>
    </div>
  );
}
