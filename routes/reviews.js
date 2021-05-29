const express = require("express");
const router = express.Router({ mergeParams: true });
const CatchAsync = require("../utils/CatchAsync");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const Review = require("../models/review");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviews = require('../controllers/reviews')


router.post(
  "/",
  isLoggedIn,
  validateReview,
  CatchAsync(reviews.postReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  CatchAsync(reviews.deleteReview)
);

module.exports = router;
