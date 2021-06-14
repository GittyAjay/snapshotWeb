const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json(); //for accepting a req body in json formate
const cors = require('cors');
const uri = "mongodb+srv://root:root@chitchatcluster.qufeg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    console.log("connected oooh..");
}).catch(err => {
    console.log("error", err);
})

const chatRouter = require('./routes/api/chats');
const userRouter = require('./routes/api/users');

const app = express();
app.use(cors());
//body parser middleware
app.use(bodyParser)

//router middleware
app.use('/api', userRouter)
app.use((err, req, res, next) => {
    res.status(422).send({
        error: err._message,
    })
})
app.use('/api', chatRouter)
//error handling
app.use((err, req, res, next) => {
    res.status(422).send({
        error: err._message,
    })
})

app.listen(process.env.PORT || 3000);
