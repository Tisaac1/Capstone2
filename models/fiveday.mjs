import mongoose from 'mongoose';

const fiveday = new mongoose.Schema({
   day: {
      type: String,
      required: true
   },
  Accuratedate: Boolean
});

const five = mongoose.model('day', fiveday);

export default five;