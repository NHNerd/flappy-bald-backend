import mongoose from 'mongoose';

const userShema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter a nick-name'],
    unique: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
});

const User = mongoose.model('User', userShema);

export default User;
