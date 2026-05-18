export interface Lead {
    _id: string;
    name: string;
    email: string;
    status: "New" | "Contacted" | "Qualified" | "Lost";
    source: "Website" | "Instagram" | "Referral";
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}