import { Router } from "express";
import { registerCandidateHandler, registerEmployerHandler, resendWelcomeHandler } from "./register.controller.js";

const router: Router = Router();

router.post("/candidate", registerCandidateHandler);
router.post("/employer", registerEmployerHandler);
router.post("/resend", resendWelcomeHandler);

export default router;
