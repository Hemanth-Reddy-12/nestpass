import { Request, Response } from "express";
import { getLoggedUser } from "../middleware/jwt.middleware.js";
import User from "../models/user.model.js";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const loggedUser = getLoggedUser(req);
    const user = await User.findById(loggedUser._id);
    return res.json({
      success: 200,
      message: "user profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.json({
      sucess: 500,
      message: "error fetching profile",
      error: error,
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const loggedUser = getLoggedUser(req);
    const updates = req.body;
    const user = await User.findByIdAndUpdate(loggedUser._id, updates);
    return res.json({
      success: 200,
      message: "user profile updated successfully",
      data: user,
    });
  } catch (error) {
    return res.json({
      sucess: 500,
      message: "error updating profile",
      error: error,
    });
  }
};
