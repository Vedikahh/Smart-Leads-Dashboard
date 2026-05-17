import express from "express";
import { protect } from "../middleware/auth.middleware";

import {
    loginUser,
    registerUser,
} from "../controllers/auth.controller";

const router = express.Router();

router.get("/me", protect, (req, res) => {
    res.json({
        success: true,
        message: "Protected route working",
    });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;