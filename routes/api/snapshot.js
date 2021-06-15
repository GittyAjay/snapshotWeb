const router = require('express').Router();
const varify = require('../../varifyToken')
router.get('/home', varify, (req, res) => {
    res.send('home page')
})

module.exports = router;