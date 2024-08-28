import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import db from './db/conn.mjs'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1991;

app.get('/', (req,res) => {
    res.send(
        'Weather Sample'
    )
})
//testing//
app.listen(PORT, () => {
    console.log('server is listening')
})