import { Router, type Router as ExpressRouter } from "express";
import { getCandidateJobHandler, listCandidateJobsHandler } from "./job.controller.js";

const router: ExpressRouter = Router();

router.get("/", listCandidateJobsHandler);
router.get("/:uuid", getCandidateJobHandler);

export default router;
