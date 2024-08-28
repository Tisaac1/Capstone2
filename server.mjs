import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.get('/', (req,res) => {
    res.send(
        'This is the root for my server'
    )
})

app.listen(PORT, () => {
    console.log('server is listening')
})