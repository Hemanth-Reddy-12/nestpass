import jwt from "jsonwebtoken";

export const generateTokenAndSetCookies = (res, user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 24 * 60 * 1000,
  });

  return token;
};

export const verifyCookie = (req, res, next) => {
  let token;
  token = req.cookies.token;
  if (!token) {
    return res.json({
      status: 401,
      message: "Authentication Required, Please login ...",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized no token provided" });
    }
    req.user = process.env.USER;
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
