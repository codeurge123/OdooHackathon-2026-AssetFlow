import { Booking } from "../models/index.js";
import { createRecord, deleteRecord, listRecords, updateRecord } from "../services/dataSource.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getBookings = asyncHandler(async (req, res) => {
  res.json(await listRecords("bookings", Booking));
});

export const createBooking = asyncHandler(async (req, res) => {
  const { resource, start, end, bookedBy, requesterEmail, requestedByRole } = req.body;
  const requestedStart = new Date(start);
  const requestedEnd = new Date(end);
  const bookings = await listRecords("bookings", Booking);
  const conflict = bookings.find((booking) => {
    if (booking.resource !== resource || booking.status === "Cancelled") return false;
    return requestedStart < new Date(booking.end) && requestedEnd > new Date(booking.start);
  });

  if (conflict) return res.status(409).json({ message: "Requested slot overlaps with an existing booking", conflict });

  const booking = await createRecord("bookings", Booking, {
    ...req.body,
    status: requestedByRole === "Employee" ? "Requested" : req.body.status || "Upcoming",
  });

  if (requestedByRole === "Employee") {
    await createRecord("notifications", null, {
      type: "Approvals",
      audience: "Admin",
      text: `${bookedBy} requested resource: ${resource}`,
      age: "just now",
    });
  }

  res.status(201).json(booking);
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const deleted = await deleteRecord("bookings", Booking, req.params.id);
  if (!deleted) return res.status(404).json({ message: "Booking not found" });

  if (deleted.requestedByRole === "Employee") {
    await createRecord("notifications", null, {
      type: "Alerts",
      audience: "Admin",
      text: `${deleted.bookedBy} deleted resource request: ${deleted.resource}`,
      age: "just now",
    });
  }

  res.json(deleted);
});

export const updateBooking = asyncHandler(async (req, res) => {
  const updated = await updateRecord("bookings", Booking, req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Booking not found" });

  if (updated.requestedByRole === "Employee" && ["Upcoming", "Rejected", "Cancelled", "Completed"].includes(updated.status)) {
    const statusText = updated.status === "Upcoming" ? "approved" : updated.status.toLowerCase();
    await createRecord("notifications", null, {
      type: "Alerts",
      audience: "Employee",
      recipientEmail: updated.requesterEmail,
      recipientName: updated.bookedBy,
      text: `Your resource request for ${updated.resource} was ${statusText}`,
      age: "just now",
    });
  }

  res.json(updated);
});
