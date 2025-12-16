import { Router } from "express";

const router = Router;
router.get("/events");
router.get("/events/:id");
router.get("/venues");
router.get("/venues/:id");

export default router;
