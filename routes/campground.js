const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const campgrounds = require("../controllers/campgrounds");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  // .post(upload.array("image"), (req, res) => {
  //   // res.send({ body: req.body, file: req.files });
  // });
  .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));
// router.get("/", catchAsync(campgrounds.index));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, upload.array("image"), validateCampground, isAuthor, catchAsync(campgrounds.updateCampground))
  .delete(isAuthor, isLoggedIn, catchAsync(campgrounds.deleteCampground));

//ORDER MATTER, IDs later!!

// router.post();

// router.get("/:id",);

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// router.put("/:id", isLoggedIn, validateCampground, isAuthor, catchAsync(campgrounds.updateCampground));
// router.get("/makecampground", async (req, res) => {
//   const camp = new Campground({ title: "My Backyard", description: "cheap camping" });
//   await camp.save();
//   res.send(camp);
// });

// router.delete("/:id");

module.exports = router;
