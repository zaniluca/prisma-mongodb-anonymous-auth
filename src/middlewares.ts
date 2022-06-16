import type { NextFunction, Request, Response } from "express";
import { expressjwt } from "express-jwt";

/**
 * Require a user to be logged in for the given route.
 */
export const authRequired = expressjwt({
  secret: process.env.JWT_ACCESS_SECRET!,
  algorithms: ["HS256"],
});

/**
 * Handle a failed JWT authentication.
 * @param err Error thrown by express-jwt
 */
export const handleUnauthorizedError = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "UnauthorizedError") {
    return res.status(403).json({
      message: "Unauthenticated",
    });
  } else {
    next(err);
  }
};
