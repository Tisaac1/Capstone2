import express from 'express';
const router = express.Router();
import db from '../db/conn.mjs';
import Weather from '../models/weatherday.mjs';




router.get('/frontend/src/pages/WelcomePage', async (req, res) => {
    try {
        const foundWeatherday = await Weather.find({});
        res.status(200).render('weatherday/index', { weatherday: foundWeatherday });
    } catch (e) {
        res.status(400).send({ error });
    }
});


router.get('/frontend/src/pages/Fiveday', (req, res) => {
    res.render('/frontend/src/pages/Fiveday');
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedWeather = await Weather.findByIdAndDelete(req.params.id);
        res.status(200).redirect('/weatherday');
    } catch (e) {
        res.status(400).send({ error });
    }
});


router.put('/', async (req, res) => {
    req.body.weather = req.body.weather === 'on';

    try {
        const updatedWeather = await Weather.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.redirect(`/weatherday/${req.params.id}`);
    } catch (e) {
        res.status(400).send({ error });
    }
});


router.post('/', async (req, res) => {
    const { lat, lon } = req.body;

    try {
        const { city, currentTemp, minTemp, maxTemp } = await getCurrentWeather(lat, lon);
   

      
        res.status(200).json({
            city,
            currentTemp,
            minTemp,
            maxTemp
        });
    } catch (e) {
        res.status(400).send({ error });
    }
});


router.get("/", async (req, res) => {
    try {
        const foundWeather = await Weather.findById(req.params.id);
        res.status(200).render('localhost:1991/Fiveday', { Weather: foundWeather });
    } catch (e) {
        res.status(400).send({ error });
    }
});


router.get('/', async (req, res) => {
    try {
        const foundWeather = await Weather.findById(req.params.id);
        res.render('weatherday/show', { Weather: foundWeather });
    } catch (e) {
        res.status(400).send({ error });
    }
});

export default router;

