import { Asset } from "../models/index.js";
import { createRecord, deleteRecord, listRecords, updateRecord } from "../services/dataSource.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAssets = asyncHandler(async (req, res) => {
  res.json(await listRecords("assets", Asset));
});

export const createAsset = asyncHandler(async (req, res) => {
  res.status(201).json(await createRecord("assets", Asset, req.body));
});

const notifyAssetHolder = async (asset, payload) => {
  if (!payload.holder && !payload.holderEmail) return;
  await createRecord("notifications", null, {
    type: "Alerts",
    audience: "Employee",
    recipientEmail: payload.holderEmail,
    recipientName: payload.holder,
    text: `${asset.name} (${asset.tag}) was allocated/transferred to you`,
    age: "just now",
  });
};

export const updateAsset = asyncHandler(async (req, res) => {
  const updated = await updateRecord("assets", Asset, req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Asset not found" });

  if (req.body.holder || req.body.holderEmail) await notifyAssetHolder(updated, req.body);

  res.json(updated);
});

export const deleteAsset = asyncHandler(async (req, res) => {
  const deleted = await deleteRecord("assets", Asset, req.params.id);
  if (!deleted) return res.status(404).json({ message: "Asset not found" });
  res.json(deleted);
});

export const allocateAsset = asyncHandler(async (req, res) => {
  const assets = await listRecords("assets", Asset);
  const asset = assets.find((item) => item.id === req.params.id || item.tag === req.params.id);
  if (!asset) return res.status(404).json({ message: "Asset not found" });

  if (asset.status !== "Available") {
    return res.status(409).json({
      message: "Asset is already allocated or unavailable",
      currentlyHeldBy: asset.holder,
      suggestedAction: "Create a transfer request",
    });
  }

  const updated = await updateRecord("assets", Asset, req.params.id, { holder: req.body.holder, holderEmail: req.body.holderEmail, status: "Allocated" });
  await notifyAssetHolder(updated, req.body);
  res.status(201).json(updated);
});
