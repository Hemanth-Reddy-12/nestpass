import { generateBookingCode } from "../middleware/jwt.middleware.js";
import eventSchema from "../models/eventSchema.js";
import bookingSchema from "../models/bookingSchema.js";
import userSchema from "../models/userSchema.js";
import { getUsername } from "../middleware/jwt.middleware.js";
import paymentSchema from "../models/paymentSchema.js";
import createRazorpay from "../config/razorpay.js";

export const createBooking = async (req, res) => {
  try {
    const { eventId, numberOfTickets } = req.body;

    const username = getUsername(req);
    const user = await userSchema.findOne({ username: username });
    const userId = user._id;

    // check the event is exists

    const event = await eventSchema.findOne({ _id: eventId });

    if (!event) {
      return res.status(404).json({
        status: 404,
        message: "Event not found",
      });
    }

    // check tickets availability
    if (event.availableTickets < numberOfTickets) {
      return res.status(400).json({
        status: 400,
        message: "Not enough tickets available",
      });
    }

    // event date validation

    if (new Date() > event.registerationDeadline) {
      return res.status(400).json({
        status: 400,
        message: "Cannot book tickets for past events",
      });
    }

    // calculate the amount
    const totalAmount = event.ticketPrice * numberOfTickets;

    // create booking
    const booking = await bookingSchema.create({
      bookingCode: generateBookingCode(),
      eventId: eventId,
      userId: userId,
      numberOfTickets: numberOfTickets,
      amount: totalAmount,
      status: "pending",
      paymentStatus: "unpaid",
    });

    // reserve tickets
    await eventSchema.findByIdAndUpdate(eventId, {
      $inc: { availableTickets: -numberOfTickets },
    });

    const paymentIntent = await createRazorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: booking.bookingCode,
      notes: {
        bookingId: booking._id,
        eventId: event._id,
      },
    });

    await paymentSchema.create({
      bookingId: booking._id,
      eventId: eventId,
      paymentIntentId: paymentIntent.id,
      amount: totalAmount,
      currency: paymentIntent.currency,
    });

    res.json({
      status: 201,
      message: "Booking created successfully",
      data: {
        booking,
        paymentIntent,
      },
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Server Error",
      error: error,
    });
  }
};
