import { Router } from "express";
import protect from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { projectSchema } from "../validators/schemas.js";
import { createProject, listProjects, getProject, updateProject, deleteProject } from "../controllers/project.controller.js";

const router = Router();
router.use(protect);
router.get("/", listProjects);
router.post("/", validate(projectSchema), createProject);
router.get("/:id", getProject);
router.patch("/:id", validate(projectSchema.partial()), updateProject);
router.delete("/:id", deleteProject);
export default router;
