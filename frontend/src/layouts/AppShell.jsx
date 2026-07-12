import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '../data/assetFlowData'

function AppShell({ active, setActive, children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-black text-slate-950">AssetFlow</h1>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-700">Enterprise Asset & Resource ERP</p>
          </div>
          <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 sm:block">Admin workspace</div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <button
                className={`rounded-md px-3 py-2 text-left text-sm font-semibold transition ${active === item ? 'bg-cyan-50 text-cyan-800 ring-1 ring-cyan-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}
                key={item}
                onClick={() => setActive(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AppShell
