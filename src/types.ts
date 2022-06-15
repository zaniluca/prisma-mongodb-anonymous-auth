import type { Request } from "express";
import type { Request as ExpressJwtRequest } from "express-jwt";

export interface RequestWithPayload<T> extends Request {
  body: Partial<T>;
}

export interface AuthRequestWithPayload<T> extends ExpressJwtRequest {
  body: Partial<T>;
}
