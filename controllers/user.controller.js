const UserModel = require("../models/user.model.js");
const ObjectID = require("mongoose").Types.ObjectId;

const getAllUsers = async (request, response) => {
  try {
    response.send(await UserModel.find({}));
  } catch (err) {
    response.status(200);
  }
};

const userInfo = async (request, response) => {
  const id = request.params.id;

  if (ObjectID.isValid(id)) {
    UserModel.findById(id, { password: 0 }, (error, docs) => {
      if (error) console.log(error + "id est peut etre inconnue");
      else response.send(docs);
    });
  }
};

const updateUser = async (request, response) => {
  const id = request.params.id;
  const data = request.body;
  if (!ObjectID.isValid(id)) return response.status(400).send("ID unknow");

  try {
    UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...data,
        },
      },
      (error, docs) => {
        if (error) return response.status(500).json(error);
        else response.send(docs);
      }
    );
  } catch {
    response
      .status(400)
      .send("error http://localhost:5000/api/user/6251b337c1b38065438176cb");
  }
};

const deleteUser = async (request, response) => {
  const id = request.params.id;
  if (!ObjectID.isValid(id)) return response.status(400).send("ID unknow");

  try {
    UserModel.remove({ _id: id }, (error, dosc) => {
      if (error) return response.status(500).json(error);
      else response.json({ message: "suprimer avec success" });
    });
  } catch {
    return response.status(500).json({ message: error });
  }
};

const follow = async (request, response) => {
  const id = request.params.id;
  const data = request.body;
  if (!ObjectID.isValid(id)) return response.status(400).send("ID unknow");

  try {
    let newData = await UserModel.findByIdAndUpdate(id, {
      $push: {
        following: data.idToFollow,
      },
    });

    // inverse up is for following down in for followers

    let otherNewData = await UserModel.findByIdAndUpdate(data.idToFollow, {
      $push: { followers: id },
    });

    const ALLDATA = { ...newData, ...otherNewData };
    response.status(200).send(ALLDATA);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
};

const unfollow = async (request, response) => {
  const id = request.params.id;
  if (!ObjectID.isValid(id)) return response.status(400).send("ID unknow");
};

module.exports = {
  getAllUsers,
  userInfo,
  updateUser,
  deleteUser,
  follow,
  unfollow,
};
