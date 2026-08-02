import { Router } from "express";
import { verifyEmailHandler, resendVerificationHandler } from "./verify.controller.js";

const router: Router = Router();

router.get("/verify-email", verifyEmailHandler);
router.post("/resend-verification", resendVerificationHandler);

export default router;
