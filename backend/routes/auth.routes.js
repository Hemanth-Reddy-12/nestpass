import { Router } from "express";
import {
  registerValidator,
  loginValidator,
} from "../middleware/validator/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import { userRegister, login, logout } from "../controllers/auth.controller.js";
import { authentication, loggedInUser } from "../middleware/jwt.middleware.js";

const router = Router();
router.post("/register", registerValidator, validate, userRegister);
router.post("/login", loggedInUser, loginValidator, validate, login);
router.post("/logout", authentication, logout);
// router.post("/forgot-password");
// router.post("/forgot-password/:token");

export default router;
