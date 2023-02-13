const express = require("express");
const { isAuthenticated, checkAdmin } = require("../middleware/jwt.middleware");
const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model")
const router = express.Router();
const Product = require("../models/Product.model");
const fileUploader = require("../config/cloudinary.config.js");

// GET all plants
router.get("/", (req, res, next) => {

  Product.find()
  .then(response => {
    res.json(response);  
  })
  .catch((error) => {
    console.log(error)
  })
});


// POST: CREATE a plant
router.post("/", isAuthenticated, checkAdmin, (req, res, next) => {
  // TODO image URL

  console.log("REQ.BODY === ", req.body)

  Product.create(req.body)
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

});

// GET a specific plant
router.get("/:productId", (req, res, next) => {
  const { productId } = req.params;

Product.findById(productId)
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});


// EDIT a specific plant
router.put("/:plantId", isAuthenticated, checkAdmin, (req, res, next) => {
  // TODO image URL
  const { plantId } = req.params;

  Product.findByIdAndUpdate(plantId, req.body, { new : true })
  .then((res) => {
    if (!res){
      return res.status(404).json({message : "Product not found"})
    } else {
      return Cart.updateMany({}, {$set : {"products.$.product" : res}})
    }
  })
  .then((res) => {
    res.json(res)
  })
  .catch((error) => {
    res.json(error)
  })
});

// DELETE a specific plant
router.delete("/:productId", isAuthenticated, checkAdmin, (req, res, next) => {
  const { productId } = req.params;

  Product.findByIdAndRemove(productId)
    .then((res) => {
      if (!res){
        return res.status(404).json({message : "Product not found"})
      } else {
        return Cart.updateMany({ status: false }, {$pull : {products: productId}})
      }
    })
    .then((res) => {
      res.json({message : "Product deleted and removed from orders"})
    })
    .catch((error) => res.json(error));
});



module.exports = router;
