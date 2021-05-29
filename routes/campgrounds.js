const express = require("express");
const router = express.Router();
const CatchAsync = require("../utils/CatchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campground");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

router
  .route("/")
  .get(CatchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    CatchAsync(campgrounds.createCampground)
  );

router.route("/new").get(isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(CatchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    validateCampground,
    CatchAsync(campgrounds.updateCampground)
  )

router
  .route("/:id/edit")
  .get(isLoggedIn, isAuthor, CatchAsync(campgrounds.renderEditForm));

router
  .route("/:id/delete")
  .delete(isLoggedIn, isAuthor, CatchAsync(campgrounds.deleteCampground));

module.exports = router;
