import { Router } from "express";
import { loginHandler, logoutHandler, refreshHandler } from "./login.controller.js";

const router: Router = Router();
router.post("/login", loginHandler);
router.post("/refresh", refreshHandler);
router.post("/logout", logoutHandler);

export default router;
