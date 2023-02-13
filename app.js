// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");
const jwt = require("jsonwebtoken");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const plantsRoutes = require("./routes/plants.routes");
app.use("/plants", plantsRoutes);

const cartRoutes = require("./routes/cart.routes");
app.use("/cart", cartRoutes);

const orderRoutes = require("./routes/order.routes");
app.use("/order", orderRoutes);

const reviewRoutes = require("./routes/review.routes");
app.use("/reviews", reviewRoutes);

const paymentRoutes = require("./routes/payment.routes");
app.use("/payment", paymentRoutes);

app.use(async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ error: "Authorization token is missing" });
      }
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  });

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
