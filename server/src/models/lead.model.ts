import mongoose, { Schema } from "mongoose";

export interface ILead {
    name: string;
    email: string;
    status: "New" | "Contacted" | "Qualified" | "Lost";
    source: "Website" | "Instagram" | "Referral";
    createdBy: mongoose.Types.ObjectId;
}

const leadSchema = new Schema<ILead>(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["New", "Contacted", "Qualified", "Lost"],
            default: "New",
        },

        source: {
            type: String,
            enum: ["Website", "Instagram", "Referral"],
            required: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Lead = mongoose.model<ILead>("Lead", leadSchema);

export default Lead;