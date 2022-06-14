import express from "express";
import dotenv from "dotenv";
import user from "./routes/user";
import auth from "./routes/auth";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.json());
app.use("/user", user);
app.use("/", auth);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
