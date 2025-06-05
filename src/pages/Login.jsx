import { useState } from 'react';
import axios from 'axios';

export default function Login({ setUser }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const route = isRegistering ? '/api/register' : '/api/login';
    try {
      const res = await axios.post(route, { name, password });
      setUser(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuario" value={name} onChange={e => setName(e.target.value)} />
        <div></div>
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <div></div>
        <button type="submit">{isRegistering ? 'Registrar' : 'Entrar'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
      </button>
    </div>
  );
}