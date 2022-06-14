import type { User } from "@prisma/client";
import type { Request } from "express";

export interface IUserRequestWithPayload extends Request {
  body: Partial<User>;
}
