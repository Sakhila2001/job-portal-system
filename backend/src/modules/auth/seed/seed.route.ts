import { Router } from "express";
import { seedAdminHandler } from "./seed.controller.js";

const router: Router = Router();

router.post("/admin", seedAdminHandler);

export default router;