// models/Payment.js
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Adjust to your actual User model name
    required: true,
  },
  outstandingFee: {
    type: Number,
    default: 0,
  },
  paymentHistory: [
    {
      amountPaid: { type: Number, default: 0 },
      date: { type: Date, default: Date.now },
      transactionId: { type: String },
    },
  ],
});

module.exports = mongoose.model("Payment", PaymentSchema);
