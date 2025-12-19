import { Router } from "express";
import {
  getEventById,
  getEvents,
  searchEventByFilter,
} from "../controllers/event.controller.js";
import { getVenues, getVenuesById } from "../controllers/venue.controller.js";

const router = Router();

// ? public Event Routes
router.get("/events", getEvents);
router.get("/event/search", searchEventByFilter);
router.get("/event/:id", getEventById);

// ? public Venue Routes
router.get("/venues", getVenues);
router.get("/venue/:id", getVenuesById);
export default router;
