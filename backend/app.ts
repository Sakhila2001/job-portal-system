import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import registerRoutes from "./src/modules/auth/register/register.route.js";
import verifyRoutes from "./src/modules/auth/verify/verify.route.js";
import googleAuthRoutes from "./src/modules/auth/google/google.route.js";
import loginRoutes from "./src/modules/auth/login/login.route.js";
import seedRoutes from "./src/modules/auth/seed/seed.route.js";
import recruiterJobRoutes from "./src/modules/jobs/recruiter-jobs.route.js";
import candidateJobRoutes from "./src/modules/jobs/candidate-jobs.route.js";
import adminJobRoutes from "./src/modules/jobs/admin-jobs.route.js";
import designationRoutes from "./src/modules/designations/designation.route.js";
import departmentRoutes from "./src/modules/departments/department.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth/register", registerRoutes);
app.use("/api/auth", verifyRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/auth/seed", seedRoutes);
app.use("/api/recruiter/jobs", recruiterJobRoutes);
app.use("/api/candidate/jobs", candidateJobRoutes);
app.use("/api/admin/jobs", adminJobRoutes);
app.use("/api/admin/designations", designationRoutes);
app.use("/api/admin/departments", departmentRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
