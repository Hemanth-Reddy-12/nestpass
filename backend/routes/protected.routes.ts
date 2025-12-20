import { Router } from "express";

import { addVenue, updateVenue } from "../controllers/venue.controller.js";
import {
  createEvent,
  deleteEvent,
  getMyEvents,
  updateEvent,
  updateEventStatus,
} from "../controllers/event.controller.js";
import {
  changeIsActiveUser,
  getAllUsers,
  getProfile,
  getUserById,
  updateProfile,
  updateUser,
} from "../controllers/user.controller.js";
import {
  createBooking,
  getAllBooking,
  getBookingById,
  getMyBookings,
} from "../controllers/booking.controller.js";
import { generateTicket, getTicket } from "../controllers/ticket.controller.js";
import { paymentValidator } from "../controllers/paymet.controller.js";

import {
  authentication,
  eventOwnerShip,
  roleAuthorization,
} from "../middleware/jwt.middleware.js";
import { updateRegisterValidator } from "../middleware/validator/auth.validator.js";
import { createEventValidation } from "../middleware/validator/event.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import { razorpayVerificationPayment } from "../middleware/razorpay.middleware.js";

const router = Router();

//  profile routes
router.get("/profile", authentication, getProfile);
router.patch(
  "/profile",
  authentication,
  updateRegisterValidator,
  validate,
  updateProfile
);

// event routes
router.post(
  "/event",
  authentication,
  roleAuthorization(["admin", "organizer"]),
  createEventValidation,
  validate,
  createEvent
);

router.get(
  "/my-events",
  authentication,
  roleAuthorization(["organizer"]),
  getMyEvents
);

router.patch(
  "/event/:id",
  authentication,
  roleAuthorization(["organizer"]),
  eventOwnerShip,
  updateEvent
);

router.delete(
  "/event/:id",
  authentication,
  roleAuthorization(["admin"]),
  deleteEvent
);

router.patch(
  "/event/:id/status",
  authentication,
  roleAuthorization(["organizer"]),
  eventOwnerShip,
  updateEventStatus
);

router.patch(
  "/event/:id",
  authentication,
  roleAuthorization(["admin"]),
  updateEvent
);

// venue routes
router.post("/venue", authentication, roleAuthorization(["admin"]), addVenue);
router.patch(
  "/venue:id",
  authentication,
  roleAuthorization(["admin"]),
  updateVenue
);

// booking
router.post("/booking", authentication, createBooking);

router.post(
  "/booking/validate",
  authentication,
  razorpayVerificationPayment,
  paymentValidator,
  generateTicket
);

router.get("/bookings", authentication, getMyBookings);
router.get(
  "/booking/all",
  authentication,
  roleAuthorization(["admin"]),
  getAllBooking
);
router.get("/booking/:id", authentication, getBookingById);

router.get("/booking/:id/ticket", authentication, getTicket);

// admin
router.get("/users", authentication, roleAuthorization(["admin"]), getAllUsers);

router.get(
  "/user/:id",
  authentication,
  roleAuthorization(["admin"]),
  getUserById
);

router.delete(
  "/user/:id",
  authentication,
  roleAuthorization(["admin"]),
  changeIsActiveUser
);

router.patch(
  "/user/:id",
  authentication,
  roleAuthorization(["admin"]),
  updateUser
);

router.get("/events/all", authentication, roleAuthorization(["admin"]));

export default router;
