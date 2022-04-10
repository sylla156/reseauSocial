const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");

const checkUser = async (request, response, next) => {
  const token = request.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        response.locals.user = null;
        response.cookie("jwt", "", { maxAge: 1 });
        response.send("error");
        next();
      } else {
        let user = await UserModel.findById(decodedToken.data);
        response.locals.user = user;
        response.send(user);
        next();
      }
    });
  } else {
    response.locals.user = null;
    response.send("token undefined");
    next();
  }
};

// const requireAuth = async (request, response, next) => {
//     const token = reques.cookies.jwt;
//     if (token) {

//     }
// }

module.exports = { checkUser };
