import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsxViewEngine from 'jsx-view-engine';
import methodOverride from 'method-override';
import weatherRoute from './controllers/weatherday.mjs';
import fiveRoute from './controllers/fiveday.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1991;
const API_KEY = 'YH5hXE5XEWrZOADpUJASEA06gtoYsBj4';
const URL = `http://dataservice.accuweather.com/locations/v1/search?q=san&apikey=${API_KEY}`;

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/weatherday', weatherRoute);
app.use('/fiveday', fiveRoute);

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the Weather API!' });
});


app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
