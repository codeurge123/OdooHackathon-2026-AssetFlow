import { motion } from 'framer-motion'
import Panel from '../components/Panel'

function DashboardPage({ data, setActive }) {
  const dashboard = data.dashboard || { kpis: {}, overdueReturns: 0 }
  const kpis = [
    ['Assets Available', dashboard.kpis.assetsAvailable || 0],
    ['Assets Allocated', dashboard.kpis.assetsAllocated || 0],
    ['Under Maintenance', dashboard.kpis.underMaintenance || 0],
    ['Active Bookings', dashboard.kpis.activeBookings || 0],
    ['Pending Transfers', dashboard.kpis.pendingTransfers || 0],
    ['Upcoming Returns', dashboard.kpis.upcomingReturns || 0],
  ]

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-slate-950">Today&apos;s Overview</h2>
        <p className="mt-1 text-sm text-slate-600">Operational snapshot across assets, resources, maintenance, transfers, and returns.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {kpis.map(([label, value]) => (
          <motion.div whileHover={{ y: -3 }} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" key={label}>
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
          </motion.div>
        ))}
      </div>
      <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{dashboard.overdueReturns || 0} assets overdue for return - flagged for follow-up</div>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-lg bg-cyan-700 px-4 py-3 text-sm font-bold text-white" onClick={() => setActive('Assets')}>Register Asset</button>
        <button className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700" onClick={() => setActive('Resource Booking')}>Book Resource</button>
        <button className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700" onClick={() => setActive('Maintenance')}>Raise Maintenance Request</button>
      </div>
      <Panel title="Recent Activity">
        <div className="space-y-3 text-sm text-slate-700">
          <p>Laptop AF-0119 allocated to Priya Shah - IT dept</p>
          <p>Room B2 booking confirmed - 2:00 to 3:00 PM</p>
          <p>Projector AF-0062 maintenance resolved</p>
        </div>
      </Panel>
    </div>
  )
}

export default DashboardPage
