const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.Controller.js");
const userController = require("../controllers/user.controller.js");
const uploadController = require('../controllers/upload.controller.js');

const multer = require("multer");
const { exists } = require("../models/post.models.js");
const { response } = require("express");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "../../client/public/uploads/profil");
  },
  filename: (req, file, cb) => {
    if (file !== null) {
      try {
        if (
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpeg" 
        ){
          cb(null, Date.now() + file.originalname);
        }else {
         throw new Error('le fichier ne correspond pas')
        }
          

      } catch (err) {
        
      }
    }
  },
  onError : function(err, next) {
   response.send(err)
    next(err);
  }
});
const userStorage = multer({ storage: storage });

router
  .route("/register")
  .get(userController.getAllUsers)
  .post(authController.signUp);

router.get('/', userController.getAllUsers);


router.route("/login").post(authController.signIn);

router.route("/logout").post(authController.logout);

router
  .route("/:id")
  .get(userController.userInfo)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/follow/:id").patch(userController.follow);

router.route("/unfollow/:id").patch(userController.unfollow);


// upload
router.post("/upload", userStorage.single("picture"), uploadController.uploadProfil);

module.exports = router;
