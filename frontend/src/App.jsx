import { useCallback, useState } from 'react'
import AppShell from './layouts/AppShell'
import AllocationTransferPage from './pages/AllocationTransferPage'
import AssetsPage from './pages/AssetsPage'
import AuditPage from './pages/AuditPage'
import DashboardPage from './pages/DashboardPage'
import EmployeeWorkspacePage from './pages/EmployeeWorkspacePage'
import LoginPage from './pages/LoginPage'
import MaintenancePage from './pages/MaintenancePage'
import NotificationsPage from './pages/NotificationsPage'
import OrganizationSetupPage from './pages/OrganizationSetupPage'
import ReportsPage from './pages/ReportsPage'
import ResourceBookingPage from './pages/ResourceBookingPage'
import { api } from './services/api'
import './App.css'

const screens = {
  Dashboard: DashboardPage,
  'Organization setup': OrganizationSetupPage,
  Assets: AssetsPage,
  'Allocation & Transfer': AllocationTransferPage,
  'Resource Booking': ResourceBookingPage,
  Maintenance: MaintenancePage,
  Audit: AuditPage,
  Reports: ReportsPage,
  Notifications: NotificationsPage,
}

const initialData = {
  dashboard: null,
  organization: { departments: [], categories: [], employees: [] },
  assets: [],
  bookings: [],
  maintenance: [],
  audits: [],
  reports: null,
  notifications: [],
}

function App() {
  const [signedIn, setSignedIn] = useState(false)
  const [active, setActive] = useState('Dashboard')
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [authError, setAuthError] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const ActiveScreen = screens[active]

  const loadData = useCallback(async (user = currentUser) => {
    setLoading(true)
    setError('')
    try {
      const audience = user?.role === 'Admin' ? 'Admin' : 'Employee'
      const [dashboard, organization, assets, bookings, maintenance, audits, reports, notifications] = await Promise.all([
        api.getDashboard(),
        api.getOrganization(),
        api.getAssets(),
        api.getBookings(),
        api.getMaintenance(),
        api.getAudits(),
        api.getReports(),
        api.getNotifications(audience),
      ])
      setData({ dashboard, organization, assets, bookings, maintenance, audits, reports, notifications })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  const handleAuthenticated = async (user) => {
    setCurrentUser(user)
    setSignedIn(true)
    setActive(user.role === 'Admin' ? 'Dashboard' : 'Employee Workspace')
    await loadData(user)
  }

  const handleLogin = async (credentials) => {
    setAuthError('')
    try {
      const result = await api.login(credentials)
      await handleAuthenticated(result.user)
    } catch (requestError) {
      setAuthError(requestError.message)
    }
  }

  const handleCreateAccount = async (payload) => {
    setAuthError('')
    try {
      const result = await api.createEmployeeAccount(payload)
      await handleAuthenticated(result.user)
    } catch (requestError) {
      setAuthError(requestError.message)
    }
  }

  const runAction = async (action) => {
    setError('')
    try {
      await action()
      await loadData()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  if (!signedIn) {
    return <LoginPage authError={authError} onCreateAccount={handleCreateAccount} onLogin={handleLogin} />
  }

  if (currentUser?.role === 'Employee') {
    return (
      <EmployeeWorkspacePage
        currentUser={currentUser}
        data={data}
        runAction={runAction}
        onLogout={() => {
          setSignedIn(false)
          setCurrentUser(null)
          setData(initialData)
        }}
      />
    )
  }

  return (
    <AppShell active={active} currentUser={currentUser} setActive={setActive} onLogout={() => {
      setSignedIn(false)
      setCurrentUser(null)
      setData(initialData)
    }}>
      {error && <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</div>}
      {loading && <div className="mb-4 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">Syncing with backend...</div>}
      <ActiveScreen currentUser={currentUser} data={data} runAction={runAction} setActive={setActive} />
    </AppShell>
  )
}

export default App
