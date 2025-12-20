import { NextFunction, Request, Response } from "express";
import paymentSchema from "../models/payment.model.js";
import bookingSchema from "../models/booking.model.js";

export const paymentValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("payment controller");

    const { razorpayOrderId, razorpayPaymentId } = req.body as any;

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

    next();
  } catch (error) {
    return res.json({
      status: 500,
      message: "Error verifing payment",
      error: error,
    });
  }
};
