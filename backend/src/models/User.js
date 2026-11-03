import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  bio: { type: String, default: "", maxlength: 500 },
  location: { type: String, default: "", maxlength: 100 },
  skills: [{ type: String, trim: true, maxlength: 40 }],
  github: { type: String, default: "" },
  portfolio: { type: String, default: "" },
  role: { type: String, enum: ["developer", "admin"], default: "developer" }
}, { timestamps: true });

userSchema.index({ name: "text", skills: "text" });
export default mongoose.model("User", userSchema);
