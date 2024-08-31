import express from 'express';
const router = express.Router();
import db from '../db/conn.mjs';
import five from '../models/fiveday.mjs';




// Retrieve all fiveday entries
router.get('/', async (req, res) => {
    try {
        const foundfiveday = await five.find({});
        res.status(200).render('fiveday/index', { fiveday: foundfiveday });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// Render new fiveday form
router.get('/new', (req, res) => {
    res.render('fiveday/new');
});

// Delete a specific fiveday entry
router.delete('/:id', async (req, res) => {
    try {
        const deletedfive = await five.findByIdAndDelete(req.params.id);
        res.status(200).redirect('/fiveday');
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// Update a specific fiveday entry
router.put('/:id', async (req, res) => {
    req.body.weather = req.body.weather === 'on';

    try {
        const updatedfive = await five.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.redirect(`/fiveday/${req.params.id}`);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});


router.post('/', async (req, res) => {
    const { lat, lon } = req.body;

    try {
        const { city, currentTemp, minTemp, maxTemp } = await getCurrentfive(lat, lon);
        const createdfive = await five.create(req.body);

        
        res.status(200).redirect('/fiveday');
    } catch (e) {
        res.status(400).send({ error });
    }
});


router.get("/:id/edit", async (req, res) => {
    try {
        const foundfive = await five.findById(req.params.id);
        res.status(200).render('fiveday/edit', { five: foundfive });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const foundfive = await five.findById(req.params.id);
        res.render('fiveday/show', { five: foundfive });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});
export default router;