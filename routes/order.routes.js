const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const Order = require("../models/Order.model");
const Product = require("../models/Product.model.js");
const User = require("../models/User.model.js");

// CREATE an order
router.post("/", isAuthenticated, (req, res, next) => {
  const { plantId } = req.body
  const userId = req.payload._id

const newOrder = {
  user: userId,
  products: plantId,
}

  Order.create(newOrder)
  .then((response) => {
    res.json(response)
    const newOrderId = response._id.toString()
    console.log(newOrderId)
  })
  .catch((error) => {
    res.json(error)
  })

});

// GET my order
router.get("/", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id

  Order.find({user: userId})
  .populate("products")
  .then((response) => {
    res.json(response)
  }).catch((error) => {
    res.json(error)
  });
});


// UPDATE my order
router.put("/", isAuthenticated, (req, res, next) => {
  console.log(req.body);
  const { firstName, lastName, shippingAddress, billingAddress } = req.body;
  const userId = req.payload._id;

  Order.findOneAndUpdate( { user: userId } , { firstName, lastName, shippingAddress, billingAddress },  {new: true})
  .then((response) => {
    console.log("THIS IS THE FINAL ORDER ====", response)
    res.json(response)
  }).catch((error) => {
    res.json(error)
  });
});





// GET checkout
router.get("/checkout", (req, res, next) => {
  

  // User.findById(userId)
  //   .then((response) => {
  //     res.json(response);
  //   })
  //   .catch((error) => {
  //     res.json(response);
  //     console.log(error);
  //   });
});

module.exports = router;