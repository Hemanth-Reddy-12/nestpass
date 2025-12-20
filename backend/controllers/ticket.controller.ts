import { Request, Response } from "express";
import paymentSchema from "../models/payment.model";
import bookingSchema from "../models/booking.model";
import ticketSchema from "../models/Ticket.model";
import {
  generateBookingCode,
  generateTicketCode,
} from "../middleware/jwt.middleware";

export const generateTicket = async (req: Request, res: Response) => {
  try {
    console.log("generate Ticket");

    const { razorpayOrderId } = req.body;
    const payment = await paymentSchema.findOne({
      paymentIntentId: razorpayOrderId,
    });
    const booking = await bookingSchema.findById(payment?.bookingId);

    if (!payment || !booking || !payment.transactionReference) {
      return res.json({
        status: 400,
        message: "Invalid payment or booking data",
      });
    }

    const avaliableTicket = await ticketSchema.find({
      transactionReference: payment.transactionReference,
    });
    if (avaliableTicket.length > 0) {
      return res.json({
        status: 200,
        message: "Ticket is already generated",
        data: {
          booking,
          payment,
          avaliableTicket,
        },
      });
    }
    const ticketCode = generateTicketCode();
    const ticket = await ticketSchema.create({
      ticketCode: ticketCode,
      bookingId: booking._id,
      eventId: booking.eventId,
      userId: booking.userId,
      numberOfTickets: booking.numberOfTickets,
      transactionReference: payment.transactionReference,
    });
    res.json({
      status: 200,
      message: "payment valid successfully",
      data: {
        booking,
        payment,
        ticket,
      },
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error generat ticket",
      error: error,
    });
  }
};

export const getTicket = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const ticket = await ticketSchema.find({ bookingId: bookingId });
    if (ticket.length < 0) {
      return res.json({
        status: 404,
        message: "ticket not found",
      });
    }
    res.json({
      status: 200,
      message: "ticket fetch successfully",
      data: ticket,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error generat ticket",
      error: error,
    });
  }
};
