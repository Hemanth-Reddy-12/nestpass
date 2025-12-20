import { Request, Response } from "express";
import { getLoggedUser } from "../middleware/jwt.middleware.js";
import userSchema from "../models/user.model.js";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const loggedUser = getLoggedUser(req);
    const user = await userSchema.findById(loggedUser._id);
    res.json({
      success: 200,
      message: "user profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.json({
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
    const user = await userSchema.findByIdAndUpdate(loggedUser._id, updates);
    res.json({
      success: 200,
      message: "user profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.json({
      sucess: 500,
      message: "error updating profile",
      error: error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userSchema.find();
    res.json({
      status: 500,
      message: "fetch all users successfully",
      data: users,
    });
  } catch (error) {
    res.json({
      sucess: 500,
      message: "error fetch all user",
      error: error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userSchema.findById(userId);
    if (!user) {
      res.json({
        status: 404,
        message: "user not found",
      });
    }
    res.json({
      status: 200,
      message: "fetch user successfully",
      data: user,
    });
  } catch (error) {
    res.json({
      sucess: 500,
      message: "error fetch user by id",
      error: error,
    });
  }
};

export const changeIsActiveUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await userSchema.findByIdAndUpdate(id, {
      isActive: false,
    });
    if (!user) {
      return res.json({
        status: 404,
        message: "user not found",
      });
    }
    res.json({
      status: 500,
      message: "user isActive filed change successfully",
      data: user,
    });
  } catch (error) {
    res.json({
      sucess: 500,
      message: "error change from active to inactive",
      error: error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const reqBody = req.body;
    const updatedUser = await userSchema.findByIdAndUpdate(id, { reqBody });
    if (!updatedUser) {
      return res.json({
        status: 404,
        message: "user not found",
      });
    }
    res.json({
      status: 200,
      message: "user update succesfully",
      data: updatedUser,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error update user",
      error: error,
    });
  }
};
