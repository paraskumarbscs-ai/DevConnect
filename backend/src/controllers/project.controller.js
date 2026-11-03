import mongoose from "mongoose";
import Project from "../models/Project.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create({ ...req.validatedBody, owner: req.user._id });
  await project.populate("owner", "name skills");
  res.status(201).json({ project });
});

export const listProjects = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(30, Math.max(1, Number.parseInt(req.query.limit, 10) || 12));
  const q = String(req.query.q || "").trim();
  const filter = {};
  if (q) filter.$text = { $search: q };
  if (req.query.status) filter.status = req.query.status;
  const [projects, total] = await Promise.all([
    Project.find(filter).populate("owner", "name skills")
      .populate("collaborators", "name").sort({ createdAt: -1 })
      .skip((page - 1) * limit).limit(limit),
    Project.countDocuments(filter)
  ]);
  res.json({ projects, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

export const getProject = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid project ID" });
  const project = await Project.findById(req.params.id)
    .populate("owner", "name bio skills github")
    .populate("collaborators", "name skills");
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json({ project });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  if (!project.owner.equals(req.user._id)) return res.status(403).json({ message: "Only the owner can update this project" });
  Object.assign(project, req.validatedBody);
  await project.save();
  res.json({ project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  if (!project.owner.equals(req.user._id)) return res.status(403).json({ message: "Only the owner can delete this project" });
  await project.deleteOne();
  res.json({ message: "Project deleted" });
});
