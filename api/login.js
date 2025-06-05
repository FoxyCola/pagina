import mongoose from 'mongoose';
import { User } from './models.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await mongoose.connect(process.env.MONGO_URI);

  const { name, password } = req.body;

  const user = await User.findOne({ name, password });
  if (!user) {
    return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }

res.status(200).json({ success: true, user });

}
