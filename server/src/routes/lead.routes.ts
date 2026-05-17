import express, { Response, NextFunction } from "express";

import {
    createLead,
    deleteLead,
    getLeads,
    getSingleLead,
    updateLead,
} from "../controllers/lead.controller";

import { protect } from "../middleware/auth.middleware";

import type { AuthRequest } from "../middleware/auth.middleware";

const router = express.Router();

const adminOnly = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    }

    next();
};

router.post("/", protect, createLead);

router.get("/", protect, getLeads);

router.get("/:id", protect, getSingleLead);

router.put("/:id", protect, updateLead);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteLead
);

export default router;