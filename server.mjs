import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import db from './db/conn.mjs';
import bodyParser from 'body-parser';
import jsxViewEngine from 'jsx-view-engine';

import weatherRoute from './controllers/weatherday.mjs';
import fiveRoute from './controllers/fiveday.mjs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1991;
const apikey = 'YH5hXE5XEWrZOADpUJASEA06gtoYsBj4'

app.use(bodyParser.json()); // Ensure you use body-parser middleware if handling JSON payloads

// Route handlers
app.use('/weather', weatherRoute); // Mount weather routes
app.use('/five-day', fiveRoute);   // Mount five-day routes

app.get('/', (req, res) => {
    // Handle GET request logic here
    res.json({ message: 'Welcome to the Weather API!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log('server is listening')
})