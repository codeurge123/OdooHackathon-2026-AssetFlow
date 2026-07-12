import { useCallback, useState } from 'react'
import AppShell from './layouts/AppShell'
import AllocationTransferPage from './pages/AllocationTransferPage'
import AssetsPage from './pages/AssetsPage'
import AuditPage from './pages/AuditPage'
import DashboardPage from './pages/DashboardPage'
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
  const ActiveScreen = screens[active]

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [dashboard, organization, assets, bookings, maintenance, audits, reports, notifications] = await Promise.all([
        api.getDashboard(),
        api.getOrganization(),
        api.getAssets(),
        api.getBookings(),
        api.getMaintenance(),
        api.getAudits(),
        api.getReports(),
        api.getNotifications(),
      ])
      setData({ dashboard, organization, assets, bookings, maintenance, audits, reports, notifications })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [])

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
    return <LoginPage onLogin={() => {
      setSignedIn(true)
      loadData()
    }} />
  }

  return (
    <AppShell active={active} setActive={setActive}>
      {error && <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</div>}
      {loading && <div className="mb-4 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">Syncing with backend...</div>}
      <ActiveScreen data={data} runAction={runAction} setActive={setActive} />
    </AppShell>
  )
}

export default App
