const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    Items: {
      type: [
        {
          itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "placed", "rejected"],
      default: "pending",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supplierEmail: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
