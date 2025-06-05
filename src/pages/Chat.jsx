import { useState } from 'react';

export default function Chat({ user, setUser }) {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

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
    <div
      style={{
        height: '70vh',
        width: '82vw',
        backgroundImage: 'url("Fondo.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'cover',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: '25%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        }}
      >
        <div>
          <div
            style={{
              backgroundColor: '#8B4513',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            <h2>Cat O' Cola</h2>
          </div>

          <textarea
            rows="4"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
            style={{
              width: '100%',
              resize: 'none',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginBottom: '1rem',
            }}
          />

          <button
            onClick={handleSend}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#8B4513',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            Enviar
          </button>

          <div
            style={{
              padding: '0.5rem',
              backgroundColor: '#f0f0f0',
              borderRadius: '6px',
              minHeight: '100px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            <strong>Cat:</strong> {reply}
          </div>
        </div>
      </div>
    </div>
  );
}
