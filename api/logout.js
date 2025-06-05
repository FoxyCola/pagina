// api/logout.js
import mongoose from 'mongoose';
import { Chat } from './models.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await mongoose.connect(process.env.MONGO_URI);

  const { userId, messages } = req.body;

  await Chat.create({ userId, messages });
  res.status(200).json({ success: true });
}
