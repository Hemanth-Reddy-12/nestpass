import mongoose from "mongoose";

/** @type {mongoose.Schema} */
const ticketSchema = new mongoose.Schema(
  {
    ticketCode: {
      type: String,
      required: [true, "Ticket code is required"],
      unique: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: [true, "Event ID is required"],
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookings",
      required: [true, "Booking ID is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User ID is required"],
    },
    seatNumber: {
      type: String,
    },
    qrCode: {
      type: String,
    },
  },
  { timestamps: true }
);

/** @type {mongoose.Model} */
const ticket = mongoose.model("tickets", ticketSchema);

export default ticket;
