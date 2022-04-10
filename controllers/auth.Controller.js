const UserModel = require("../models/user.model.js");

const signUp = async (request, response) => {
  const data = request.body;

  try {
    const user = UserModel.create(data);
    response.send(data)
  } catch (err) {
    response.status(400);
  }
};

module.exports = { signUp };
