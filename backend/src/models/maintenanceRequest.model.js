import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema(
  {
    assetTag: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Technician Assigned", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const MaintenanceRequest = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
