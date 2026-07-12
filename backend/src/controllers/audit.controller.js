import { AuditCycle } from "../models/index.js";
import { createRecord, deleteRecord, listRecords, updateRecord } from "../services/dataSource.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAudits = asyncHandler(async (req, res) => {
  res.json(await listRecords("auditCycles", AuditCycle));
});

export const createAudit = asyncHandler(async (req, res) => {
  res.status(201).json(await createRecord("auditCycles", AuditCycle, req.body));
});

export const updateAudit = asyncHandler(async (req, res) => {
  const updated = await updateRecord("auditCycles", AuditCycle, req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Audit cycle not found" });
  res.json(updated);
});

export const deleteAudit = asyncHandler(async (req, res) => {
  const deleted = await deleteRecord("auditCycles", AuditCycle, req.params.id);
  if (!deleted) return res.status(404).json({ message: "Audit cycle not found" });
  res.json(deleted);
});
