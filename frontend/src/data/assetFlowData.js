export const navItems = [
  'Dashboard',
  'Organization setup',
  'Assets',
  'Allocation & Transfer',
  'Resource Booking',
  'Maintenance',
  'Audit',
  'Reports',
  'Notifications',
]

export const departments = [
  { name: 'Engineering', head: 'Aditi Rao', parent: '-', status: 'Active' },
  { name: 'Facilities', head: 'Rohan Mehta', parent: '-', status: 'Active' },
  { name: 'Field Ops (East)', head: 'Sana Iqbal', parent: 'Field Ops', status: 'Inactive' },
]

export const categories = [
  { name: 'Electronics', fields: 'Warranty period, serial number', assets: 82, status: 'Active' },
  { name: 'Furniture', fields: 'Material, floor location', assets: 46, status: 'Active' },
  { name: 'Vehicles', fields: 'Mileage, service cycle', assets: 12, status: 'Active' },
]

export const employees = [
  { name: 'Priya Shah', email: 'priya@assetflow.test', department: 'Engineering', role: 'Employee', status: 'Active' },
  { name: 'Aditi Rao', email: 'aditi@assetflow.test', department: 'Engineering', role: 'Department Head', status: 'Active' },
  { name: 'Rohan Mehta', email: 'rohan@assetflow.test', department: 'Facilities', role: 'Asset Manager', status: 'Active' },
]

export const assets = [
  { tag: 'AF-0114', name: 'Dell Laptop', category: 'Electronics', status: 'Allocated', holder: 'Priya Shah', location: 'Bengaluru', condition: 'Good' },
  { tag: 'AF-0062', name: 'Projector', category: 'Electronics', status: 'Under Maintenance', holder: '-', location: 'HQ Floor 2', condition: 'Faulty bulb' },
  { tag: 'AF-0201', name: 'Office Chair', category: 'Furniture', status: 'Available', holder: '-', location: 'Warehouse', condition: 'Good' },
  { tag: 'AF-0301', name: 'Camera Kit', category: 'Electronics', status: 'Reserved', holder: 'Media Team', location: 'Studio', condition: 'Excellent' },
]

export const maintenanceColumns = [
  { title: 'Pending', cards: ['AF-0062 Projector bulb not turning on'] },
  { title: 'Approved', cards: ['AF-003 AC unit noisy compressor'] },
  { title: 'Technician Assigned', cards: ['AF-0078 Forklift - tech: R Varma'] },
  { title: 'In Progress', cards: ['AF-897 Printer jam - parts ordered'] },
  { title: 'Resolved', cards: ['AF-873 Chair repair resolved 7 Jul'] },
]

export const auditRows = [
  { asset: 'AF-003 Dell Laptop', expected: 'Desk E12', verification: 'Verified' },
  { asset: 'AF-9921 Office Chair', expected: 'Desk E14', verification: 'Missing' },
  { asset: 'AF-9838 Monitor', expected: 'Desk E15', verification: 'Damaged' },
]

export const notifications = [
  { type: 'Alerts', text: 'Laptop AF-0014 assigned to Priya Shah', age: '2m ago' },
  { type: 'Approvals', text: 'Maintenance request AF-0055 approved', age: '18m ago' },
  { type: 'Bookings', text: 'Booking confirmed: Room B2, 2:00 to 3:00 PM', age: '1h ago' },
  { type: 'Approvals', text: 'Transfer approved: AF-0033 to Facilities dept', age: '3h ago' },
  { type: 'Alerts', text: 'Overdue return: AF-0021 was due 3 days ago', age: '1d ago' },
  { type: 'Alerts', text: 'Audit discrepancy flagged: AF-0098 damaged', age: '2d ago' },
]

export const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Inactive: 'bg-slate-100 text-slate-600 ring-slate-200',
  Available: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Allocated: 'bg-amber-50 text-amber-700 ring-amber-200',
  Reserved: 'bg-sky-50 text-sky-700 ring-sky-200',
  'Under Maintenance': 'bg-rose-50 text-rose-700 ring-rose-200',
  Verified: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Missing: 'bg-rose-50 text-rose-700 ring-rose-200',
  Damaged: 'bg-orange-50 text-orange-700 ring-orange-200',
}
