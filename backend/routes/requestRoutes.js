
import Request from "../models/requestModel.js";
import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { fromId, toId, product, message } = req.body;
  const request = new Request({ from: fromId, to: toId, product, message });
  await request.save();
  res.json(request);
});

router.put(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const request = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(request);
  },
  authenticate,
  authorizeAdmin
);

router.get(
  "/:salesPersonId",
  async (req, res) => {
    const { salesPersonId } = req.params;
    const requests = await Request.find({ to: salesPersonId }).populate("from");
    res.json(requests);
  },
  authenticate,
  authorizeAdmin
);

export default router;