import { Router } from "express";
import { prisma } from "../../prisma/client";
import bcrypt from "bcrypt";
import type { AuthRequestWithPayload } from "../types";
import type { User } from "@prisma/client";
import type { Request as ExpressJwtRequest } from "express-jwt";

const router = Router();

router.get("/", async (req: ExpressJwtRequest, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.auth?.userId,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return res.json(user);
});

router.put("/", async (req: AuthRequestWithPayload<User>, res) => {
  const { password, email } = req.body;

  const user = await prisma.user.update({
    where: {
      id: req.auth?.userId,
    },
    data: {
      email,
      password: password ? bcrypt.hashSync(password, 10) : undefined,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return res.status(200).json(user);
});

router.delete("/", async (req: ExpressJwtRequest, res) => {
  await prisma.user.delete({
    where: {
      id: req.auth?.userId,
    },
  });

  return res.status(200).json({
    message: "User deleted",
  });
});

export default router;
