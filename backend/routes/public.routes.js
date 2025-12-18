import { Router } from "express";
import { getEventById, getEvents } from "../controllers/event.controller.js";
import { getVenues, getVenuesById } from "../controllers/venue.controller.js";

const router = Router();

router.get("/events", getEvents);
router.get("/event/:id", getEventById);
router.get("/venues", getVenues);
router.get("/venue/:id", getVenuesById);
export default router;
