const { response } = require("express");
const PostModel = require("../models/post.models.js");
const UserModel = require("../models/user.model.js");
const ObjectID = require("mongoose").Types.ObjectId;

const readPost = async (request, response) => {
  PostModel.find((error, docs) => {
    if (error) response.send(error);
    else response.send(docs);
  });
};

const createPost = (request, response) => {
  try {
    const data = request.body;
    const newPost = PostModel.create(data);
    response.send(data);
  } catch (error) {
    return response.status(500).send(error);
  }
};

const updatePost = (request, response) => {
  try {
    const id = request.params.id;
    const data = request.body;
    PostModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      (error, docs) => {
        if (error) response.status(500).send(error);
        else response.send(docs);
      }
    );
  } catch (error) {
    response.status(500).send(error);
  }
};

const deletePost = (request, response) => {
  try {
    const id = request.params.id;
    PostModel.deleteOne({ _id: id }, (error, docs) => {
      if (error) response.status(500).send(error);
      else response.send(docs);
    });
  } catch (error) {
    response.status(500).send(error);
  }
};

const likePost = async (request, response) => {
  if (!ObjectID.isValid(request.params.id))
    return response.send("ID unknown : " + request.params.id);
  const postId = request.params.id;
  const userId = request.body.id;

  try {
    const docs = [];
    let doc = undefined;
    doc = await PostModel.findByIdAndUpdate(postId, {
      $push: { likers: userId },
    });
    docs.push(doc);

    doc = await UserModel.findByIdAndUpdate(userId, {
      $push: { likes: postId },
    });

    docs.push(doc);
    response.send(docs);
  } catch (error) {
    response.send(error);
  }
};

const unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  const postId = req.params.id;
  const userId = req.body.id;
  try {
    const docs = [];
    let doc = undefined;
    doc = await PostModel.findByIdAndUpdate(postId, {
      $pull: { likers: userId },
    });
    docs.push(doc);

    doc = await UserModel.findByIdAndUpdate(userId, {
      $pull: { likes: postId },
    });

    docs.push(doc);
    res.send(docs);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

const editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
        
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commenterId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commenterId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = {
  readPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  editCommentPost,
  deleteCommentPost,
};
