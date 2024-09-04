import express from 'express';
import Weather from '../models/weatherday.mjs'; 
const router = express.Router();
import connectdb from '../db/conn.mjs';

connectdb();

router.post('/weatherday', async (req, res) => {
    const { lat, lon } = req.body;
    try {
        const weatherData = await Weather.getWeatherData(lat, lon);
        const newWeather = new Weather({
            city: weatherData.name,
            currentTemp: weatherData.main.temp,
            minTemp: weatherData.main.temp_min,
            maxTemp: weatherData.main.temp_max,
            lat,
            lon
        });
        await newWeather.save();
        res.status(201).json(newWeather);
    } catch (error) {
        console.error("Error creating weather data:", error);
        res.status(500).send({ error: error.message });
    }
});

router.get('/weatherday/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const weatherData = await Weather.findById(id);
        if (weatherData) {
            res.json(weatherData);
        } else {
            res.status(404).send({ error: "Weather data not found" });
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send({ error: error.message });
    }
});

router.put('/weatherday/:id', async (req, res) => {
    const { id } = req.params;
    const { lat, lon } = req.body;
    try {
        const weatherData = await Weather.getWeatherData(lat, lon);
        const updatedWeather = await Weather.findByIdAndUpdate(id, {
            city: weatherData.name,
            currentTemp: weatherData.main.temp,
            minTemp: weatherData.main.temp_min,
            maxTemp: weatherData.main.temp_max,
            lat,
            lon
        }, { new: true }); 
        if (updatedWeather) {
            res.json(updatedWeather);
        } else {
            res.status(404).send({ error: "Weather data not found" });
        }
    } catch (error) {
        console.error("Error updating weather data:", error);
        res.status(500).send({ error: error.message });
    }
});


router.delete('/weatherday/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedWeather = await Weather.findByIdAndDelete(id);
        if (deletedWeather) {
            res.json({ message: "Weather data deleted successfully" });
        } else {
            res.status(404).send({ error: "Weather data not found" });
        }
    } catch (error) {
        console.error("Error deleting weather data:", error);
        res.status(500).send({ error: error.message });
    }
});

export default router;
