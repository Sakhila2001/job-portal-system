import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import registerRoutes from "./src/modules/auth/register/register.route.js";
import verifyRoutes from "./src/modules/auth/verify/verify.route.js";
import googleAuthRoutes from "./src/modules/auth/google/google.route.js";
import loginRoutes from "./src/modules/auth/login/login.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.APP_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth/register", registerRoutes);
app.use("/api/auth", verifyRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/auth", loginRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
