import { Router } from "express";
import protect from "../middleware/auth.js";
import { getMe, updateMe, searchUsers, getUserById } from "../controllers/user.controller.js";

const router = Router();
router.use(protect);
router.get("/me", getMe);
router.patch("/me", updateMe);
router.get("/search", searchUsers);
router.get("/:id", getUserById);
export default router;
