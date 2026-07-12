import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    resource: { type: String, required: true },
    bookedBy: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    status: { type: String, enum: ["Requested", "Upcoming", "Ongoing", "Completed", "Cancelled"], default: "Upcoming" },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
