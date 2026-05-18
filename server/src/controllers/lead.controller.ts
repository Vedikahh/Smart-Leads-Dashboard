import { Request, Response } from "express";
import Lead from "../models/lead.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const createLead = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const lead = await Lead.create({
            ...req.body,
            createdBy: req.user?.id,
        });

        res.status(201).json({
            success: true,
            data: lead,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create lead",
        });
    }
};

export const getLeads = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const {
            status,
            source,
            search,
            sort = "latest",
            page = "1",
        } = req.query;

        const query: any = {};

        if (req.user?.role !== "admin") {
            query.createdBy = req.user?.id;
        }

        if (status) {
            query.status = status;
        }

        if (source) {
            query.source = source;
        }

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const limit = 10;
        const skip =
            (Number(page) - 1) * limit;

        const sortOption =
            sort === "oldest"
                ? { createdAt: 1 }
                : { createdAt: -1 };

        const total = await Lead.countDocuments(query);

        const leads = await Lead.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: leads,

            pagination: {
                total,
                page: Number(page),
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch leads",
        });
    }
};

export const getSingleLead = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const lead = await Lead.findById(
            req.params.id
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        const isOwner = lead.createdBy.toString() === req.user?.id;
        const isAdmin = req.user?.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to view this lead",
            });
        }

        res.status(200).json({
            success: true,
            data: lead,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch lead",
        });
    }
};

export const updateLead = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const lead = await Lead.findById(
            req.params.id
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        // Check if user is owner or admin
        const isOwner = lead.createdBy.toString() === req.user?.id;
        const isAdmin = req.user?.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this lead",
            });
        }

        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        res.status(200).json({
            success: true,
            data: updatedLead,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update lead",
        });
    }
};

export const deleteLead = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const lead = await Lead.findById(
            req.params.id
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        // Check if user is owner or admin
        const isOwner = lead.createdBy.toString() === req.user?.id;
        const isAdmin = req.user?.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this lead",
            });
        }

        await Lead.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Lead deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete lead",
        });
    }
};

export const exportLeadsCSV = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { status, source, search } = req.query;
        const query: any = {};

        if (req.user?.role !== "admin") {
            query.createdBy = req.user?.id;
        }

        if (status) {
            query.status = status;
        }

        if (source) {
            query.source = source;
        }

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const leads = await Lead.find(query);

        const csvHeader = "Name,Email,Status,Source,Created Date\n";

        const csvRows = leads
            .map((lead) =>
                [`${lead.name}`,
                `${lead.email}`,
                `${lead.status}`,
                `${lead.source}`,
                `${new Date(lead.createdAt || new Date()).toISOString()}`]
                    .map((value) => `"${value.replace(/"/g, '""')}"`)
                    .join(",")
            )
            .join("\n");

        const csv = csvHeader + csvRows;

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="leads.csv"'
        );

        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to export leads",
        });
    }
};