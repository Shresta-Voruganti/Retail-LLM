import express from "express";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createBranch,
  updateBranch,
  removeBranch,
  listBranch,
  readBranch,
} from "../controllers/branchController.js";

router.route("/").post(authenticate,authorizeAdmin,createBranch);
router.route("/:Id").delete(authenticate, authorizeAdmin, removeBranch);
router.route("/:branchId").put(authenticate, authorizeAdmin, updateBranch);

router.route("/branchs").get(listBranch);

router.route("/:id").get(readBranch);

export default router;