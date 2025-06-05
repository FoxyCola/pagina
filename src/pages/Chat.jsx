// src/pages/Chat.jsx
import { useState } from 'react';

export default function Chat({user,setUser}) {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  console.log(user)

  const handleSend = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, userId: user._id }),
    });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Chat con IA</h2>
      <textarea
        rows="4"
        cols="50"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Escribe tu mensaje"
      />
      <br />
      <button onClick={handleSend}>Enviar</button>
      <p><strong>Respuesta:</strong> {reply}</p>
    </div>
  );
}
