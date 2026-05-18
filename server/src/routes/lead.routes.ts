import express, { Response, NextFunction } from "express";

import {
    createLead,
    deleteLead,
    getLeads,
    getSingleLead,
    updateLead,
    exportLeadsCSV,
} from "../controllers/lead.controller";

import { protect } from "../middleware/auth.middleware";

import type { AuthRequest } from "../middleware/auth.middleware";

const router = express.Router();

// Middleware to check if user is owner or admin
const canDeleteLead = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    // This will be checked in the controller where we have access to the lead document
    next();
};

router.post("/", protect, createLead);

router.get("/", protect, getLeads);

router.get("/export/csv", protect, exportLeadsCSV);

router.get("/:id", protect, getSingleLead);

router.put("/:id", protect, updateLead);

router.delete("/:id", protect, canDeleteLead, deleteLead);

export default router;