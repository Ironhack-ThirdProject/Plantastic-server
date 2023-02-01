const express = require("express");
const { checkAdmin } = require("../middleware/jwt.middleware");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config.js");
const Order = require("../models/Order.model");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_KEY)

// POST : Payment
router.post("/checkout", (req, res, next) => {
  const { cart } = req.body
  
  stripe.checkout.sessions.create({
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
      success_url: `${process.env.ORIGIN}?success=true`,
      cancel_url: `${process.env.ORIGIN}?canceled=true`,
    })
    .then((checkoutSession) => {
      res.json({newUrl : checkoutSession.url})
    })
    .catch((error) => {
      res.status(500).json({error: error.message})
    })
    
});


// POST: UPLOAD an image
router.post("/upload", fileUploader.single("imageURL"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ imageURL: req.file.path });
});

router.get("/profile", isAuthenticated, (req, res, next) => {

});

router.get("/dashboard", isAuthenticated, checkAdmin, (req, res, next) => {

});

router.get("/checkout", isAuthenticated, (req, res, next) => {
  
});

module.exports = router;
