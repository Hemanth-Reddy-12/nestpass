import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userSchema from "../models/user.model";
import eventSchema from "../models/event.model";
import bookingSchema from "../models/booking.model";

export const generateTokenAndSetCookies = (res: Response, user: object) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1 * 24 * 24 * 60 * 1000,
  });

  return token;
};

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  token = req.cookies.token;
  if (!token) {
    return res.json({
      status: 401,
      message: "Authentication Required, Please login ...",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized no token provided" });
    }
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// role authorization middleware can be added here in future

export const roleAuthorization = (roles: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let decode = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET_KEY as string
    ) as any;
    const username = decode?.user.username;
    const userRole = await userSchema
      .findOne({ username: username })
      .select("roles");

    if (!userRole) {
      return res.json({
        status: 404,
        message: "user not found",
      });
    }

    if (userRole.roles.some((role) => roles.includes(role))) {
      next();
    } else {
      return res.json({
        status: 403,
        message:
          "Forbidden: You don't have enough privileges to access this resource",
      });
    }
  };
};

export const getLoggedUser = (req: Request) => {
  let decode = jwt.verify(
    req.cookies.token,
    process.env.JWT_SECRET_KEY as string
  ) as any;
  return decode?.user;
};

export const eventOwnerShip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = req.params.id;
    const eventOwner = await eventSchema.findById(eventId).select("organizer");
    console.log(eventOwner);
  } catch (error) {
    res.json({
      status: 500,
      message: "Server Error",
    });
  }
};

export const generateBookingCode = () => {
  return `BK-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
};
