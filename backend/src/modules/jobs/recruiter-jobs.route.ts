import { Router, type Router as ExpressRouter } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import {
  createRecruiterJobHandler,
  deleteRecruiterJobHandler,
  getRecruiterJobHandler,
  listRecruiterJobsHandler,
  updateRecruiterJobHandler,
} from "./job.controller.js";

const router: ExpressRouter = Router();

router.use(authenticate, authorize("employer", "recruiter"));
router.post("/", createRecruiterJobHandler);
router.get("/", listRecruiterJobsHandler);
router.get("/:uuid", getRecruiterJobHandler);
router.patch("/:uuid", updateRecruiterJobHandler);
router.delete("/:uuid", deleteRecruiterJobHandler);

export default router;
