const mongoose = require("../config/db.js");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 55,
    unique: true,
    trimp: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minlength: 6,
  },
  picture: {
      type: String
  },
  bio: {
    type: String,
    max: 1024,
  },
  followers: [mongoose.Schema.Types.ObjectId],
  following: [mongoose.Schema.Types.ObjectId],
  likes: [mongoose.Schema.Types.ObjectId]
},{
    timestamps: true
});

userSchema.pre('save', async function(next) {
    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const user = mongoose.model("users", userSchema);

module.exports = user;
