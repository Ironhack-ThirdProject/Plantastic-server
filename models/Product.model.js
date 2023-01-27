const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const productSchema = new Schema(
  {
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        trim: true,
    },
    caringTips: [{
        type: String,
        required: [true, "Caring Tips are required."],
        trim: true,
    }],
    imageURL: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/628/628283.png",    
        // required: [true, "Image is required."]
    },
    price: {
        type: Number,
        required: [true, "Price is required."]
    },
    stock: {
        type: Number,
        required: [true, "Stock is required."]
    },
    category: {
        type: String,
        enum: ["Indoor Plants", "Outdoor Plants", "Pet-Friendly", "Tropical"],
        required: [true, "Category is required."]
    },
    tag: {
        type: String,
        enum: ["Beginner-Friendly", "Green Thumb", "Gardening Guru"],
        required: [true, "Tag is required."]
    }
  }
);

const Product = model("Product", productSchema);

module.exports = Product;