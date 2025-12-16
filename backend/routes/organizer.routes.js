const express = require("express");
const router = express.Router();

router.get("/dashboard");
router.get("/events");
router.post("/events");
router.put("/events/:id");
router.get("/events/:id/attendees");
router.get("/transactions");

module.exports = router;
