const express = require("express");
const { checkAdmin } = require("../middleware/jwt.middleware");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config.js");
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_KEY)

// POST : Payment
router.post("/checkout", (req, res, next) => {
  const { cart, firstName, lastName, billingAddress, shippingAddress } = req.body
  const userId = cart.user
  console.log(userId)
  let responseFromStripe;
  
  User.findById(userId)
  .then((user) => {
    return stripe.customers.create({
      email: user.email,
    })
  })
  .then((newStripeCustomer) => {
    console.log("This is a stripe customer:", newStripeCustomer)
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
      success_url: `${process.env.ORIGIN}?success=true`,
      cancel_url: `${process.env.ORIGIN}?canceled=true`,
    })
  })
    .then((checkoutSession) => {
      responseFromStripe = checkoutSession
      console.log("THIS IS THE RESPONSE FROM STRIPE*******:", responseFromStripe)
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
      console.log("AN ORDER HAS BEEN CREATED!", orderCreated)
      res.json({newUrl : responseFromStripe.url})
    })
    .catch((error) => {
      res.status(500).json({error: error.message})
    })
});


// // POST : Payment
// router.post("/checkout", (req, res, next) => {
//   const { cart } = req.body
//   console.log("THIS IS THE CART ====", cart)
//   let responseFromStripe;
  
//   stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: cart.products.map((product) => {
//         let priceInCents = product.productId.price * 100
//         return {
//           price_data: {
//             currency: 'eur',
//             product_data: {
//               name: product.productId.name
//             },
//             unit_amount: priceInCents
//           },
//           quantity: product.quantity
//         }
//       }),
//       success_url: `${process.env.ORIGIN}?success=true`,
//       cancel_url: `${process.env.ORIGIN}?canceled=true`,
//     })
//     .then((checkoutSession) => {
//       responseFromStripe = checkoutSession
//       res.json({newUrl : checkoutSession.url})
//     })
//     .catch((error) => {
//       res.status(500).json({error: error.message})
//     })
// });


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
