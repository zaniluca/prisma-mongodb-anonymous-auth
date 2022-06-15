import type { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";

export const generateJWTToken = (user: User, expiresIn: string = "1h") => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn,
    }
  );
};
