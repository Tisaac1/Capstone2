import express from 'express';
const router = express.Router();
import db from '../db/conn.mjs';
import five from '../models/fiveday.mjs';




router.get('/', async (req, res) => {
    try {
        const foundfiveday = await five.find({});
        res.status(200).render('fiveday/index', { fiveday: foundfiveday})
 
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/new', (req, res) => {
    res.render('fiveday/new');

})


router.delete('/:id', async(req, res) => {
    try {
        const deletedfive = await five.findByIdAndDelete(req.params.id);
        console.log(deletedfive);
        res.status(200).redirect('/fiveday');
    
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
        const updatedfive = await five.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        console.log(updatedfive);
        res.redirect(`/fiveday/${req.params.id}`);
    
    } catch (e) {
        res.status(400).send(e);
    }
})


router.post('/', async(req, res) => {
    
    const { lat, lon } = req.body;
      const { city,currentTemp, minTemp, maxTemp } = await getCurrentfive(lat, lon);
      return res.json({
          city,
          currentTemp,
          minTemp,
          maxTemp,
        });
    console.log(req.body);

    try {
        const createdfive = await five.create(req.body);
        
        res.status(200).redirect('/fiveday');
      
    } catch(e) {
        res.status(400).send(e);
    }
})


router.get("/:id/edit", async(req, res) => {
    try {
        const foundfive = await five.findById(req.params.id);
      
        res.status(200).render('fiveday/edit', {five: foundfive});
  
    } catch(e) {
        res.status(400).send(e);
    }
})


router.get('/:id', async (req, res) => {
    try {
        const foundfive = await five.findById(req.params.id);
        res.render('fiveday/show', {five:foundfiveday});
         
    } catch (e) {
        res.status(400).send('err');
    }
})

export default router;