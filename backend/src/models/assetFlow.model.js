import mongoose from "mongoose";

const { Schema } = mongoose;

export const Department = mongoose.model(
  "Department",
  new Schema(
    {
      name: { type: String, required: true, unique: true, trim: true },
      head: { type: String, trim: true },
      parentDepartment: { type: String, default: null },
      status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    },
    { timestamps: true }
  )
);

export const Category = mongoose.model(
  "Category",
  new Schema(
    {
      name: { type: String, required: true, unique: true, trim: true },
      customFields: [{ type: String, trim: true }],
      status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    },
    { timestamps: true }
  )
);

export const Employee = mongoose.model(
  "Employee",
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      department: { type: String, required: true },
      role: {
        type: String,
        enum: ["Admin", "Asset Manager", "Department Head", "Employee"],
        default: "Employee",
      },
      status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    },
    { timestamps: true }
  )
);

export const Asset = mongoose.model(
  "Asset",
  new Schema(
    {
      tag: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      category: { type: String, required: true },
      serialNumber: { type: String },
      acquisitionDate: { type: Date },
      acquisitionCost: { type: Number },
      status: {
        type: String,
        enum: ["Available", "Allocated", "Reserved", "Under Maintenance", "Lost", "Retired", "Disposed"],
        default: "Available",
      },
      holder: { type: String, default: null },
      location: { type: String, required: true },
      condition: { type: String, default: "Good" },
      sharedBookable: { type: Boolean, default: false },
      history: [{ event: String, at: Date, note: String }],
    },
    { timestamps: true }
  )
);

export const Booking = mongoose.model(
  "Booking",
  new Schema(
    {
      resource: { type: String, required: true },
      bookedBy: { type: String, required: true },
      start: { type: Date, required: true },
      end: { type: Date, required: true },
      status: { type: String, enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"], default: "Upcoming" },
    },
    { timestamps: true }
  )
);

export const MaintenanceRequest = mongoose.model(
  "MaintenanceRequest",
  new Schema(
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
  )
);

export const AuditCycle = mongoose.model(
  "AuditCycle",
  new Schema(
    {
      title: { type: String, required: true },
      scope: { type: String },
      dateRange: { type: String },
      auditors: [{ type: String }],
      items: [
        {
          asset: String,
          expectedLocation: String,
          verification: { type: String, enum: ["Verified", "Missing", "Damaged"] },
        },
      ],
      closed: { type: Boolean, default: false },
    },
    { timestamps: true }
  )
);
