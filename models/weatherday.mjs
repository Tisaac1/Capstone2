import mongoose from 'mongoose';
import axios from 'axios';

const weatherSchema = new mongoose.Schema({
    zip: Number,
    coord: {
        lon: Number,
        lat: Number
    },
    weather: [
        {
            id: Number,
            main: String,
            description: String,
            icon: String
        }
    ],
    base: String,
    main: {
        temp: Number,
        feels_like: Number,
        temp_min: Number,
        temp_max: Number,
        pressure: Number,
        humidity: Number
    },
    visibility: Number,
    wind: {
        speed: Number,
        deg: Number
    },
    clouds: {
        all: Number
    },
    dt: Number,
    sys: {
        type: { type: Number },
        id: Number,
        message: Number,
        country: String,
        sunrise: Date,
        sunset: Date
    },
    timezone: Number,
    id: Number,
    name: String,
    cod: Number,
    date: {
        type: Date,
        default: Date.now,
    },
});


weatherSchema.statics.getWeatherData = async function(zipCode, tempMetric) {
    try {
        
        const response = await axios.get(`http://localhost:1991`)
        
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching weather data: ${error.message}`);
    }
};


weatherSchema.statics.saveWeatherDataToMongo = async function(zipCode, weatherData) {
    try {
      
        const existingWeather = await this.findOne({ zip: zipCode });
        if (existingWeather) {
           
            Object.assign(existingWeather, weatherData);
            await existingWeather.save();
        } else {
          
            const newWeather = new this(weatherData);
            await newWeather.save();
        }
    } catch (error) {
        throw new Error(`Error saving weather data to MongoDB: ${error.message}`);
    }
};

weatherSchema.statics.getWeatherDataFromMongo = async function(zipCode) {
    try {
        const weather = await this.findOne({ zip: zipCode });
        if (!weather) throw new Error('Weather data not found');
        return weather;
    } catch (error) {
        throw new Error(`Error fetching weather data from MongoDB: ${error.message}`);
    }
};

const weatherModel = mongoose.model('weatherday', weatherSchema);

export default weatherModel;
