import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import registerHandler from './api/register.js';
import loginHandler from './api/login.js';
import chatHandler from './api/chat.js';

dotenv.config();

const app = express();
app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    app.post('/api/register', registerHandler);
    app.post('/api/login', loginHandler);
    app.post('/api/chat', chatHandler);

    app.listen(process.env.PORT || 3001, () => {
      console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}

startServer();
