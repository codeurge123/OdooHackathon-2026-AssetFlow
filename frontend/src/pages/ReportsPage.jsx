import Panel from '../components/Panel'

function ReportsPage({ data }) {
  const reports = data.reports || { mostUsedAssets: [], idleAssets: [], dueForMaintenance: [] }
  const utilization = reports.utilizationByDepartment || []
  return (
    <Panel title="Reports & Analytics">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-black text-slate-800">Utilization by department</h3>
          <div className="mt-6 flex h-40 items-end gap-3">
            {utilization.map((item) => <div className="flex-1 rounded-t-lg bg-amber-300 ring-1 ring-amber-400" key={item.department} title={item.department} style={{ height: `${item.utilization}%` }} />)}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-black text-slate-800">Maintenance frequency</h3>
          <svg className="mt-6 h-40 w-full" viewBox="0 0 320 150" role="img" aria-label="Maintenance trend line">
            <polyline fill="none" points="8,128 62,72 112,92 166,42 210,70 258,28 312,12" stroke="#0e7490" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          </svg>
        </div>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="font-black text-slate-900">Most used assets</h3>
          {reports.mostUsedAssets.map((asset) => <p className="mt-2 text-sm text-slate-600" key={asset}>{asset}</p>)}
        </div>
        <div>
          <h3 className="font-black text-slate-900">Idle assets</h3>
          {reports.idleAssets.map((asset) => <p className="mt-2 text-sm text-slate-600" key={asset}>{asset}</p>)}
        </div>
      </div>
      <div className="mt-5 border-t border-slate-200 pt-5">
        <h3 className="font-black text-slate-900">Assets due for maintenance / nearing retirement</h3>
        {reports.dueForMaintenance.map((asset) => <p className="mt-2 text-sm text-slate-600" key={asset}>{asset}</p>)}
        <button className="mt-4 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700">Export Report</button>
      </div>
    </Panel>
  )
}

export default ReportsPage
