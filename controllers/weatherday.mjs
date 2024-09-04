import express from 'express';
import Weather from '../models/weatherday.mjs'; 

const router = express.Router();

router.post('/:id/weatherday', async (req, res) => {
    const { lat, lon } = req.body;
    try {
        const weatherData = await Weather.getWeatherData(lat, lon);
        res.json({
            city: weatherData.name,
            currentTemp: weatherData.main.temp,
            minTemp: weatherData.main.temp_min,
            maxTemp: weatherData.main.temp_max
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send({ error: error.message });
    }
});

// router.post('/weatherMongo', async (req, res) => {
//     const { lat, lon } = req.body;
//     try {
//         const weatherData = await Weather.getWeatherData(lat, lon);
//         await Weather.saveWeatherDataToMongo(lat, weatherData);
//         res.json({
//             city: weatherData.name,
//             currentTemp: weatherData.main.temp,
//             minTemp: weatherData.main.temp_min,
//             maxTemp: weatherData.main.temp_max
//         });
//     } catch (error) {
//         console.error("Error processing weather data:", error);
//         res.status(500).send({ error: error.message });
//     }
// });

router.get('/', async (req, res) => {
    const zipCode = req.query.id;
    try {
        const weatherData = await Weather.findById(zipCode);
        res.json(weatherData);
    } catch (error) {
        console.error("Error fetching weather data from MongoDB:", error);
        res.status(500).send({ error: error.message });
    }
});

export default router;
