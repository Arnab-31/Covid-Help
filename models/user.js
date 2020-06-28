var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    phone: Number
})
module.exports = mongoose.model("User",UserSchema);