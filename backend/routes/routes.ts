import { Router } from "express";
import authRoutes from "./auth.routes";
import protectedRoutes from "./protected.routes";
import publicRoutes from "./public.routes";

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
