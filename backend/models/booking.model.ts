import mongoose from "mongoose";

/** @type {mongoose.Schema} */
const bookingSchema = new mongoose.Schema(
  {
    bookingCode: {
      type: String,
      required: [true, "Booking code is required"],
      unique: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: [true, "Event ID is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User ID is required"],
    },
    numberOfTickets: {
      type: Number,
      required: [true, "Number of tickets is required"],
      min: 1,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 0,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "pending"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "refunded"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

/** @type {mongoose.Model} */
const booking = mongoose.model("bookings", bookingSchema);

export default booking;
