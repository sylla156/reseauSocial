const mongoose = require("../config/db.js");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: [mongoose.Schema.Types.ObjectId],
    following: [mongoose.Schema.Types.ObjectId],
    likes: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  try {
    let errors = { errors: { email: "", password: "" } };
    const user = await this.findOne({ email });
    if (!user) return (errors.errors.email = "email not found");
    const auth = await bcrypt.compare(password, user.password);

    if (auth) return user;
    else return (errors.errors.password = " password not found");
  } catch (error) {
    console.log(error);
  }
};

const user = mongoose.model("users", userSchema);

module.exports = user;
