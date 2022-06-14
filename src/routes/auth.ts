import { Router } from "express";
import { prisma } from "../../prisma/client";
import bcrypt from "bcrypt";
import type { IUserRequestWithPayload } from "../types";

const router = Router();

router.post("/login", (req, res) => {
  res.json({
    message: "login",
  });
});

router.post("/signup", async (req: IUserRequestWithPayload, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
    },
    select: {
      id: true,
      email: true,
    },
  });

  return res.status(201).json(user);
});

export default router;
