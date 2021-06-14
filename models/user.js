var mongoose = require("mongoose");
var Schema = mongoose.Schema; //creating a schema
var UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "user name is compulsory"]
    }
});
const userModel = mongoose.model("User", UserSchema); //creating a model or document with model name and particular documents
module.exports = userModel; //exporting to use this 
