import express from "express";
import { protect } from "../middleware/auth.middleware";

import {
    loginUser,
    registerUser,
} from "../controllers/auth.controller";

const router = express.Router();

router.get("/me", protect, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;