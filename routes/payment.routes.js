const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/success", isAuthenticated, (req, res, next) => {
  
});

router.get("/cancel", isAuthenticated, (req, res, next) => {
  
});

module.exports = router;