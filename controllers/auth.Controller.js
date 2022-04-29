const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");
const utilsSign = require("../utils/errors.utils.js");

const signUp = async (request, response) => {
  const data = request.body;

  try {
    if (data.email === undefined || data.pseudo ===undefined || data.password == undefined) {
      response.status(200).send({'errors':{
        'message': 'All fiels must be completed'
      }});
      return;
    }else {
      console.log(data);
      UserModel.create(data,(error,docs) => {
        if (error) {
          const errors = utilsSign.signUpErrors(error);
          response.send({'errors':errors});
        }else {
          response.send(docs);
        }
      });
    }
   
  } catch (err) {
   response.send({'errors':err});
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
    if (data.email === undefined || data.password === undefined) {
      response.status(200).send('email or password not foudn');
      return ;
    }
    const datas = await UserModel.login(data.email, data.password);
    if (datas.errors) response.send(errors);
    // const id = datas._id;
    // const token = createToken(id);
    // const maxAge = 3 * 24 * 60 * 60 * 1000;
    // response.cookie("jwt", token, { httpOnly: true, maxAge });
    response.send(datas);
  } catch (error) {
    const errors = utilsSign.signInErrors(error);
    console.log(error)
    if (error) response.status(400).send(errors);
  }
};

const logout = async (request, response) => {
  response.cookie("jwt", "", { maxAge: 1 });
  response.send("suprimer avec success");
};

module.exports = { signUp, signIn, logout };
