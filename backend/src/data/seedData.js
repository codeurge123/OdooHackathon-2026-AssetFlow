export const departments = [
  { name: "Engineering", head: "Aditi Rao", parentDepartment: null, status: "Active" },
  { name: "Facilities", head: "Rohan Mehta", parentDepartment: null, status: "Active" },
  { name: "Field Ops (East)", head: "Sana Iqbal", parentDepartment: "Field Ops", status: "Inactive" },
];

export const categories = [
  { name: "Electronics", customFields: ["Warranty period", "Serial number"], status: "Active" },
  { name: "Furniture", customFields: ["Material", "Floor location"], status: "Active" },
  { name: "Vehicles", customFields: ["Mileage", "Service cycle"], status: "Active" },
];

export const employees = [
  { name: "Priya Shah", email: "priya@assetflow.test", department: "Engineering", role: "Employee", status: "Active" },
  { name: "Aditi Rao", email: "aditi@assetflow.test", department: "Engineering", role: "Department Head", status: "Active" },
  { name: "Rohan Mehta", email: "rohan@assetflow.test", department: "Facilities", role: "Asset Manager", status: "Active" },
];

export const assets = [
  {
    tag: "AF-0114",
    name: "Dell Laptop",
    category: "Electronics",
    status: "Allocated",
    holder: "Priya Shah",
    location: "Bengaluru",
    condition: "Good",
    sharedBookable: false,
  },
  {
    tag: "AF-0062",
    name: "Projector",
    category: "Electronics",
    status: "Under Maintenance",
    holder: null,
    location: "HQ Floor 2",
    condition: "Faulty bulb",
    sharedBookable: true,
  },
  {
    tag: "AF-0201",
    name: "Office Chair",
    category: "Furniture",
    status: "Available",
    holder: null,
    location: "Warehouse",
    condition: "Good",
    sharedBookable: false,
  },
  {
    tag: "AF-0301",
    name: "Camera Kit",
    category: "Electronics",
    status: "Reserved",
    holder: "Media Team",
    location: "Studio",
    condition: "Excellent",
    sharedBookable: true,
  },
];

export const bookings = [
  {
    resource: "Conference room B2",
    bookedBy: "Procurement Team",
    start: "2026-07-07T09:00:00.000Z",
    end: "2026-07-07T10:00:00.000Z",
    status: "Upcoming",
  },
];

export const maintenanceRequests = [
  { assetTag: "AF-0062", title: "Projector bulb not turning on", status: "Pending", priority: "High" },
  { assetTag: "AF-003", title: "AC unit noisy compressor", status: "Approved", priority: "Medium" },
  { assetTag: "AF-0078", title: "Forklift service", status: "Technician Assigned", priority: "High" },
  { assetTag: "AF-897", title: "Printer jam", status: "In Progress", priority: "Low" },
  { assetTag: "AF-873", title: "Chair repair", status: "Resolved", priority: "Low" },
];

export const auditCycles = [
  {
    title: "Q3 audit: Engineering dept",
    dateRange: "1 to 15 Jul",
    auditors: ["Aditi Rao", "Sana Iqbal"],
    items: [
      { asset: "AF-003 Dell Laptop", expectedLocation: "Desk E12", verification: "Verified" },
      { asset: "AF-9921 Office Chair", expectedLocation: "Desk E14", verification: "Missing" },
      { asset: "AF-9838 Monitor", expectedLocation: "Desk E15", verification: "Damaged" },
    ],
  },
];

export const notifications = [
  { type: "Alerts", text: "Laptop AF-0014 assigned to Priya Shah", age: "2m ago" },
  { type: "Approvals", text: "Maintenance request AF-0055 approved", age: "18m ago" },
  { type: "Bookings", text: "Booking confirmed: Room B2, 2:00 to 3:00 PM", age: "1h ago" },
  { type: "Approvals", text: "Transfer approved: AF-0033 to Facilities dept", age: "3h ago" },
  { type: "Alerts", text: "Overdue return: AF-0021 was due 3 days ago", age: "1d ago" },
  { type: "Alerts", text: "Audit discrepancy flagged: AF-0098 damaged", age: "2d ago" },
];

export const dashboard = {
  kpis: {
    assetsAvailable: 128,
    assetsAllocated: 76,
    underMaintenance: 4,
    activeBookings: 9,
    pendingTransfers: 3,
    upcomingReturns: 12,
  },
  overdueReturns: 3,
};
