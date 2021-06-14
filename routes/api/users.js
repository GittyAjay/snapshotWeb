const express = require('express');
const users = require('../../models/user');
const app = express();
const userRouter = express.Router();

userRouter.route('/getUser').get((req, res, next) => {
    const id = req.query.ID;
    users.findOne({ name: `${id}` }).then(_users => {
        console.log("user exist", _users);
        res.send(_users);
    }).catch(next);
})
userRouter.route('/postUser').post((req, res, next) => {
    console.log(req.body);
    users.create(req.body).then(_user => {
        console.log("user is created succesfully");
        res.send(_user);
    }).catch(next);
})

module.exports = userRouter;