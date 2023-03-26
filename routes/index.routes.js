const express = require("express");
const { checkAdmin } = require("../middleware/jwt.middleware");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config.js");
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const templates = require("../templates/template");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_KEY)

// POST : Payment
router.post("/checkout", (req, res, next) => {
  const { cart, firstName, lastName, billingAddress, shippingAddress } = req.body
  const userId = cart.user
  let responseFromStripe;
  
  User.findById(userId)
  .then((user) => {
    return stripe.customers.create({
      email: user.email,
    })
  })
  .then((newStripeCustomer) => {
    return stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cart.products.map((product) => {
        let priceInCents = product.productId.price * 100
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.productId.name
            },
            unit_amount: priceInCents
          },
          quantity: product.quantity
        }
      }),
      customer: newStripeCustomer.id,
      success_url: `${process.env.ORIGIN}/payment/success`,
      cancel_url: `${process.env.ORIGIN}/payment/canceled`,
    })
  })
    .then((checkoutSession) => {
      responseFromStripe = checkoutSession
      return Order.create({
        user: cart.user,
        products: cart.products,
        totalPrice: cart.totalPrice,
        firstName: firstName,
        lastName: lastName,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        stripeCustomerId: responseFromStripe.customer,
        checkoutSessionId: responseFromStripe.id
      });
    })
    .then((orderCreated) => {
      res.json({newUrl : responseFromStripe.url})
    })
    .catch((error) => {
      res.status(500).json({error: error.message})
    })
});

router.post("/webhook", (req, res) => {
  const checkoutSessionId = req.body.data.object.id;
  let order;

  Order.findOneAndUpdate(
    { checkoutSessionId: checkoutSessionId },
    { isPaid: true },
    { new: true }
  ).populate("user")
    .then((updatedOrder) => {
      order = updatedOrder;
      const userId = order.user._id.toString();
      return Cart.deleteOne({ user: userId });
    })
    .then((deletedCart) => {
      const email = order.user.email;
      const userFirstName = order.firstName;

      const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: process.env.TRANSPORTER_EMAIL,
          pass: process.env.TRANSPORTER_PASSWORD,
        },
      });
      return transporter.sendMail({
        from: `"Plantastic" <${process.env.TRANSPORTER_EMAIL}>`,
        to: email,
        subject: "Thank you for your order!",
        text: `Dear ${userFirstName}, We hope this email finds you in good leaves! We just wanted to take a moment to thank you for choosing to shop with us at Plantastic! We are thrilled to have been a part of helping you bring some greenery into your life.
        We're pretty sure your plants are already thanking you for giving them such a loving new home.
        If you have any questions or concerns, don't hesitate to reach out. We're always here to help water the plants...err...your worries away!
        Stay green and happy growing!
        Best regards,
        The Plantastic Team.`,
        html: templates.templateExample(userFirstName),
      });
    })
    .then((info) => {
      console.log("message:", { info });
    })
    .catch((err) => {
      console.log(err);
    });
});



// POST: UPLOAD an image
router.post("/upload", fileUploader.single("imageURL"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ imageURL: req.file.path });
});

module.exports = router;

router.get("/", (req, res) => {
  res.json({message: "Everything's fine"})
})