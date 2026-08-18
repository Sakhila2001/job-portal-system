import { Router, type Router as ExpressRouter } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import {
  createDesignationHandler,
  deleteDesignationHandler,
  getDesignationHandler,
  listDesignationsHandler,
  updateDesignationHandler,
} from "./designation.controller.js";

const router: ExpressRouter = Router();

router.use(authenticate, authorize("admin"));

router.get("/", listDesignationsHandler);
router.get("/:uuid", getDesignationHandler);
router.post("/", createDesignationHandler);
router.patch("/:uuid", updateDesignationHandler);
router.delete("/:uuid", deleteDesignationHandler);

export default router;
