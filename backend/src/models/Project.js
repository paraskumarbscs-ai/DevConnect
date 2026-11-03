import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 2000 },
  techStack: [{ type: String, trim: true }],
  repositoryUrl: { type: String, default: "" },
  demoUrl: { type: String, default: "" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["planning", "in-progress", "completed"], default: "planning" }
}, { timestamps: true });

projectSchema.index({ title: "text", description: "text", techStack: "text" });
export default mongoose.model("Project", projectSchema);
