import { Asset, MaintenanceRequest } from "../models/index.js";
import { listRecords } from "../services/dataSource.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getReports = asyncHandler(async (req, res) => {
  const assets = await listRecords("assets", Asset);
  const maintenance = await listRecords("maintenanceRequests", MaintenanceRequest);

  res.json({
    utilizationByDepartment: [
      { department: "Engineering", utilization: 72 },
      { department: "Facilities", utilization: 54 },
      { department: "Field Ops", utilization: 81 },
    ],
    mostUsedAssets: ["Room B2", "Van AF-313", "Projector AF-335"],
    idleAssets: assets.filter((asset) => asset.status === "Available").map((asset) => asset.name),
    dueForMaintenance: maintenance.filter((request) => request.status !== "Resolved").map((request) => request.assetTag),
  });
});
