// weatherday.mjs
import express from 'express';
import axios from 'axios';
import Weather from '../models/weatherday.mjs'; // Update path as needed
const router = express.Router();

const API_KEY = 'YH5hXE5XEWrZOADpUJASEA06gtoYsBj4';
const BASE_URL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

const getWeatherData = async (lat, lon) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                q: `${lat},${lon}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching weather data from AccuWeather API');
    }
};

router.post('/', async (req, res) => {
    const { lat, lon } = req.body;
    try {
        const weatherData = await getWeatherData(lat, lon);
        const newWeather = new Weather({
            city: weatherData.LocalizedName,
            currentTemp: weatherData.Temperature.Metric.Value,
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
        const weatherData = await getWeatherData(lat, lon);
        const updatedWeather = await Weather.findByIdAndUpdate(id, {
            city: weatherData.LocalizedName,
            currentTemp: weatherData.Temperature.Metric.Value,
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
