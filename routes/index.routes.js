const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config.js");

// POST: UPLOAD an image
router.post("/upload", fileUploader.single("imageURL"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ imageURL: req.file.path });
});

module.exports = router;
