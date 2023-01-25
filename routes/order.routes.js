const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");
const Product = requrie("../models/Product.model.js")
const User = requrie("../models/User.model.js")

// GET my order
router.get("/", (req, res, next) => {
  Product.find()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

// CREATE an order
router.post("/", (req, res, next) => {
  const { firstName, lastName, shippingAddress, billingAddress } = req.body;

  User.find
  Product.findOne()
  Order.create({ firstName, lastName, shippingAddress, billingAddress })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(response);
      console.log(error);
    });
});
