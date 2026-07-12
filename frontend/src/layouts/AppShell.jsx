import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import {
  FiChevronUp,
  FiLock,
  FiLogOut,
  FiSave,
  FiSettings,
  FiX,
} from 'react-icons/fi'
import { navItems } from '../data/assetFlowData'

function AppShell({
  active,
  setActive,
  children,
  onLogout,
  onChangePassword,
}) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const updatePassword = (field, value) => {
    setPasswords((current) => ({ ...current, [field]: value }))
  }

  const handleLogout = () => {
    setSettingsOpen(false)
    onLogout?.()
  }

  const openPasswordModal = () => {
    setError('')
    setSettingsOpen(false)
    setPasswordModalOpen(true)
  }

  const handleChangePassword = async (event) => {
    event.preventDefault()
    setError('')

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match.')
      return
    }

    setSaving(true)

    try {
      await onChangePassword?.({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      })

      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setPasswordModalOpen(false)
    } catch (err) {
      setError(err.message || 'Unable to change password. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col border-r border-slate-200 bg-white p-3 shadow-sm lg:flex">
        <div className="border-b border-slate-200 px-3 py-4">
          <h1 className="text-xl font-black text-slate-950">AssetFlow</h1>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-700">
            Enterprise Asset & Resource ERP
          </p>
        </div>

        <nav className="mt-4 grid gap-1">
          {navItems.map((item) => (
            <button
              className={`rounded-md px-3 py-2 text-left text-sm font-semibold transition ${
                active === item
                  ? 'bg-cyan-50 text-cyan-800 ring-1 ring-cyan-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
              key={item}
              onClick={() => setActive(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="relative mt-auto border-t border-slate-200 pt-3">
          <AnimatePresence>
            {settingsOpen && (
              <motion.div
                className="absolute bottom-[58px] left-0 right-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.16 }}
              >
                <button
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-800"
                  onClick={openPasswordModal}
                  type="button"
                >
                  <FiLock className="h-4 w-4" />
                  Change Password
                </button>

                <button
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                  onClick={handleLogout}
                  type="button"
                >
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold transition ${
              settingsOpen
                ? 'bg-slate-100 text-slate-950'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            }`}
            onClick={() => setSettingsOpen((current) => !current)}
            type="button"
          >
            <span className="flex items-center gap-3">
              <FiSettings className="h-5 w-5" />
              Settings
            </span>
            <FiChevronUp
              className={`h-4 w-4 transition ${settingsOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </aside>

      <div className="lg:ml-[250px]">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-xl font-black text-slate-950">AssetFlow</h1>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-700">
                Enterprise Asset & Resource ERP
              </p>
            </div>

            <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 sm:block">
              Admin workspace
            </div>
          </div>
        </header>

        <div className="border-b border-slate-200 bg-white p-3 lg:hidden">
          <nav className="flex gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <button
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition ${
                  active === item
                    ? 'bg-cyan-50 text-cyan-800 ring-1 ring-cyan-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
                key={item}
                onClick={() => setActive(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {passwordModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setPasswordModalOpen(false)}
          >
            <motion.form
              aria-modal="true"
              className="w-full max-w-md rounded-xl bg-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onMouseDown={(event) => event.stopPropagation()}
              onSubmit={handleChangePassword}
              role="dialog"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">
                    Change Password
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter your current password and a new password.
                  </p>
                </div>

                <button
                  aria-label="Close password dialog"
                  className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                  onClick={() => setPasswordModalOpen(false)}
                  type="button"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 p-6">
                {error && (
                  <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {error}
                  </p>
                )}

                <label className="block text-sm font-semibold text-slate-700">
                  Current Password
                  <input
                    className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                    required
                    type="password"
                    value={passwords.currentPassword}
                    onChange={(event) =>
                      updatePassword('currentPassword', event.target.value)
                    }
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  New Password
                  <input
                    className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                    required
                    type="password"
                    value={passwords.newPassword}
                    onChange={(event) =>
                      updatePassword('newPassword', event.target.value)
                    }
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Confirm New Password
                  <input
                    className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                    required
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={(event) =>
                      updatePassword('confirmPassword', event.target.value)
                    }
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setPasswordModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>

                <button
                  className="inline-flex items-center gap-2 rounded-md bg-cyan-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={saving}
                  type="submit"
                >
                  <FiSave className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Password'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AppShell