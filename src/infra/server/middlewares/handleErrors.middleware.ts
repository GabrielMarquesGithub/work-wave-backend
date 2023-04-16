import { NextFunction, Request, Response } from "express";

import { AppError } from "../../../core/errors/app.error";

export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.code).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: `Internal server error - {err.message}`,
  });
};
