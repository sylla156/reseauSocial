const mongoose = require("mongoose");
const PASSWORD = 77273745;

mongoose
  .connect(
    "mongodb+srv://brahimcode:" +
      PASSWORD +
      "@firstcluster.kjg5i.mongodb.net/reseau"
  )
  .then(() => console.log("connected est true"))
  .catch((err) => console.log(err));

module.exports = mongoose;
