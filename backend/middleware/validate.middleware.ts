import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({
      success: 400,
      errors: errors.array().map((err) => ({
        message: err.msg,
        type: err.type,
      })),
    });
  }

  next();
};
