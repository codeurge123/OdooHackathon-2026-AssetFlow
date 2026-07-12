import { motion } from 'framer-motion'
import { useState } from 'react'
import Panel from '../components/Panel'
import { api } from '../services/api'

const statuses = ['Pending', 'Approved', 'Technician Assigned', 'In Progress', 'Resolved']
const blankRequest = { assetTag: '', title: '', priority: 'Medium', status: 'Pending' }

function MaintenancePage({ data, runAction }) {
  const [form, setForm] = useState(blankRequest)
  const maintenance = data.maintenance || []
  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    runAction(async () => {
      await api.createMaintenance(form)
      setForm(blankRequest)
    })
  }

  return (
    <Panel title="Maintenance Management">
      <form className="mb-5 grid gap-3 lg:grid-cols-[140px_1fr_150px_130px]" onSubmit={handleSubmit}>
        <input className="rounded-lg border border-slate-300 px-4 py-3 text-sm" placeholder="Asset tag" required value={form.assetTag} onChange={(event) => updateForm('assetTag', event.target.value)} />
        <input className="rounded-lg border border-slate-300 px-4 py-3 text-sm" placeholder="Issue title" required value={form.title} onChange={(event) => updateForm('title', event.target.value)} />
        <select className="rounded-lg border border-slate-300 px-4 py-3 text-sm" value={form.priority} onChange={(event) => updateForm('priority', event.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button className="rounded-lg bg-cyan-700 px-4 py-3 text-sm font-bold text-white">Add</button>
      </form>

      <div className="grid gap-3 overflow-x-auto md:grid-cols-5">
        {statuses.map((status) => (
          <div className="min-h-72 rounded-lg border border-slate-200 bg-slate-50 p-3" key={status}>
            <h3 className="mb-3 text-sm font-black text-slate-800">{status}</h3>
            {maintenance.filter((request) => request.status === status).map((request) => (
              <motion.div whileHover={{ y: -2 }} className="mb-3 rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-sm" key={request.id || `${request.assetTag}-${request.title}`}>
                <p className="font-bold text-slate-900">{request.assetTag}</p>
                <p className="mt-1 font-semibold text-slate-700">{request.title}</p>
                <p className="mt-1 text-xs text-slate-500">Priority: {request.priority}</p>
                <div className="mt-3 flex gap-2">
                  {status !== 'Resolved' && <button className="rounded-md bg-cyan-700 px-2 py-1 text-xs font-bold text-white" onClick={() => runAction(() => api.updateMaintenance(request.id, { status: statuses[statuses.indexOf(status) + 1] }))} type="button">Move</button>}
                  <button className="rounded-md border border-rose-200 px-2 py-1 text-xs font-bold text-rose-700" onClick={() => runAction(() => api.deleteMaintenance(request.id))} type="button">Delete</button>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </Panel>
  )
}

export default MaintenancePage
