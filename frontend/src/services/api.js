const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api'

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.message || 'Request failed')
  }
  return data
}

export const api = {
  login: (payload) => request('/login', { method: 'POST', body: JSON.stringify(payload) }),
  createEmployeeAccount: (payload) => request('/employee/signup', { method: 'POST', body: JSON.stringify(payload) }),
  getDashboard: () => request('/dashboard'),
  getOrganization: () => request('/organization'),
  getAssets: () => request('/assets'),
  getBookings: () => request('/bookings'),
  getMaintenance: () => request('/maintenance'),
  getAudits: () => request('/audits'),
  getReports: () => request('/reports'),
  getNotifications: (audience = 'Admin') => request(`/notifications?audience=${encodeURIComponent(audience)}`),

  createDepartment: (payload) => request('/departments', { method: 'POST', body: JSON.stringify(payload) }),
  deleteDepartment: (id) => request(`/departments/${id}`, { method: 'DELETE' }),

  createCategory: (payload) => request('/categories', { method: 'POST', body: JSON.stringify(payload) }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: 'DELETE' }),

  createEmployee: (payload) => request('/employees', { method: 'POST', body: JSON.stringify(payload) }),
  deleteEmployee: (id) => request(`/employees/${id}`, { method: 'DELETE' }),

  createAsset: (payload) => request('/assets', { method: 'POST', body: JSON.stringify(payload) }),
  deleteAsset: (id) => request(`/assets/${id}`, { method: 'DELETE' }),
  allocateAsset: (id, payload) => request(`/assets/${id}/allocate`, { method: 'POST', body: JSON.stringify(payload) }),

  createBooking: (payload) => request('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  deleteBooking: (id) => request(`/bookings/${id}`, { method: 'DELETE' }),

  createMaintenance: (payload) => request('/maintenance', { method: 'POST', body: JSON.stringify(payload) }),
  updateMaintenance: (id, payload) => request(`/maintenance/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deleteMaintenance: (id) => request(`/maintenance/${id}`, { method: 'DELETE' }),

  createAudit: (payload) => request('/audits', { method: 'POST', body: JSON.stringify(payload) }),
  deleteAudit: (id) => request(`/audits/${id}`, { method: 'DELETE' }),

  createNotification: (payload) => request('/notifications', { method: 'POST', body: JSON.stringify(payload) }),
  deleteNotification: (id) => request(`/notifications/${id}`, { method: 'DELETE' }),
}
