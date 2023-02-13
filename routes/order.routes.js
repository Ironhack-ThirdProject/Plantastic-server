const express = require("express");
const { isAuthenticated, checkAdmin } = require("../middleware/jwt.middleware");
const router = express.Router();
const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model.js");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const bodyParser = require("body-parser");
const templates = require("../templates/template");


// GET all orders
router.get("/", isAuthenticated, (req, res, next) => {
  Order.find()
    .populate("products.productId")
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

// GET my orders
router.get("/:userId", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  Order.find({ user: userId })
    .populate("products.productId")
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
