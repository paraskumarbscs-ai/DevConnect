import { Router } from "express";
import protect from "../middleware/auth.js";
import { sendRequest, listRequests, respondRequest } from "../controllers/collaboration.controller.js";

const router = Router();
router.use(protect);
router.post("/", sendRequest);
router.get("/inbox", listRequests);
router.patch("/:id/respond", respondRequest);
export default router;
