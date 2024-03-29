const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
        {
          productId: {
            type: Object,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity can not be less then 1."],
            default: 1,
          },
        },
      ],
      totalPrice: {
          type: Number,
          required: true,
          default: 0
      },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    shippingAddress: { 
        type: String,
        required: false
    },
    billingAddress: {
      type: String,
      required: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    stripeCustomerId: String,
    checkoutSessionId: String
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
