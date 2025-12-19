import { body } from "express-validator";

export const createEventValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Event title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters")
    .escape(),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Event description is required")
    .isLength({ min: 20, max: 2000 })
    .withMessage("Description must be between 20 and 2000 characters")
    .escape(),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Event category is required")
    .isIn(["conference", "workshop", "seminar", "concert", "sports", "other"])
    .withMessage("Invalid event category"),

  body("startTime")
    .notEmpty()
    .withMessage("Event start time is required")
    .isISO8601()
    .withMessage("Start time must be a valid date")
    .custom((value) => {
      const startDate = new Date(value);
      const now = new Date();
      if (startDate <= now) {
        throw new Error("Start time must be in the future");
      }
      return true;
    }),

  body("endTime")
    .notEmpty()
    .withMessage("Event end time is required")
    .isISO8601()
    .withMessage("End time must be a valid date")
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startTime);
      const endDate = new Date(value);
      if (endDate <= startDate) {
        throw new Error("End time must be after start time");
      }
      return true;
    }),

  body("registerationDeadline")
    .notEmpty()
    .withMessage("Registration deadline is required")
    .isISO8601()
    .withMessage("Registration deadline must be a valid date")
    .custom((value, { req }) => {
      const deadline = new Date(value);
      const startDate = new Date(req.body.startTime);
      const now = new Date();

      if (deadline <= now) {
        throw new Error("Registration deadline must be in the future");
      }
      if (deadline >= startDate) {
        throw new Error(
          "Registration deadline must be before event start time"
        );
      }
      return true;
    }),

  body("venueId")
    .notEmpty()
    .withMessage("Venue ID is required")
    .isMongoId()
    .withMessage("Invalid venue ID format"),

  body("capacity")
    .notEmpty()
    .withMessage("Event capacity is required")
    .isInt({ min: 1, max: 100000 })
    .withMessage("Capacity must be a positive integer between 1 and 1,000,000")
    .toInt(),

  body("availableTickets")
    .notEmpty()
    .withMessage("Available tickets are required")
    .isInt({ min: 0 })
    .withMessage("Available tickets must be a non-negative integer")
    .toInt()
    .custom((value, { req }) => {
      if (value > req.body.capacity) {
        throw new Error("Available tickets cannot exceed event capacity");
      }
      return true;
    }),

  body("ticketPrice")
    .notEmpty()
    .withMessage("Ticket price is required")
    .isFloat({ min: 0, max: 1000000 })
    .withMessage("Ticket price must be a non-negative number")
    .toFloat(),

  body("status")
    .optional()
    .trim()
    .isIn(["draft", "published", "cancelled", "completed"])
    .withMessage("Invalid event status"),

  body("organizer")
    .notEmpty()
    .withMessage("Organizer ID is required")
    .isMongoId()
    .withMessage("Invalid organizer ID format"),

  body("image")
    .optional()
    .trim()
    .isURL()
    .withMessage("Image must be a valid URL"),
];
