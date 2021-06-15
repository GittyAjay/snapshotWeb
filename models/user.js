var mongoose = require("mongoose");
var Schema = mongoose.Schema; //creating a schema

var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        max: 1024,
        min: 6
    }
});
const userModel = mongoose.model("User", UserSchema); //creating a model or document with model name and particular documents
module.exports = userModel; //exporting to use this 
