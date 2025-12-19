import crypto from "crypto";
import paymentSchema from "../models/paymentSchema.js";
import bookingSchema from "../models/bookingSchema.js";

export const razorpayPaymentValidator = async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex");

    // Compare signatures
    const isValid = generatedSignature === razorpaySignature;
    if (!isValid) {
      return res.json({
        status: 400,
        message: "Payment verification failed - Invalid signature",
      });
    }

    const payment = await paymentSchema.findOne({
      paymentIntentId: razorpayOrderId,
    });

    if (!payment) {
      return res.json({
        status: 404,
        message: "payment record not found",
      });
    }

    payment.status = "SUCCEEDED";
    payment.transactionReference = razorpayPaymentId;
    payment.save();

    await bookingSchema.findByIdAndUpdate(payment.bookingId, {
      status: "confirmed",
      paymentStatus: "paid",
    });

    res.json({
      status: 200,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Error verifing payment",
      error: error.message,
    });
  }
};
