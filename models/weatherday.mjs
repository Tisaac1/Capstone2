import mongoose from 'mongoose';

const weatherday = new mongoose.Schema({
   day: {
      type: String,
      required: true
   },
  Accuratedate: Boolean
});

const weather = mongoose.model('Day', weatherday);

export default weather;