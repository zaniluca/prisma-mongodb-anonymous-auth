import express, { NextFunction, Response, Request } from "express";
import dotenv from "dotenv";
import user from "./routes/user";
import auth from "./routes/auth";
import { authRequired } from "./middlewares";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.json());
app.use("/user", authRequired);
app.use("/user", user);
app.use("/", auth);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    return res.status(403).json({
      message: "Unauthenticated",
    });
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
