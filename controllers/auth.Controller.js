const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");
const utilsSign = require("../utils/errors.utils.js");

const signUp = async (request, response) => {
  const data = request.body;

  try {
    const user = UserModel.create(data, (error, docs) => {
      if (error) {
        const errors = utilsSign.signUpErrors(error);
        return response.send(errors);
      } else response.send(data);
    });
  } catch (err) {
    const errors = utilsSign.signUpErrors(error);
    response.status(400).send("ll");
  }
};

const createToken = (id) => {
  const CLE_SECRET = process.env.TOKEN_SECRET;
  return jwt.sign({ data: id }, CLE_SECRET, {
    expiresIn: "1h",
  });
};

const signIn = async (request, response) => {
  const data = request.body;

  try {
    const datas = await UserModel.login(data.email, data.password);
    if (datas.errors) response.send(errors);
    const id = datas._id;
    const token = createToken(id);
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    response.cookie("jwt", token, { httpOnly: true, maxAge });
    response.send(datas);
  } catch (error) {
    const errors = utilsSign.signInErrors(error);
    if (error) response.status(400).send(errors);
  }
};

const logout = async (request, response) => {
  response.cookie("jwt", "", { maxAge: 1 });
  response.send("suprimer avec success");
};

module.exports = { signUp, signIn, logout };
