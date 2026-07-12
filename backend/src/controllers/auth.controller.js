import { createRecord, listRecords } from "../services/dataSource.service.js";
import { Employee } from "../models/employee.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const adminUser = {
  id: "admin-1",
  name: "AssetFlow Admin",
  email: "admin@assetflow.com",
  password: "Admin@123",
  role: "Admin",
};

export const login = asyncHandler(async (req, res) => {
  const { email, password, loginType } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
  if (!emailRegex.test(email)) return res.status(400).json({ message: "Enter a valid email address" });

  if (loginType === "admin") {
    if (email !== adminUser.email || password !== adminUser.password) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
    return res.json({ user: { id: adminUser.id, name: adminUser.name, email: adminUser.email, role: adminUser.role } });
  }

  const employees = await listRecords("employees", Employee);
  const employee = employees.find((item) => item.email === email && item.password === password);
  if (!employee) return res.status(401).json({ message: "Invalid employee credentials" });
  return res.json({ user: { id: employee.id, name: employee.name, email: employee.email, role: "Employee", department: employee.department } });
});

export const createEmployeeAccount = asyncHandler(async (req, res) => {
  const { name, email, password, department } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email, and password are required" });
  if (!emailRegex.test(email)) return res.status(400).json({ message: "Enter a valid email address" });
  if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

  const employees = await listRecords("employees", Employee);
  if (employees.some((item) => item.email === email)) return res.status(409).json({ message: "Employee account already exists" });

  const employee = await createRecord("employees", Employee, {
    name,
    email,
    password,
    department: department || "Unassigned",
    role: "Employee",
    status: "Active",
  });

  await createRecord("notifications", null, {
    type: "Alerts",
    audience: "Admin",
    text: `${name} created an employee account`,
    age: "just now",
  });

  res.status(201).json({ user: { id: employee.id, name: employee.name, email: employee.email, role: "Employee", department: employee.department } });
});
