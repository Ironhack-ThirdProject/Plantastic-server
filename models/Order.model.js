const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: "Product",
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    totalPrice: { 
        type: Number,
        required: true
    },
    shippingAddress: { 
        type: String,
        required: true
    },
    billingAddress: { 
        type: String,
        required: true
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
