import { expressjwt } from "express-jwt";

export const authRequired = expressjwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ["HS256"],
});
