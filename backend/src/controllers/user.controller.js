import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

export const updateMe = asyncHandler(async (req, res) => {
  const allowed = ["name", "bio", "location", "skills", "github", "portfolio"];
  const updates = {};
  for (const key of allowed) if (req.body[key] !== undefined) updates[key] = req.body[key];
  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true, runValidators: true
  }).select("-password");
  res.json({ user });
});

export const searchUsers = asyncHandler(async (req, res) => {
  const q = String(req.query.q || "").trim();
  const filter = { _id: { $ne: req.user._id } };
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { skills: { $regex: q, $options: "i" } }
    ];
  }
  const users = await User.find(filter)
    .select("name bio location skills github portfolio")
    .limit(30).sort({ createdAt: -1 });
  res.json({ users });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("name bio location skills github portfolio createdAt");
  if (!user) return res.status(404).json({ message: "Developer not found" });
  res.json({ user });
});
