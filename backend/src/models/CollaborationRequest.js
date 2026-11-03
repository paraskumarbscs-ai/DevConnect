import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, default: "", maxlength: 500 },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
}, { timestamps: true });

requestSchema.index({ project: 1, sender: 1, recipient: 1 }, { unique: true });
export default mongoose.model("CollaborationRequest", requestSchema);
