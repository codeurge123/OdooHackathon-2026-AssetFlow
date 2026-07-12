import { useMemo, useState } from 'react'
import Panel from '../components/Panel'
import { api } from '../services/api'

function NotificationsPage({ data, runAction }) {
  const [filter, setFilter] = useState('All')
  const [text, setText] = useState('')
  const visible = useMemo(() => {
    const notifications = data.notifications || []
    return filter === 'All' ? notifications : notifications.filter((item) => item.type === filter)
  }, [data.notifications, filter])

  const handleSubmit = (event) => {
    event.preventDefault()
    runAction(async () => {
      await api.createNotification({ type: 'Alerts', text, age: 'just now' })
      setText('')
    })
  }

  return (
    <Panel title="Activity Logs & Notifications">
      <form className="mb-4 grid gap-3 md:grid-cols-[1fr_130px]" onSubmit={handleSubmit}>
        <input className="rounded-lg border border-slate-300 px-4 py-3 text-sm" placeholder="Add notification..." required value={text} onChange={(event) => setText(event.target.value)} />
        <button className="rounded-lg bg-cyan-700 px-4 py-3 text-sm font-bold text-white">Add</button>
      </form>
      <div className="mb-4 flex flex-wrap gap-2">
        {['All', 'Alerts', 'Approvals', 'Bookings'].map((item) => (
          <button className={`rounded-lg px-4 py-2 text-sm font-bold ${filter === item ? 'bg-cyan-50 text-cyan-800 ring-1 ring-cyan-200' : 'bg-slate-100 text-slate-600'}`} key={item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
        {visible.map((item) => (
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 text-sm" key={item.id || `${item.text}-${item.age}`}>
            <p className="font-semibold text-slate-700">{item.text}</p>
            <span className="text-slate-500">{item.age}</span>
            <button className="rounded-md border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-700" onClick={() => runAction(() => api.deleteNotification(item.id))} type="button">Delete</button>
          </div>
        ))}
      </div>
    </Panel>
  )
}

export default NotificationsPage
