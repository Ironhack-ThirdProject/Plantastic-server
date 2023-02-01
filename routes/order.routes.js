const express = require("express");
const { isAuthenticated, checkAdmin } = require("../middleware/jwt.middleware");
const router = express.Router();
const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model.js");
const nodemailer = require("nodemailer");

// CREATE an order
router.post("/", (req, res, next) => {

  console.log(" ..... :) .....")
  console.log(req.body)
  console.log(" ..... :) .....")

  const userId = "63d6f6f3290fda9350054724";
  let createdOrder;
  const email = "laura.baehrs@googlemail.com";
  const username = "Laura";

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.SECRET_EMAIL,
      pass: process.env.SECRET_PASSWORD,
    },
  });

  Cart.findOne({ user: userId })
    .populate("products.productId")
    .then((cart) => {
      console.log("Cart found!: ", cart.products);
      return Order.create({
        user: userId,
        products: cart.products,
        totalPrice: cart.totalPrice,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        shippingAddress: req.body.shippingAddress,
        billingAddress: req.body.shippingAddress,
      });
    })
    .then((orderResponse) => {
      createdOrder = orderResponse
      console.log("THIS IS THE CREATED ORDER:::::", createdOrder);
      return Cart.deleteOne({ user: userId });
    })
    .then(() => {
      return transporter.sendMail({
        from: `"Plantastic" <${process.env.SECRET_EMAIL}>`,
        to: email,
        subject: "Thank you for your order!",
        text: `Dear ${username}, We hope this email finds you in good leaves! We just wanted to take a moment to thank you for choosing to shop with us at Plantastic! We are thrilled to have been a part of helping you bring some greenery into your life.
        We're pretty sure your plants are already thanking you for giving them such a loving new home.
        If you have any questions or concerns, don't hesitate to reach out. We're always here to help water the plants...err...your worries away!
        Stay green and happy growing!
        Best regards,
        The Plantastic Team.`,
        html: `<div><b>Dear ${username}</b>, <br />We hope this email finds you in good leaves! We just wanted to take a moment to thank you for choosing to shop with us at Plantastic! We are thrilled to have been a part of helping you bring some greenery into your life.<br />
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
    .then(() => {
      console.log("*****HERE IS THE NEW ORDER CREATED*****: ", createdOrder)
      res.json(createdOrder)
    })
    .catch((error) => {
      console.log("There is an error in here: ", error);
      res.json(error);
    });
});

/*const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, 'YOUR_WEBHOOK_SECRET');
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Retrieve the user's cart and create an order
    const cart = await Cart.findOne({ user: session.client_reference_id });
    const order = await Order.create({
      user: session.client_reference_id,
      products: cart.products,
      totalPrice: session.display_items[0].amount / 100,
      firstName: session.billing_address.name,
      lastName: '',
      shippingAddress: session.shipping_address.line1,
      billingAddress: session.billing_address.line1
    });

    // Delete the user's cart
    await Cart.deleteOne({ user: session.client_reference_id });
  }

  res.json({ received: true });
});*/

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
