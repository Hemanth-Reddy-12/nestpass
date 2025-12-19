import { Router } from "express";
import {
  registerValidator,
  loginValidator,
} from "../middleware/validator/auth.validator";
import { validate } from "../middleware/validate.middleware";
import { userRegister, login, logout } from "../controllers/auth.controller";
import { authentication } from "../middleware/jwt.middleware";

const router = Router();
router.post("/register", registerValidator, validate, userRegister);
router.post("/login", loginValidator, validate, login);
router.post("/logout", authentication, logout);
// router.post("/forgot-password");
// router.post("/forgot-password/:token");

export default router;
