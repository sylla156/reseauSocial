const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.Controller.js')

router.route("/register")
      .get((request, response) => {
          response.send('hello world')
      })
      .post(authController.signUp)


module.exports = router;