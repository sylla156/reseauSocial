const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {

  try {
    const docs = await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set : {picture: req.file.filename}},
      { new: true});
      res.send(docs)

  } catch (error) {
    return res.status(500).send(error);
  }
};
