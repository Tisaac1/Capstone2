import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import cors from 'cors';
import weatherRoute from './controllers/weatherday.mjs';
import connectdb from './db/conn.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1991;

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

connectdb();

app.use('/weatherday', weatherRoute);

app.get('/', (req, res) => {
  res.send(
      `<div> Weather five day Route <br/><a href='/weatherday'>Weather</a>

      </div>`
      
  )
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
