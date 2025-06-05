// api/models.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  password: String
});

const ChatSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  messages: Array,
  date: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
