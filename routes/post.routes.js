const PostModel = require("../models/post.models.js");
const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "../../client/src/uploads/posts");
  },
  filename: (req, file, cb) => {
    if (file !== null) {
      try {
        if (
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpeg" &&
          (file.size > 500000) 
        ){
          cb(null, Date.now() + file.originalname);
        }else {
          cb(null,null)
        }
          

      } catch (err) {
        console.log(err);
      }
    }
  },
});
const postStorage = multer({ storage: storage });

router.route("/").get(postController.readPost);
router.post("/", postStorage.single("picture"), postController.createPost);
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
