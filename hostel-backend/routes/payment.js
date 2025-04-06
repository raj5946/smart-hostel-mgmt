// routes/payment.js
const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const { verifyToken } = require("../middleware/authMiddleware");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// GET /outstanding
// Retrieves the outstanding fee for the authenticated user.
router.get("/outstanding", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // from the decoded token
    const paymentDoc = await Payment.findOne({ user: userId });
    if (!paymentDoc) {
      // If no record exists, return 0 outstanding
      return res.json({ outstandingAmount: 0 });
    }
    return res.json({ outstandingAmount: paymentDoc.outstandingFee });
  } catch (error) {
    console.error("Error fetching outstanding fees:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /create-order
// Creates a Razorpay order. Optionally supports partial payment via "amount" in the request body.
router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
    const userId = req.user.id;
    const paymentDoc = await Payment.findOne({ user: userId });
    if (!paymentDoc) {
      return res.status(400).json({
        success: false,
        message: "No payment record found for user",
      });
    }

    // Support partial payment if a valid amount is provided; otherwise, charge the full outstanding fee.
    let { amount } = req.body;
    const outstanding = paymentDoc.outstandingFee;
    if (!amount || amount > outstanding) {
      amount = outstanding;
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    // Create order options (amount converted to paise)
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      amountInINR: amount,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Order creation failed" });
  }
});

// POST /verify-signature
// Verifies the Razorpay payment signature and updates the Payment document accordingly.
router.post("/verify-signature", verifyToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amountPaid,
    } = req.body;
    const { RAZORPAY_KEY_SECRET } = process.env;

    // Compute the expected signature using order_id and payment_id.
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    // Payment is authentic; update the Payment document.
    const userId = req.user.id;
    let paymentDoc = await Payment.findOne({ user: userId });
    if (!paymentDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Payment record not found" });
    }

    // Determine the paid amount; if amountPaid is provided, use it; otherwise, assume full outstanding fee.
    const paidAmount =
      amountPaid && amountPaid > 0 ? amountPaid : paymentDoc.outstandingFee;

    // Deduct the paid amount from the outstanding fee, ensuring it does not go negative.
    paymentDoc.outstandingFee = Math.max(
      paymentDoc.outstandingFee - paidAmount,
      0
    );

    // Log the successful transaction in paymentHistory.
    paymentDoc.paymentHistory.push({
      amountPaid: paidAmount,
      date: new Date(),
      transactionId: razorpay_payment_id,
    });

    await paymentDoc.save();

    return res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Signature verification error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Signature verification failed" });
  }
});

// GET /history
// Retrieves the payment history for the authenticated user.
router.get("/history", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const paymentDoc = await Payment.findOne({ user: userId });
    if (!paymentDoc) {
      return res.json({ payments: [] });
    }
    return res.json({ payments: paymentDoc.paymentHistory });
  } catch (error) {
    console.error("Fetch history error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
