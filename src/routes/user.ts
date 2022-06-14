import { User } from "@prisma/client";
import { Request, Router } from "express";
import { prisma } from "../../prisma/client";
import bcrypt from "bcrypt";

const router = Router();

interface IUserRequestWithPayload extends Request {
  body: Partial<User>;
}

router.get("/", (req, res) => {
  res.json({
    message: "Hello World from user",
  });
});

router.post("/", async (req: IUserRequestWithPayload, res) => {
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

router.put("/", async (req: IUserRequestWithPayload, res) => {
  const { password, email } = req.body;

  const user = await prisma.user.create({
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

router.delete("/", (req, res) => {});

export default router;
