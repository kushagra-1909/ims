const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  Items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      quantityRequested: {
        type: Number,
        required: true,
        min: 1,
      },
      quantityApproved: {
        type: Number,
        default: 0,
      },
    },
  ],
  dateRequested: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
