const express = require('express');
const { getMaxListeners } = require('../../models/user');
const users = require('../../models/user');
const app = express();
const userRouter = express.Router();
const { registerUserValidation, loginValidation } = require('../../validation');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
var jwt = require('jsonwebtoken');

userRouter.post('/register', async (req, response, next) => {
    try {
        await registerUserValidation.validateAsync(req.body);
        await users.findOne({ email: req.body.email }, async (err, res) => {
            console.log(res);
            if (res) {
                return response.status(400).send("email or password does'not exit");
            }
            else {

                //Hashing(password encrypting)
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.body.password, salt);
                const user = new users({
                    name: req.body.name,
                    password: hashPassword,
                    email: req.body.email
                })
                const savedUser = await user.save();

                //create and asign a token
                const token = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET);
                response.header('auth-token', token).send({
                    token: token,
                    payload: savedUser
                });
            }
        });
    }
    catch (err) {
        response.status(400).send(err.details[0].message);
    }

})

userRouter.post('/login', async (req, response, next) => {
    try {
        await loginValidation.validateAsync(req.body);
        await users.findOne({ email: req.body.email }, async (err, res) => {
            if (!res) {
                return response.status(400).send("email or password does'not exit");
            }

            //descryption
            const validPass = await bcrypt.compare(req.body.password, res.password);
            if (!validPass) response.status(400).send("Invalid password");

            //create and asign a token
            const token = jwt.sign({ id: res._id }, process.env.TOKEN_SECRET);
            response.header('auth-token', token).send({
                token: token,
                payload: res
            });
        });
    }
    catch (err) {
        response.status(400).send(err.details[0].message);
    }
})

module.exports = userRouter;