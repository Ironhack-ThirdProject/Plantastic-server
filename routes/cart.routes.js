const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const router = express.Router();

router.get("/", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  Cart.findOne({ user: userId })
    .populate("products.productId")
    .then((cart) => {
      res.json(cart);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  const { productId, quantity } = req.body;
  let productObject;

  Product.findById(productId)
    .then((product) => {
      if (product === null) {
        return res.status(400).send("Product not found.");
      } else if (product.stock === 0) {
        return res.status(400).send("The product is out of stock.");
      } else {
        productObject = product;
        // Decrease the stock of the product
        productObject.stock -= quantity;
        productObject.save();
        return Cart.findOne({ user: userId });
      }
    })
    .then((cart) => {
      if (cart) {
        // Check if product is already in the cart
        const productIndex = cart.products.findIndex(
          (p) => p.productId.toString() === productId
        );
        if (productIndex === -1) {
          let bill = quantity * productObject.price + cart.totalPrice;
          // If it isn't, add new product to the cart
          return Cart.findOneAndUpdate(
            { user: userId },
            { $push: { products: { productId, quantity } }, totalPrice: bill },
            { new: true }
          ).populate("products.productId");
        } else {
          // Else update the quantity of the existing product in the cart
          cart.products[productIndex].quantity += quantity;
          let bill = quantity * productObject.price + cart.totalPrice;
          return Cart.findOneAndUpdate(
            { user: userId },
            { products: cart.products, totalPrice: bill },
            { new: true }
          ).populate("products.productId");
        }
      } else if (cart === null) {
        // Else if the user doesn't have a cart
        let bill = quantity * productObject.price;
        return Cart.create({
          user: userId,
          products: [{ productId, quantity }],
          totalPrice: bill,
        });
      }
    })
    .then((updatedCart) => {
      return res.send({ updatedCart, productObject });
    })
    .catch((error) => {
      res.send(error);
    });
});

// DELETE products in the cart
router.delete("/", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  const productId = req.query.id;

  Cart.findOne({user: userId})
  .then(cart => {
    if (!cart) return res.status(404).send("Cart not found");
  
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId.toString());
    if (productIndex === -1) return res.status(404).send("Product not found in cart");
  
    const product = cart.products[productIndex];
    const updatedProduct = {
      productId: product.productId,
      quantity: product.quantity
    };
    Product.findByIdAndUpdate(productId, {$inc: {stock: product.quantity}}, {new: true})
    .then(originalProduct => {
      cart.products.splice(productIndex, 1);
      cart.totalPrice -= originalProduct.price * product.quantity;
      cart.save()
      .then(() => res.send(updatedProduct))
      .catch(err => res.status(500).send("Something went wrong"));
    })
    .catch(err => res.status(500).send("Something went wrong"));
  })
  .catch(err => res.status(500).send("Something went wrong"));

});

module.exports = router;
