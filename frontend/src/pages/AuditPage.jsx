import { useState } from 'react'
import Panel from '../components/Panel'
import Pill from '../components/Pill'
import { api } from '../services/api'

function AuditPage({ data, runAction }) {
  const audits = data.audits || []
  const [title, setTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    runAction(async () => {
      await api.createAudit({
        title,
        dateRange: 'Current cycle',
        auditors: ['Admin'],
        items: [],
      })
      setTitle('')
    })
  }

  return (
    <Panel title="Asset Audit">
      <form className="mb-5 grid gap-3 md:grid-cols-[1fr_130px]" onSubmit={handleSubmit}>
        <input className="rounded-lg border border-slate-300 px-4 py-3 text-sm" placeholder="Audit cycle title" required value={title} onChange={(event) => setTitle(event.target.value)} />
        <button className="rounded-lg bg-cyan-700 px-4 py-3 text-sm font-bold text-white">Add Audit</button>
      </form>
      <div className="space-y-4">
        {audits.map((audit) => (
          <div className="rounded-lg border border-slate-200 bg-white p-4" key={audit.id || audit.title}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-slate-900">{audit.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{audit.dateRange} - Auditors: {(audit.auditors || []).join(', ')}</p>
              </div>
              <button className="rounded-md border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-700" onClick={() => runAction(() => api.deleteAudit(audit.id))} type="button">Delete</button>
            </div>
            <div className="mt-4 divide-y divide-slate-100 rounded-lg border border-slate-200">
              {(audit.items || []).map((item) => (
                <div className="grid gap-3 px-4 py-3 text-sm md:grid-cols-[1fr_1fr_auto]" key={`${audit.id}-${item.asset}`}>
                  <p className="font-semibold text-slate-700">{item.asset}</p>
                  <p>{item.expectedLocation}</p>
                  <Pill>{item.verification}</Pill>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

export default AuditPage
