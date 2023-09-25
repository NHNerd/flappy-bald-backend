import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import cors from 'cors';

dotenv.config();
const app = express();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

// Connect mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB is connected');

    // Start seerver
    app.listen(3000, () => {
      console.log(`server is running: http://${HOST}:${PORT}`);
    });

    return;
  })
  .catch((error) => {
    console.log('Database connection ERROR: \n' + error);
    return;
  });

//midlware
app.use(express.json());
app.use(
  cors({
    origin: [
      ,
      'http://192.168.1.5:5500',
      'http://192.168.1.6:5500',
      'http://192.168.1.7:5500',
      'https://nhnerd.github.io/Flappy-Bald/',
      'https://nhnerd.github.io/Flappy-Bald',
    ],
  })
);

// Get All users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
});

app.post('/newUser', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res
      .status(200)
      .json({ message: `S E R V E R DELETE: user: ${deletedUser.name} is deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
