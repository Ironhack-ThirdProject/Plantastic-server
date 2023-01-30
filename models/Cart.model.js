const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity can not be less then 1."],
          default: 1,
        }
      },
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
