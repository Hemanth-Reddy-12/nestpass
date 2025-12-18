import { Router } from "express";
import authRoutes from "./auth.routes.js";
import protectedRoutes from "./protected.routes.js";
import publicRoutes from "./public.routes.js";

const router = Router();

router.get("/", (req, res) => {
  return res.json({
    status: 200,
    message: "NestPass(Event Management System) API",
  });
});

router.use("/auth", authRoutes);
router.use("/", publicRoutes);
router.use("/", protectedRoutes);

export default router;
