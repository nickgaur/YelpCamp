const express = require("express");
const passport = require("passport");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const CatchAsync = require("../utils/CatchAsync");
const session = require("express-session");
const users = require("../controllers/users");

router
  .route("/register")
  .get(users.renderRegisterForm)
  .post(CatchAsync(users.postRegisterForm));

router
  .route("/login")
  .get(CatchAsync(users.renderLoginForm))
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.postLoginForm
  );

router.get("/logout", users.logout);

module.exports = router;
