import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import eventSchema from "../models/eventSchema.js";

export const generateTokenAndSetCookies = (res, user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
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

export const authentication = (req, res, next) => {
  let token;
  token = req.cookies.token;
  if (!token) {
    return res.json({
      status: 401,
      message: "Authentication Required, Please login ...",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized no token provided" });
    }
    req.user = process.env.USER;
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loggedInUser = (req, res, next) => {
  try {
    if (token === undefined) {
      next();
      return;
    }
    return res.json({
      status: 200,
      message: "already user is logged in",
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Server Error",
    });
  }
};

// role authorization middleware can be added here in future

export const roleAuthorization = (roles) => {
  return async (req, res, next) => {
    let decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    const username = decode?.user;
    const userRole = await userSchema
      .findOne({ username: username })
      .select("roles");

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

export const getUsername = (req) => {
  let decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
  return decode?.user;
};

export const eventOwnerShip = async (req, res, next) => {
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
