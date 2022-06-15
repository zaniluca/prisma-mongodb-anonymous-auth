import { Router } from "express";
import { prisma } from "../../prisma/client";
import bcrypt from "bcrypt";
import type { RequestWithPayload } from "../types";
import type { User } from "@prisma/client";
import { generateJWTToken } from "../utils";

const router = Router();

type AuthPayload = {
  email: string;
  password: string;
};

router.post("/login", async (req: RequestWithPayload<AuthPayload>, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  return res.status(200).json({
    accessToken: generateJWTToken(user),
    refreshToken: generateJWTToken(user, "7d"),
  });
});

router.post("/signup", async (req: RequestWithPayload<AuthPayload>, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  const alreadyExists = await prisma.user.count({
    where: {
      email,
    },
  });

  if (alreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
    },
  });

  return res.status(201).json({
    accessToken: generateJWTToken(user),
    refreshToken: generateJWTToken(user, "7d"),
  });
});

type RefreshPayload = {
  refreshToken: string;
};

router.post(
  "/refresh",
  async (req: RequestWithPayload<RefreshPayload>, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
  }
);

export default router;
