import { Router, type Router as ExpressRouter } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import {
  createDepartmentHandler,
  deleteDepartmentHandler,
  getDepartmentHandler,
  listDepartmentsHandler,
  updateDepartmentHandler,
} from "./department.controller.js";

const router: ExpressRouter = Router();

router.use(authenticate, authorize("admin"));

router.get("/", listDepartmentsHandler);
router.get("/:uuid", getDepartmentHandler);
router.post("/", createDepartmentHandler);
router.patch("/:uuid", updateDepartmentHandler);
router.delete("/:uuid", deleteDepartmentHandler);

export default router;
