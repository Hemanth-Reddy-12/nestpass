import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookings",
      required: [true, "Booking ID is required"],
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: [true, "Event ID is requires"],
    },
    paymentIntentId: {
      type: String,
      required: [true, "Payment Intent ID is required"],
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 0,
    },
    transactionReference: {
      type: String,
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
    },
    // status like INITIATED , SUCCEEDED, FAILED
    status: {
      type: String,
      enum: ["INITIATED", "SUCCEEDED", "FAILED"],
      default: "INITIATED",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("payments", paymentSchema);

export default Payment;
