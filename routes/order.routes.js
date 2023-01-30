const express = require("express");
const { isAuthenticated, checkAdmin } = require("../middleware/jwt.middleware");
const router = express.Router();
const Order = require("../models/Order.model");
const Product = require("../models/Product.model.js");
const User = require("../models/User.model.js");

// // CREATE an order
// router.post("/", isAuthenticated, (req, res, next) => {
//   const { plantId } = req.body;
//   const userId = req.payload._id;

//   const newOrder = {
//     user: userId,
//     products: plantId,
//   };

//   let userOrder;

//   Order.create(newOrder)
//     .then((response) => {
//       userOrder = response;
//       console.log("This is the user order: ", userOrder);
//       return User.findByIdAndUpdate(
//         userId,
//         { $push: { orders: userOrder } },
//         { new: true }
//       );
//     })
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

// CREATE an order
router.post("/", isAuthenticated, (req, res, next) => {
  console.log("Trying to create offer and this is the request");
  console.log(req.body);
  const { plantId } = req.body;
  const { quantity } = req.body;
  const userId = req.payload._id;

  const newOrder = {
    user: userId,
    products: { productId: {plantId}, quantity: {quantity} }
  };
  console.log(newOrder);

  Order.find({ user: userId })
    .then((response) => {
      if (
        response.length === 0 ||
        response.every((order) => order.status === true)
      ) {
        console.log("creating new order..");
        Order.create(newOrder);
      } else {
        Order.findOneAndUpdate(
          { user: userId, status: false },
          { $push: { products: { productId: {plantId}, quantity: {quantity} } } },
          { new: true }
        );
      }
    })
    .then((response) => {
      console.log(response);
      res.json(response);
      console.log("ORDER CREATED");
    })
    .catch((error) => {
      console.log("There is an error in here");
      res.json(error);
    });
});

// GET all orders
router.get("/", isAuthenticated, (req, res, next) => {

  Order.find()
    .populate("products")
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

// GET my order
router.get("/:userId", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  Order.findOne({ user: userId, status: false })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});



// UPDATE my order
router.put("/:orderId", isAuthenticated, (req, res, next) => {
  const { firstName, lastName, shippingAddress, billingAddress, status } =
    req.body;
  const userId = req.payload._id;
  const { orderId } = req.params;

  Order.findOneAndUpdate({ user: userId }, req.body, { new: true })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

// DELETE products in the order
router.delete("/:orderId", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  let plantId = req.query.id;
  const { orderId } = req.params;

  Order.findOneAndUpdate(
    { user: userId },
    { $pull: { products: plantId } },
    { new: true }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
