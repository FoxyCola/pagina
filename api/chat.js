import mongoose from 'mongoose';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { User } from './models.js';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const { userId, message } = req.body;

  try {
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const promptSistema = `Responde como bartender de un bar el usuario podra pedir cafes pero por el momento el menu no se encuentra
    programado porque el desarrollador tuvo problemas de red, asi que por ahora debes brindar un servicio de atencion conversatorio, tu nombre es "Cat" y tienes una personalidad calida y servicial
    no puedes brindar asesoria mas alla del cafe o atencion basica al cliente, tu cliente actual es ${user.name} solo te dirigiras a su nombre si el te lo pide. si te pide informacion sobre ti
    tu edad es 24 años vives en cali colombia valle del cauca`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: promptSistema },
        { role: 'user', content: message }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error('❌ Error con OpenAI:', err.message);
    res.status(500).json({ error: 'Error al consultar la IA' });
  }
}