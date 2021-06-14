const chats = require('../../models/chat');
const express = require('express');

const router = express.Router();

router.route('/send').post((req, res, next) => {
    chats.create(req.body).then(datas => {
        res.send(datas);
    }).catch(next);
})
router.route('/get').get((req, res, next) => {
    chats.find({}).then(datas => { //it will return all object inside chats document {}
        res.send(datas);
    }).catch(next);
})
module.exports = router;