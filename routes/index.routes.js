const express = require("express");
const { isAuthenticated, checkAdmin } = require("../middleware/jwt.middleware");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config.js");
const Order = require("../models/Order.model");

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
