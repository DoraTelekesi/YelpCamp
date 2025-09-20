const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users");

router.route("/register").get(users.renderRegister).post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);
// router.post("/register");

// router.get("/login", users.renderLogin);

// router.post("/login", storeReturnTo, passport.authenticate("local", );

router.get("/logout", users.logout);

module.exports = router;
