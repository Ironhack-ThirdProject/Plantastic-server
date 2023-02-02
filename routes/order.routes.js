const express = require("express");
const { isAuthenticated, checkAdmin } = require("../middleware/jwt.middleware");
const router = express.Router();
const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model.js");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const bodyParser = require("body-parser");

router.post("/", (req, res) => {
  const checkoutSessionId = req.body.data.object.id;
  let order;

  Order.findOneAndUpdate(
    { checkoutSessionId: checkoutSessionId },
    { isPaid: true },
    { new: true }
  ).populate("user")
  // retrieve the password from the response?
    .then((updatedOrder) => {
      order = updatedOrder;
      const userId = order.user._id.toString();
      console.log("THIS IS USERID:::", userId)
      return Cart.deleteOne({ user: userId });
    })
    .then((deletedCart) => {
      const email = order.user.email
      const userFirstName = order.firstName;

      const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: process.env.SECRET_EMAIL,
          pass: process.env.SECRET_PASSWORD,
        },
      });
      return transporter.sendMail({
        from: `"Plantastic" <${process.env.SECRET_EMAIL}>`,
        to: email,
        subject: "If you see this email it means the payment is now dynamic :)!",
        text: `Dear ${userFirstName}, We hope this email finds you in good leaves! We just wanted to take a moment to thank you for choosing to shop with us at Plantastic! We are thrilled to have been a part of helping you bring some greenery into your life.
        We're pretty sure your plants are already thanking you for giving them such a loving new home.
        If you have any questions or concerns, don't hesitate to reach out. We're always here to help water the plants...err...your worries away!
        Stay green and happy growing!
        Best regards,
        The Plantastic Team.`,
        html: `<div><b>Dear ${userFirstName}</b>, <br />We hope this email finds you in good leaves! We just wanted to take a moment to thank you for choosing to shop with us at Plantastic! We are thrilled to have been a part of helping you bring some greenery into your life.<br />
        We're pretty sure your plants are already thanking you for giving them such a loving new home. </ br>
        If you have any questions or concerns, don't hesitate to reach out. We're always here to help water the plants...err...your worries away!<br />
        Stay green and happy growing!<br />
        Best regards,
        The Plantastic Team.</div>`,
      });
    })
    .then((info) => {
      console.log("message:", { info });
    })
    .catch((err) => {
      console.log(err);
    });
});


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
      console.log("----- this is the response from the ../order/userId");
      console.log(response);
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
