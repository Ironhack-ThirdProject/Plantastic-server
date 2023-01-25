const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");


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

// CREATE a plant
router.post("/", (req, res, next) => {
  // TODO image URL
  const {name, description, caringTips, price, stock, category, tag} = req.body

  Product.create({ name, description, caringTips, price, stock, category, tag })
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

});

// GET a specific plant
router.get("/:plantId", (req, res, next) => {
  const { plantId } = req.params;

Product.findById(plantId)
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});


// EDIT a specific plant
router.put("/:plantId", (req, res, next) => {
  // TODO image URL
  const { plantId } = req.params;

  Product.findByIdAndUpdate(plantId, req.body, { new : true })
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    res.json(error)
  })
});

// DELETE a specific plant
router.delete("/:plantId", (req, res, next) => {
  const { plantId } = req.params;

  Product.findByIdAndRemove(plantId)
    .then(() =>
      res.json({
        message: `Plant with id ${plantId} was successfully removed.`,
      })
    )
    .catch((error) => res.json(error));
});



module.exports = router;
