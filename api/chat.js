// api/chat.js
import mongoose from 'mongoose';
import { User } from './models.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await mongoose.connect(process.env.MONGO_URI);

  const { userId, message } = req.body;

  // Aquí se simula la respuesta de una IA
  const reply = `Respuesta automática a: "${message}"`;

  res.status(200).json({ reply });
}
