// api/chat.js
import mongoose from 'mongoose';
import { Configuration, OpenAIApi } from 'openai';
import { User } from './models.js';

const config = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
if (req.method !== 'POST') return res.status(405).end();

await mongoose.connect(process.env.MONGO_URI);

const { userId, message } = req.body;

try {
    const promptSistema = "respondeme como un gatito con maullidos";
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // puedes usar gpt-4 si tu clave lo permite
    messages: [
        { role: 'system', content:promptSistema},
        { role: 'user', content: message }
    ],
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
} catch (err) {
    console.error('Error con OpenAI:', err.message);
    res.status(500).json({ error: 'Error al consultar la IA' });
}
}
