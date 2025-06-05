// api/register.js
import mongoose from 'mongoose';
import { User } from './models.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await mongoose.connect(process.env.MONGO_URI);

  const { name, password } = req.body;

  const exists = await User.findOne({ name });
  if (exists) {
    return res.status(400).json({ success: false, message: 'Usuario ya existe' });
  }

  const user = await User.create({ name, password });
  res.status(200).json({ success: true, user });
}
