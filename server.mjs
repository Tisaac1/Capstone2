import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import db from './db/conn.mjs';
import bodyParser from 'body-parser';
import jsxViewEngine from 'jsx-view-engine';
import methodOverride from 'method-override'
import weatherRoute from './controllers/weatherday.mjs';
import fiveRoute from './controllers/fiveday.mjs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1991;
const apikey = 'YH5hXE5XEWrZOADpUJASEA06gtoYsBj4'

app.set('view engine', 'jsx');
app.set ('views', './views');
app.engine('jsx', jsxViewEngine());

app.use(bodyParser.json()); 

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(methodOverride('_method'));


app.use('/weather', weatherRoute); 

app.get('/', (req, res) => {
   
    res.json({ message: 'Welcome to the Weather API!' });
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Bugs in server');
});

app.listen(PORT, () => {
    console.log('server is listening')
})