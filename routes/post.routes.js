const PostModel = require("../models/post.models.js");
const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller.js");

router.route("/").get(postController.readPost).post(postController.createPost);

router
  .route("/:id")
  .put(postController.updatePost)
  .delete(postController.deletePost);

router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

// comments
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
