import { Router } from "express";
import { completeGoogleSignIn, startGoogleSignIn } from "./google.controller.js";

const router: Router = Router();

router.get("/google", startGoogleSignIn);
router.get("/google/callback", completeGoogleSignIn);

export default router;
