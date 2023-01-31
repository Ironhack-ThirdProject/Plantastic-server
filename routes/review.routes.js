const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const Review = require("../models/Review.model");

// GET all reviews of user
router.get("/:userId", (req, res, next) => {

});


// POST: CREATE a review
router.post("/", isAuthenticated, (req, res, next) => {
    const userId = req.payload._id;
    const newReview = {
        userId: userId,
        productId: req.body.props,
        rating: req.body.rating,
        text: req.body.text
    }
console.log("---- New Review ----");
    console.log(newReview)

console.log("New Review === ", newReview)

  Review.create(newReview)
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })


});

// GET a specific review
router.get("/:reviewId", (req, res, next) => {

});


// EDIT a specific review
router.put("/:reviewId", isAuthenticated, (req, res, next) => {

});

// DELETE a specific review
router.delete("/:reviewId", isAuthenticated, (req, res, next) => {
  
});



module.exports = router;
