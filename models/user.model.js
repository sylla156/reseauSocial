const mongoose = require("../config/db.js");


const userSchema = new mongoose.Schema({
    pseudo: String,
    email: String,
    password: String
})


const user = mongoose.model('user', userSchema);


module.exports = user;