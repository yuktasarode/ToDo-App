const express = require('express');
const router = express.Router();

const AuthorizationController = require("./controllers/AuthorizationController.js");
router.post(
  "/signup",
  AuthorizationController.signup
);
router.post(
  "/login",
  AuthorizationController.login
);

router.get(
  "/home",
  AuthorizationController.home
);

  module.exports = router;
