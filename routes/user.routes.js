const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.Controller.js");
const userController = require("../controllers/user.controller.js");

router
  .route("/register")
  .get(userController.getAllUsers)
  .post(authController.signUp);

router
  .route("/:id")
  .get(userController.userInfo)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/follow/:id").patch(userController.follow);

router.route("/unfollow/:id").patch(userController.unfollow);

module.exports = router;
