import { Request, Response } from "express";
import { generateBookingCode } from "../middleware/jwt.middleware.js";
import eventSchema from "../models/event.model.js";
import bookingSchema from "../models/booking.model.js";
import userSchema from "../models/user.model.js";
import { getLoggedUser } from "../middleware/jwt.middleware.js";
import paymentSchema from "../models/payment.model.js";
import createRazorpay from "../config/razorpay.js";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { eventId, numberOfTickets } = req.body;

    const loggedUser = getLoggedUser(req);
    const userId = loggedUser._id;

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
        bookingId: booking._id as any,
        eventId: event._id as any,
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

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const loggedUser = getLoggedUser(req);
    const myBookings = await bookingSchema.find({ userId: loggedUser._id });
    if (!myBookings) {
      return res.json({
        status: 404,
        message: "No Booking Events avaliable",
      });
    }
    res.json({
      status: 200,
      message: "Bookings retrive successfully",
      data: { myBookings },
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Server Error",
      error: error,
    });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const loggedUser = getLoggedUser(req);
    const order = await bookingSchema.findById(orderId);

    if (!order) {
      return res.json({
        status: 404,
        message: "order not found",
      });
    }

    if (order.userId != loggedUser._id) {
      return res.json({
        status: 400,
        message: "Booking not under this account",
      });
    }

    if (!order) {
      return res.json({
        status: 404,
        message: "order is not found",
      });
    }
    res.json({
      status: 200,
      message: "order retrive successfully",
      data: order,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Server Error",
      error: error,
    });
  }
};

export const getAllBooking = async (req: Request, res: Response) => {
  try {
    const allBookings = await bookingSchema.find();
    res.json({
      status: 200,
      message: "fetch all booking successfully",
      data: allBookings,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error get all booking",
    });
  }
};
