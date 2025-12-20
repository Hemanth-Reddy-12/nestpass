import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

export const razorpayVerificationPayment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("razorpay");

    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
    const razarpayKeySecret = process.env.RAZORPAY_KEY_SECRET as string;

    const generatedSignature = crypto
      .createHmac("sha256", razarpayKeySecret)
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
    next();
  } catch (error) {
    res.json({
      status: 500,
      message: "error razorpay verfication payment",
      error: error,
    });
  }
};
