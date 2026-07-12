import { dashboard } from "../data/seedData.js";
import {
  Asset,
  AuditCycle,
  Booking,
  Category,
  Department,
  Employee,
  MaintenanceRequest,
} from "../models/assetFlow.model.js";
import {
  createRecord,
  deleteRecord,
  hasMongoConnection,
  listRecords,
  updateRecord,
} from "../services/dataSource.service.js";
import asyncHandler from "../utils/asyncHandler.js";

const collectionMap = {
  assets: { model: Asset, collection: "assets" },
  auditCycles: { model: AuditCycle, collection: "auditCycles" },
  bookings: { model: Booking, collection: "bookings" },
  categories: { model: Category, collection: "categories" },
  departments: { model: Department, collection: "departments" },
  employees: { model: Employee, collection: "employees" },
  maintenanceRequests: { model: MaintenanceRequest, collection: "maintenanceRequests" },
  notifications: { model: null, collection: "notifications" },
};

const createCrudHandlers = (key) => {
  const { model, collection } = collectionMap[key];
  return {
    list: asyncHandler(async (req, res) => {
      res.json(await listRecords(collection, model));
    }),
    create: asyncHandler(async (req, res) => {
      res.status(201).json(await createRecord(collection, model, req.body));
    }),
    remove: asyncHandler(async (req, res) => {
      const deleted = await deleteRecord(collection, model, req.params.id);
      if (!deleted) return res.status(404).json({ message: "Record not found" });
      res.json(deleted);
    }),
    update: asyncHandler(async (req, res) => {
      const updated = await updateRecord(collection, model, req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Record not found" });
      res.json(updated);
    }),
  };
};

export const getHealth = (req, res) => {
  res.json({
    status: "ok",
    database: hasMongoConnection() ? "mongodb-connected" : "seed-data",
  });
};

export const getDashboard = asyncHandler(async (req, res) => {
  const currentAssets = await listRecords("assets", Asset);
  const currentBookings = await listRecords("bookings", Booking);
  const currentMaintenance = await listRecords("maintenanceRequests", MaintenanceRequest);

  res.json({
    ...dashboard,
    kpis: {
      assetsAvailable: currentAssets.filter((asset) => asset.status === "Available").length,
      assetsAllocated: currentAssets.filter((asset) => asset.status === "Allocated").length,
      underMaintenance: currentMaintenance.filter((request) => request.status !== "Resolved").length,
      activeBookings: currentBookings.filter((booking) => booking.status !== "Cancelled").length,
      pendingTransfers: dashboard.kpis.pendingTransfers,
      upcomingReturns: dashboard.kpis.upcomingReturns,
    },
  });
});

export const getOrganization = asyncHandler(async (req, res) => {
  res.json({
    departments: await listRecords("departments", Department),
    categories: await listRecords("categories", Category),
    employees: await listRecords("employees", Employee),
  });
});

export const departmentHandlers = createCrudHandlers("departments");
export const categoryHandlers = createCrudHandlers("categories");
export const employeeHandlers = createCrudHandlers("employees");
export const assetHandlers = createCrudHandlers("assets");
export const maintenanceHandlers = createCrudHandlers("maintenanceRequests");
export const auditHandlers = createCrudHandlers("auditCycles");
export const notificationHandlers = createCrudHandlers("notifications");

export const allocateAsset = asyncHandler(async (req, res) => {
  const currentAssets = await listRecords("assets", Asset);
  const asset = currentAssets.find((item) => item.id === req.params.id || item.tag === req.params.id);
  if (!asset) return res.status(404).json({ message: "Asset not found" });

  if (asset.status !== "Available") {
    return res.status(409).json({
      message: "Asset is already allocated or unavailable",
      currentlyHeldBy: asset.holder,
      suggestedAction: "Create a transfer request",
    });
  }

  const updated = await updateRecord("assets", Asset, req.params.id, {
    holder: req.body.holder,
    status: "Allocated",
  });
  res.status(201).json(updated);
});

export const getBookings = asyncHandler(async (req, res) => {
  res.json(await listRecords("bookings", Booking));
});

export const createBooking = asyncHandler(async (req, res) => {
  const { resource, start, end } = req.body;
  const requestedStart = new Date(start);
  const requestedEnd = new Date(end);
  const existingBookings = await listRecords("bookings", Booking);
  const conflict = existingBookings.find((booking) => {
    if (booking.resource !== resource || booking.status === "Cancelled") return false;
    return requestedStart < new Date(booking.end) && requestedEnd > new Date(booking.start);
  });

  if (conflict) {
    return res.status(409).json({ message: "Requested slot overlaps with an existing booking", conflict });
  }

  res.status(201).json(await createRecord("bookings", Booking, { ...req.body, status: req.body.status || "Upcoming" }));
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const deleted = await deleteRecord("bookings", Booking, req.params.id);
  if (!deleted) return res.status(404).json({ message: "Booking not found" });
  res.json(deleted);
});

export const getReports = asyncHandler(async (req, res) => {
  const currentAssets = await listRecords("assets", Asset);
  const maintenance = await listRecords("maintenanceRequests", MaintenanceRequest);

  res.json({
    utilizationByDepartment: [
      { department: "Engineering", utilization: 72 },
      { department: "Facilities", utilization: 54 },
      { department: "Field Ops", utilization: 81 },
    ],
    mostUsedAssets: ["Room B2", "Van AF-313", "Projector AF-335"],
    idleAssets: currentAssets.filter((asset) => asset.status === "Available").map((asset) => asset.name),
    dueForMaintenance: maintenance.filter((request) => request.status !== "Resolved").map((request) => request.assetTag),
  });
});
