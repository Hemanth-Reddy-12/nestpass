import { getUsername } from "../middleware/jwt.middleware.js";
import User from "../models/userSchema.js";

export const getProfile = async (req, res) => {
  try {
    const username = getUsername(req);
    const user = await User.findOne({ username });
    return res.json({
      success: 200,
      message: "user profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.json({
      sucess: 500,
      message: "server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const username = getUsername(req);
    const updates = req.body;
    const user = await User.findOneAndUpdate({ username }, updates);
    return res.json({
      success: 200,
      message: "user profile updated successfully",
      data: user,
    });
  } catch (error) {
    return res.json({
      sucess: 500,
      message: "server error",
    });
  }
};
