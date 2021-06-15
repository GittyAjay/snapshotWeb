const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json(); //for accepting a req body in json formate
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    console.log("connected oooh..");
}).catch(err => {
    console.log("error", err);
})

const userRouter = require('./routes/api/users');
const homeRouter = require('./routes/api/snapshot');

const app = express();
app.use(cors());

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static('client/build'))
// }
//body parser middleware
app.use(express.json())//now express also come with json

//router middleware
app.use('/api/user', userRouter)
app.use(homeRouter);
app.use((err, req, res, next) => {
    res.status(422).send({
        error: err._message,
    })
})



app.listen(process.env.PORT || 3000);
