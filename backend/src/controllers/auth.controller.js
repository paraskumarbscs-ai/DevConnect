import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/token.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const publicUser = (user) => ({
  id: user._id, name: user.name, email: user.email, bio: user.bio,
  location: user.location, skills: user.skills, github: user.github,
  portfolio: user.portfolio, createdAt: user.createdAt
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.validatedBody;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email is already registered" });
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ token: signToken(user._id), user: publicUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedBody;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ token: signToken(user._id), user: publicUser(user) });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: publicUser(req.user) });
});
