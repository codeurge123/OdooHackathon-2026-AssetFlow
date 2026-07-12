import { Booking } from "../models/index.js";
import { createRecord, deleteRecord, listRecords } from "../services/dataSource.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getBookings = asyncHandler(async (req, res) => {
  res.json(await listRecords("bookings", Booking));
});

export const createBooking = asyncHandler(async (req, res) => {
  const { resource, start, end, bookedBy, requestedByRole } = req.body;
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
      text: `${bookedBy} requested ${resource}`,
      age: "just now",
    });
  }

  res.status(201).json(booking);
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const deleted = await deleteRecord("bookings", Booking, req.params.id);
  if (!deleted) return res.status(404).json({ message: "Booking not found" });
  res.json(deleted);
});
