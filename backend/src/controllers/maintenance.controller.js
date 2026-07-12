import { MaintenanceRequest } from "../models/index.js";
import { createRecord, deleteRecord, listRecords, updateRecord } from "../services/dataSource.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getMaintenanceRequests = asyncHandler(async (req, res) => {
  res.json(await listRecords("maintenanceRequests", MaintenanceRequest));
});

export const createMaintenanceRequest = asyncHandler(async (req, res) => {
  const request = await createRecord("maintenanceRequests", MaintenanceRequest, req.body);

  if (request.requestedByRole === "Employee") {
    await createRecord("notifications", null, {
      type: "Approvals",
      audience: "Admin",
      text: `${request.requestedBy} raised maintenance request for ${request.assetTag}: ${request.title}`,
      age: "just now",
    });
  }

  res.status(201).json(request);
});

export const updateMaintenanceRequest = asyncHandler(async (req, res) => {
  const updated = await updateRecord("maintenanceRequests", MaintenanceRequest, req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Maintenance request not found" });

  if (updated.requestedByRole === "Employee" && ["Resolved", "Rejected"].includes(updated.status)) {
    await createRecord("notifications", null, {
      type: "Alerts",
      audience: "Employee",
      recipientEmail: updated.requesterEmail,
      recipientName: updated.requestedBy,
      text: `Your maintenance request for ${updated.assetTag} was ${updated.status.toLowerCase()}`,
      age: "just now",
    });
  }

  res.json(updated);
});

export const deleteMaintenanceRequest = asyncHandler(async (req, res) => {
  const deleted = await deleteRecord("maintenanceRequests", MaintenanceRequest, req.params.id);
  if (!deleted) return res.status(404).json({ message: "Maintenance request not found" });

  if (deleted.requestedByRole === "Employee") {
    await createRecord("notifications", null, {
      type: "Alerts",
      audience: "Admin",
      text: `${deleted.requestedBy} deleted maintenance request for ${deleted.assetTag}`,
      age: "just now",
    });
  }

  res.json(deleted);
});
