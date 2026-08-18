import { Router, type Router as ExpressRouter } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { getAdminJobHandler, listAdminJobsHandler, updateAdminJobStatusHandler } from "./job.controller.js";

const router: ExpressRouter = Router();

router.use(authenticate, authorize("admin"));
router.get("/", listAdminJobsHandler);
router.get("/:uuid", getAdminJobHandler);
router.patch("/:uuid/status", updateAdminJobStatusHandler);

export default router;
