import express from 'express';
const router = express.Router();
import db from '../db/conn.mjs';
import Weather from '../models/weatherday.mjs';




router.get('/', async (req, res) => {
    try {
        const foundweatherday = await Weather.find({});
        res.status(200).render('weatherday/index', { weatherday: foundweatherday})
 
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/new', (req, res) => {
    res.render('weatherday/new');

})


router.delete('/:id', async(req, res) => {
    try {
        const deletedWeather = await Weather.findByIdAndDelete(req.params.id);
        console.log(deletedWeather);
        res.status(200).redirect('/weatherday');
    
    } catch (e) {
        res.status(400).send(e);
    }
})


router.put('/:id', async (req, res) => {
       
        if (req.body.readyToEat === 'on') {
            req.body.readyToEat = true;
        } else {
            req.body.readyToEat = false;
        }
 

    try {
        const updatedWeather = await Weather.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        console.log(updatedWeather);
        res.redirect(`/weatherday/${req.params.id}`);
    
    } catch (e) {
        res.status(400).send(e);
    }
})


router.post('/', async(req, res) => {
    
    const { lat, lon } = req.body;
      const { city,currentTemp, minTemp, maxTemp } = await getCurrentWeather(lat, lon);
      return res.json({
          city,
          currentTemp,
          minTemp,
          maxTemp,
        });
    console.log(req.body);

    try {
        const createdWeather = await Weather.create(req.body);
        
        res.status(200).redirect('/weatherday');
      
    } catch(e) {
        res.status(400).send(e);
    }
})


router.get("/:id/edit", async(req, res) => {
    try {
        const foundWeather = await Weather.findById(req.params.id);
      
        res.status(200).render('weatherday/edit', {Weather: foundWeather});
  
    } catch(e) {
        res.status(400).send(e);
    }
})


router.get('/:id', async (req, res) => {
    try {
        const foundWeather = await Weather.findById(req.params.id);
        res.render('weatherday/show', {Weather:foundweatherday});
         
    } catch (e) {
        res.status(400).send('err');
    }
})

export default router;