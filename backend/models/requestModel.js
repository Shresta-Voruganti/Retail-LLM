import mongoose from "mongoose";
const Request = mongoose.model("Request", {
  from: { type: mongoose.Schema.Types.ObjectId, ref: "Salesperson" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Salesperson" },
  product: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  message: String,
});

export default Request;