import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userSchema from "../models/user.model";
import { generateTokenAndSetCookies } from "../middleware/jwt.middleware";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const user = new userSchema(reqBody);
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
      message: "Error register the user",
      error: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email: email }).select("+password");

    if (!user) {
      return res.json({
        status: 404,
        messgae: "user not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({
        status: 401,
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });

    generateTokenAndSetCookies(res, user);

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
          role: user.roles,
        },
      },
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error Login the user ",
      error: error,
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({
      status: 200,
      message: "logout successfully",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error while logout the user",
      error: error,
    });
  }
};
