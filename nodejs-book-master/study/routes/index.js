const express = require('express');
const Room = require('../schemas/Room');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.color);
    res.render('index');
});

router.get('/room', async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.render('room', {rooms, title: 'ROOMS'});
    } catch (err) {
        console.log(err);
    }
});

router.post('/room', async (req, res) => {
    try {
        const newRoom =
            await Room.create({
                title: req.body.title,
                max: req.body.max,
                owner: req.session.color,
                password: req.body.password,
            });
        const io = req.app.get('io');
        io.of('/room').emit('newRoom', newRoom);
    } catch (err) {
        console.log(err);
    }
})

router.get('/chat/:roomId', async (req, res) => {
    try {
        res.render('chat');
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
