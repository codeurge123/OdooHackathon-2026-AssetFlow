import { useCallback, useEffect, useState } from 'react'
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
import { employeeNavItems } from './data/assetFlowData'
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

const employeeScreens = {
  'Personal Dashboard': EmployeeWorkspacePage,
  'Request Resource': ResourceBookingPage,
  Maintenance: MaintenancePage,
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

const SESSION_KEY = 'assetflow-session'
const THEME_KEY = 'assetflow-theme'

function App() {
  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY))
    } catch {
      return null
    }
  })()
  const [signedIn, setSignedIn] = useState(Boolean(savedUser))
  const [active, setActive] = useState(savedUser?.role === 'Employee' ? 'Personal Dashboard' : 'Dashboard')
  const [data, setData] = useState(initialData)
  const [error, setError] = useState('')
  const [authError, setAuthError] = useState('')
  const [currentUser, setCurrentUser] = useState(savedUser)
  const [readNotificationIds, setReadNotificationIds] = useState(() => new Set())
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light')
  const ActiveScreen = currentUser?.role === 'Employee' ? employeeScreens[active] : screens[active]

  const loadData = useCallback(async (user = currentUser) => {
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
        api.getNotifications(audience, user),
      ])
      setData({ dashboard, organization, assets, bookings, maintenance, audits, reports, notifications })
    } catch (requestError) {
      setError(requestError.message)
    }
  }, [currentUser])

  const handleAuthenticated = async (user) => {
    setCurrentUser(user)
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    setSignedIn(true)
    setActive(user.role === 'Admin' ? 'Dashboard' : 'Personal Dashboard')
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

  useEffect(() => {
    if (!currentUser) return undefined

    const initialLoad = window.setTimeout(() => {
      loadData(currentUser)
    }, 0)
    const interval = window.setInterval(() => {
      loadData(currentUser)
    }, 4000)

    return () => {
      window.clearTimeout(initialLoad)
      window.clearInterval(interval)
    }
  }, [currentUser, loadData])

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setSignedIn(false)
    setCurrentUser(null)
    setData(initialData)
  }

  const notificationIds = data.notifications.map((notification) => notification.id || notification.createdAt || notification.text)
  const unreadCount = notificationIds.filter((id) => !readNotificationIds.has(id)).length

  const markNotificationsRead = () => {
    setReadNotificationIds(new Set(notificationIds))
  }

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      localStorage.setItem(THEME_KEY, next)
      return next
    })
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  if (!signedIn) {
    return <LoginPage authError={authError} onCreateAccount={handleCreateAccount} onLogin={handleLogin} />
  }

  if (currentUser?.role === 'Employee') {
    return (
      <AppShell
        active={active}
        currentUser={currentUser}
        navItems={employeeNavItems}
        notificationCount={unreadCount}
        onLogout={logout}
        onNotificationsOpen={markNotificationsRead}
        onToggleTheme={toggleTheme}
        setActive={setActive}
        theme={theme}
      >
        {error && <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</div>}
        <ActiveScreen currentUser={currentUser} data={data} runAction={runAction} setActive={setActive} />
      </AppShell>
    )
  }

  return (
    <AppShell active={active} currentUser={currentUser} setActive={setActive} onLogout={() => {
      logout()
    }} notificationCount={unreadCount} onNotificationsOpen={markNotificationsRead} onToggleTheme={toggleTheme} theme={theme}>
      {error && <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</div>}
      <ActiveScreen currentUser={currentUser} data={data} runAction={runAction} setActive={setActive} />
    </AppShell>
  )
}

export default App
