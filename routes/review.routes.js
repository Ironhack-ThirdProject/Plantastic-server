const express = require("express");
const { isAuthenticated, checkCreator } = require("../middleware/jwt.middleware");
const router = express.Router();
const Review = require("../models/Review.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");

// GET all reviews of one user
//reviews/user/287349518375845937
router.get("/user/:userId", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  console.log(userId);
  Review.find({ userId })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});
// GET all reviews of one product
//reviews/product/485979320948652ß9385
router.get("/product/:productId", isAuthenticated, (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId);
  
  Review.find({ productId })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

// POST: CREATE a review
router.post("/", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  const newReview = {
    userId: userId,
    productId: req.body.props,
    rating: req.body.rating,
    text: req.body.text,
  };
  console.log("---- New Review ----");
  console.log(newReview);

  console.log("New Review === ", newReview);

  Review.create(newReview)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

// EDIT a specific review
router.put("/:reviewId", isAuthenticated, (req, res, next) => {
  const { reviewId } = req.params;
  console.log("We are in the put request");

  Review.findByIdAndUpdate(reviewId, req.body, { new : true })
  .then((res) => {
    if (!res){
      return res.status(404).json({message : "Review not found"})
    } else {
      res.json(res);
    }
  })
  .catch((error) => {
    res.json(error)
  })
});

// DELETE a specific review
router.delete("/:reviewId", isAuthenticated, (req, res, next) => {
  const { reviewId } = req.params;

  Review.findByIdAndRemove(reviewId)
    .then((res) => {
      if (!res) {
        return res.status(404).json({ message: "Review not found" });
      } else {
        console.log("we are deleting..");
        console.log(res);
        User.updateMany({ $pull: { reviews: reviewId } });
        Product.updateMany({ $pull: { reviews: reviewId } });
      }
    })
    .then((res) => {
      res.json({ message: "Review deleted and removed from users and products" });
    })
    .catch((error) => res.json(error));
});

module.exports = router;
