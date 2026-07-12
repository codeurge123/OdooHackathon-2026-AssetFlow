import { useMemo, useState } from 'react'
import Panel from '../components/Panel'
import { api } from '../services/api'

const fromNow = (value, fallback = 'just now') => {
  if (!value) return fallback
  const diff = Date.now() - new Date(value).getTime()
  if (Number.isNaN(diff) || diff < 30_000) return 'just now'
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

function NotificationsPage({ data, runAction }) {
  const [filter, setFilter] = useState('All')
  const visible = useMemo(() => {
    const notifications = data.notifications || []
    return filter === 'All' ? notifications : notifications.filter((item) => item.type === filter)
  }, [data.notifications, filter])

  return (
    <Panel title="Activity Logs & Notifications">
      <div className="mb-4 flex flex-wrap gap-2">
        {['All', 'Alerts', 'Approvals', 'Bookings'].map((item) => (
          <button className={`rounded-lg px-4 py-2 text-sm font-bold ${filter === item ? 'bg-cyan-50 text-cyan-800 ring-1 ring-cyan-200' : 'bg-slate-100 text-slate-600'}`} key={item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
        {visible.length === 0 && <p className="p-4 text-sm text-slate-500">No notifications yet.</p>}
        {visible.map((item) => (
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 text-sm" key={item.id || `${item.text}-${item.age}`}>
            <p className="font-semibold text-slate-700">{item.text}</p>
            <span className="text-slate-500">{fromNow(item.createdAt, item.age)}</span>
            <button className="rounded-md border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-700" onClick={() => runAction(() => api.deleteNotification(item.id))} type="button">Delete</button>
          </div>
        ))}
      </div>
    </Panel>
  )
}

export default NotificationsPage
