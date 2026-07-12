import { MaintenanceRequest } from "../models/index.js";
import { createRecord, deleteRecord, listRecords, updateRecord } from "../services/dataSource.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getMaintenanceRequests = asyncHandler(async (req, res) => {
  res.json(await listRecords("maintenanceRequests", MaintenanceRequest));
});

export const createMaintenanceRequest = asyncHandler(async (req, res) => {
  res.status(201).json(await createRecord("maintenanceRequests", MaintenanceRequest, req.body));
});

export const updateMaintenanceRequest = asyncHandler(async (req, res) => {
  const updated = await updateRecord("maintenanceRequests", MaintenanceRequest, req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Maintenance request not found" });
  res.json(updated);
});

export const deleteMaintenanceRequest = asyncHandler(async (req, res) => {
  const deleted = await deleteRecord("maintenanceRequests", MaintenanceRequest, req.params.id);
  if (!deleted) return res.status(404).json({ message: "Maintenance request not found" });
  res.json(deleted);
});
