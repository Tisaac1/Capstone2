import mongoose from 'mongoose';
import dotenv from 'dotenv';

//my .env file did not transfer over
//PORT = 1991
//DATABASE_URI=mongodb://localhost:27017/weatherdb

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const connectdb = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); 
    }
};

export default connectdb;
