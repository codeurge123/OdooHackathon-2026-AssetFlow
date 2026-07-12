import { Router } from "express";
import {
  allocateAsset,
  assetHandlers,
  auditHandlers,
  categoryHandlers,
  createBooking,
  deleteBooking,
  departmentHandlers,
  employeeHandlers,
  getBookings,
  getDashboard,
  getHealth,
  getOrganization,
  getReports,
  maintenanceHandlers,
  notificationHandlers,
} from "../controllers/assetFlow.controller.js";

const router = Router();

router.route("/health").get(getHealth);
router.route("/dashboard").get(getDashboard);
router.route("/organization").get(getOrganization);
router.route("/reports").get(getReports);

router.route("/departments").get(departmentHandlers.list).post(departmentHandlers.create);
router.route("/departments/:id").patch(departmentHandlers.update).delete(departmentHandlers.remove);

router.route("/categories").get(categoryHandlers.list).post(categoryHandlers.create);
router.route("/categories/:id").patch(categoryHandlers.update).delete(categoryHandlers.remove);

router.route("/employees").get(employeeHandlers.list).post(employeeHandlers.create);
router.route("/employees/:id").patch(employeeHandlers.update).delete(employeeHandlers.remove);

router.route("/assets").get(assetHandlers.list).post(assetHandlers.create);
router.route("/assets/:id").patch(assetHandlers.update).delete(assetHandlers.remove);
router.route("/assets/:id/allocate").post(allocateAsset);

router.route("/bookings").get(getBookings).post(createBooking);
router.route("/bookings/:id").delete(deleteBooking);

router.route("/maintenance").get(maintenanceHandlers.list).post(maintenanceHandlers.create);
router.route("/maintenance/:id").patch(maintenanceHandlers.update).delete(maintenanceHandlers.remove);

router.route("/audits").get(auditHandlers.list).post(auditHandlers.create);
router.route("/audits/:id").patch(auditHandlers.update).delete(auditHandlers.remove);

router.route("/notifications").get(notificationHandlers.list).post(notificationHandlers.create);
router.route("/notifications/:id").delete(notificationHandlers.remove);

export default router;
