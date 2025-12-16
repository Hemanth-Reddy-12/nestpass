import { Router } from "express";
import {
  registerValidator,
  loginValidator,
} from "../middleware/validator/auth.validator.js";
import { validate } from "../middleware/auth.middleware.js";
import { userRegister, login, logout } from "../controllers/auth.controller.js";
import { verifyCookie } from "../middleware/jwt.middleware.js";

const router = Router();
router.post("/register", registerValidator, validate, userRegister);
router.post("/login", loginValidator, validate, login);
router.post("/logout", verifyCookie, logout);
// router.post("/forgot-password");
// router.post("/forgot-password/:token");

export default router;
