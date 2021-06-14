var mongoose = require("mongoose");
var Schema = mongoose.Schema; //creating a schema
var ChatSchema = new Schema({
    msg: {
        type: String,
        required: [true, "Send Message is compulsory"]
    },
    id: {
        type: String,
        required: [true, "Send id is compulsory"]
    }
});
const Chatmodel = mongoose.model("Chats", ChatSchema); //creating a model or document with model name and particular documents
module.exports = Chatmodel; //exporting to use this 
