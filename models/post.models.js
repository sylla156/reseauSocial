const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    posterId: {
      type: mongoose.Types.ObjectId,
    },

    message: {
      type: String,
    },

    picture: {
      type: String,
    },

    video: {
      type: String,
    },

    likers: {
      type: [String],
    },

    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
    },
  },
  {
    timestamp: true,
  }
);

const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel;
