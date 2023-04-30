import express from "express";

import { getProfile, updateProfile } from "../controllers/profile.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", auth, getProfile);
router.patch("/:id", auth, updateProfile);

export default router;
