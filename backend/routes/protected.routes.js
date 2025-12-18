import { Router } from "express";

// ? controllers
import { addVenue } from "../controllers/venue.controller.js";
import {
  createEvent,
  deleteEvent,
  getMyEvents,
  updateEvent,
  updateEventStatus,
} from "../controllers/event.controller.js";
import { getProfile, updateProfile } from "../controllers/user.controller.js";

// ? middlewares
import {
  authentication,
  eventOwnerShip,
  roleAuthorization,
} from "../middleware/jwt.middleware.js";
import { updateRegisterValidator } from "../middleware/validator/auth.validator.js";
import { createEventValidation } from "../middleware/validator/event.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

// ! user Routes
router.get("/profile", authentication, getProfile);
router.patch(
  "/profile",
  authentication,
  updateRegisterValidator,
  validate,
  updateProfile
);

// ! event Routes
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

router.put(
  "/event/:id",
  authentication,
  roleAuthorization(["admin", "organizer"]),
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
  roleAuthorization(["admin", "organizer"]),
  eventOwnerShip,
  updateEventStatus
);

// ! venue Routes
router.post("/venue", authentication, roleAuthorization(["admin"]), addVenue);

export default router;
