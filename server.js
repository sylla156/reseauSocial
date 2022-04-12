const express = require("express");
const process = require("process");
const userRoutes = require("./routes/user.routes.js");
const postRoutes = require('./routes/post.routes.js');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const middleware = require("./middleware/auth.middleware.js");

dotenv.config({ path: "./config/.env" });
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", userRoutes);
app.use('/api/post', postRoutes)
//jwt
app.get("*", middleware.checkUser);

app.listen(process.env.PORT, () => {
  console.log("server start");
});