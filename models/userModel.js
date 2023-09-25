import mongoose from 'mongoose';

const userShema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter a nick-name'],
    unique: false,
  },
  score: {
    type: Number,
    required: true,
    unique: false,
    default: 0,
  },
});

const User = mongoose.model('User', userShema);

export default User;
