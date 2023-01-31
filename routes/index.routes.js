const express = require("express");
const { checkAdmin } = require("../middleware/jwt.middleware");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config.js");
const Order = require("../models/Order.model");
const nodemailer = require("nodemailer");

// POST: UPLOAD an image
router.post("/upload", fileUploader.single("imageURL"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ imageURL: req.file.path });
});

// Send e-mail to the user after checkout
router.post('/send-email', isAuthenticated, (req, res, next) => {
  const {email} = req.payload
  const username = req.body.firstName

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.SECRET_EMAIL,
        pass: process.env.SECRET_PASSWORD
    }
});
  transporter.sendMail({
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
    The Plantastic Team.</div>`
  })
  .then(info => console.log('message:', {info}))
  .catch(error => console.log(error));
});

router.get("/profile", isAuthenticated, (req, res, next) => {

});

router.get("/dashboard", isAuthenticated, checkAdmin, (req, res, next) => {

});

router.get("/checkout", isAuthenticated, (req, res, next) => {
  
});

module.exports = router;
