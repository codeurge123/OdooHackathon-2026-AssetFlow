import ResourceBookingPage from './ResourceBookingPage'
import Panel from '../components/Panel'
import Pill from '../components/Pill'

function EmployeeWorkspacePage({ currentUser, data, runAction, onLogout }) {
  const employeeAssets = (data.assets || []).filter((asset) => asset.holder === currentUser.name)
  const employeeBookings = (data.bookings || []).filter((booking) => booking.bookedBy === currentUser.name)

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h1 className="text-xl font-black text-slate-950">AssetFlow Employee</h1>
            <p className="text-sm text-slate-600">{currentUser.name} - {currentUser.department || 'Unassigned'}</p>
          </div>
          <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700" onClick={onLogout} type="button">Logout</button>
        </header>

        <Panel title="Allocated Resources">
          <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
            {employeeAssets.length === 0 && <p className="p-4 text-sm text-slate-500">No allocated assets yet.</p>}
            {employeeAssets.map((asset) => (
              <div className="grid gap-3 px-4 py-3 text-sm md:grid-cols-[1fr_1fr_auto]" key={asset.id || asset.tag}>
                <p className="font-bold text-slate-900">{asset.tag} - {asset.name}</p>
                <p>{asset.location}</p>
                <Pill>{asset.status}</Pill>
              </div>
            ))}
          </div>
        </Panel>

        <ResourceBookingPage data={data} runAction={runAction} currentUser={currentUser} readOnly={false} />

        <Panel title="Request Timeline">
          <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
            {employeeBookings.length === 0 && <p className="p-4 text-sm text-slate-500">No resource requests yet.</p>}
            {employeeBookings.map((booking) => (
              <div className="grid gap-3 px-4 py-3 text-sm md:grid-cols-[1fr_1fr_auto]" key={booking.id || booking.start}>
                <p className="font-bold text-slate-900">{booking.resource}</p>
                <p>{new Date(booking.start).toLocaleString()} - {new Date(booking.end).toLocaleTimeString()}</p>
                <Pill>{booking.status}</Pill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </main>
  )
}

export default EmployeeWorkspacePage
