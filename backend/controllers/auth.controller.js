import bcrypt from "bcryptjs";
import userSchema from "../models/userSchema.js";
import { generateTokenAndSetCookies } from "../middleware/jwt.middleware.js";

export const userRegister = async (req, res) => {
  try {
    const reqBody = req.body;
    const user = await userSchema(reqBody);
    user.save();
    res.json({
      status: 200,
      message: "user registered successfully",
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          roles: user.roles,
        },
      },
    });
  } catch (error) {
    res.json({
      status: 500,
      message:
        "Error while register the user here is the problem " + error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email: email }).select("+password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({
        status: 401,
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });

    generateTokenAndSetCookies(res, user.username);

    res.json({
      status: 200,
      message: "login successfully",
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error while Login the user " + error.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: "strict",
    });
    res.json({
      status: 200,
      message: "logout successfully",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error while logout the user" + error.message,
    });
  }
};
