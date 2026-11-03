import Project from "../models/Project.js";
import CollaborationRequest from "../models/CollaborationRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendRequest = asyncHandler(async (req, res) => {
  const { projectId, message = "" } = req.body;
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: "Project not found" });
  if (project.owner.equals(req.user._id)) return res.status(400).json({ message: "You own this project" });
  if (project.collaborators.some((id) => id.equals(req.user._id))) {
    return res.status(409).json({ message: "You are already a collaborator" });
  }
  const existing = await CollaborationRequest.findOne({
    project: projectId, sender: req.user._id, recipient: project.owner
  });
  if (existing) return res.status(409).json({ message: "You have already requested to join this project" });
  const request = await CollaborationRequest.create({
    project: projectId, sender: req.user._id, recipient: project.owner, message
  });
  res.status(201).json({ request });
});

export const listRequests = asyncHandler(async (req, res) => {
  const requests = await CollaborationRequest.find({
    recipient: req.user._id, status: "pending"
  }).populate("sender", "name skills").populate("project", "title");
  res.json({ requests });
});

export const respondRequest = asyncHandler(async (req, res) => {
  const { action } = req.body;
  if (!["accepted", "rejected"].includes(action)) {
    return res.status(400).json({ message: "Action must be accepted or rejected" });
  }
  const request = await CollaborationRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ message: "Request not found" });
  if (!request.recipient.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });
  if (request.status !== "pending") return res.status(409).json({ message: "Request already handled" });
  request.status = action;
  await request.save();
  if (action === "accepted") {
    await Project.findByIdAndUpdate(request.project, {
      $addToSet: { collaborators: request.sender }
    });
  }
  res.json({ request });
});
