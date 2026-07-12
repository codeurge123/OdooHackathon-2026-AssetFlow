import { createRecord, deleteRecord, listRecords } from "../services/dataSource.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await listRecords("notifications", null);
  const audience = req.query.audience;
  res.json(audience ? notifications.filter((item) => !item.audience || item.audience === audience) : notifications);
});

export const createNotification = asyncHandler(async (req, res) => {
  res.status(201).json(await createRecord("notifications", null, req.body));
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const deleted = await deleteRecord("notifications", null, req.params.id);
  if (!deleted) return res.status(404).json({ message: "Notification not found" });
  res.json(deleted);
});
