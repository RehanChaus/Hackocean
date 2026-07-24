import { motion } from 'framer-motion'
import { Waves, LayoutDashboard, Map, LineChart, Cpu, Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'map', label: 'Ocean Map', icon: Map },
  { id: 'analytics', label: 'Analytics', icon: LineChart },
  { id: 'pipeline', label: 'AI Pipeline', icon: Cpu },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-4 max-w-6xl px-4"
      >
        <div className="glass-strong rounded-full px-5 py-3 flex items-center justify-between shadow-card">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 font-display font-semibold tracking-tight">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-glow to-ocean shadow-glow">
              <Waves className="h-4 w-4 text-abyss-950" strokeWidth={2.5} />
            </span>
            <span className="hidden sm:inline text-slate-50">DeepSea Guardian</span>
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-4 py-2 text-sm text-slate-300 hover:text-cyan-soft rounded-full hover:bg-white/5 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <button
              onClick={() => scrollTo('dashboard')}
              className="rounded-full bg-gradient-to-r from-ocean to-cyan-glow px-5 py-2 text-sm font-semibold text-abyss-950 shadow-glow hover:brightness-110 transition"
            >
              Live Monitoring
            </button>
          </div>

          <button
            className="md:hidden rounded-full p-2 text-slate-200"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass-strong mt-2 rounded-2xl p-3 flex flex-col gap-1"
          >
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  scrollTo(l.id)
                  setOpen(false)
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-200 hover:bg-white/5 text-left"
              >
                <l.icon className="h-4 w-4 text-cyan-glow" />
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </header>
  )
}

export function MobileBottomNav() {
  const [active, setActive] = useState('dashboard')

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 px-4"
      aria-label="Mobile primary"
    >
      <div className="glass-strong rounded-3xl mx-auto max-w-md flex items-center justify-around py-2 shadow-glowLg">
        {links.map((l) => {
          const isActive = active === l.id
          return (
            <button
              key={l.id}
              onClick={() => {
                setActive(l.id)
                scrollTo(l.id)
              }}
              className="relative flex flex-col items-center gap-1 px-3 py-2 min-w-[64px] min-h-[44px] rounded-2xl"
              aria-label={l.label}
              aria-current={isActive}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 rounded-2xl bg-cyan-glow/10 border border-cyan-glow/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                />
              )}
              <l.icon className={`relative h-5 w-5 ${isActive ? 'text-cyan-glow' : 'text-slate-400'}`} />
              <span className={`relative text-[10px] font-medium ${isActive ? 'text-cyan-soft' : 'text-slate-500'}`}>
                {l.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
