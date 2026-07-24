import { ReactNode, useRef, useState, MouseEvent } from 'react'
import { motion } from 'framer-motion'
import type { Status } from '../../data/api'

export function GlassCard({
  children,
  className = '',
  glow = false,
  as: Comp = 'div',
}: {
  children: ReactNode
  className?: string
  glow?: boolean
  as?: any
}) {
  return (
    <Comp
      className={`glass rounded-xl3 shadow-card relative overflow-hidden ${
        glow ? 'hover:shadow-glow' : ''
      } transition-shadow duration-500 ${className}`}
    >
      {children}
    </Comp>
  )
}

/** Button that subtly follows the cursor + ripples on click. */
export function MagneticButton({
  children,
  variant = 'primary',
  onClick,
  className = '',
  ariaLabel,
}: {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: () => void
  className?: string
  ariaLabel?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPos({ x: x * 0.25, y: y * 0.25 })
  }

  const handleLeave = () => setPos({ x: 0, y: 0 })

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      const id = Date.now()
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650)
    }
    onClick?.()
  }

  const base =
    variant === 'primary'
      ? 'bg-gradient-to-r from-ocean to-cyan-glow text-abyss-950 font-semibold shadow-glow'
      : 'glass text-cyan-soft border border-cyan-glow/30'

  return (
    <motion.button
      ref={ref}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.4 }}
      whileTap={{ scale: 0.96 }}
      className={`relative isolate overflow-hidden rounded-full px-8 py-4 text-sm md:text-base transition-colors duration-300 ${base} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ opacity: 0.5, scale: 0 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ left: r.x, top: r.y }}
          className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
        />
      ))}
    </motion.button>
  )
}

const statusStyles: Record<Status, { dot: string; text: string; label: string; ring: string }> = {
  nominal: { dot: 'bg-seagreen', text: 'text-seagreen', label: 'Nominal', ring: 'shadow-[0_0_10px_2px_rgba(46,217,166,0.6)]' },
  watch: { dot: 'bg-amberwarn', text: 'text-amberwarn', label: 'Watch', ring: 'shadow-[0_0_10px_2px_rgba(255,176,32,0.6)]' },
  alert: { dot: 'bg-coral', text: 'text-coral', label: 'Alert', ring: 'shadow-[0_0_10px_2px_rgba(255,92,92,0.6)]' },
}

export function StatusPill({ status }: { status: Status }) {
  const s = statusStyles[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${s.text} bg-white/5`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ${s.ring} animate-pulseGlow`} aria-hidden />
      {s.label}
    </span>
  )
}

export function Sparkline({ data, status }: { data: number[]; status: Status }) {
  const color = status === 'alert' ? '#FF5C5C' : status === 'watch' ? '#FFB020' : '#00E5FF'
  const gradId = `spark-${status}`
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 100
  const h = 28
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((d - min) / range) * h
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`0,${h} ${points} ${w},${h}`} fill={`url(#${gradId})`} />
    </svg>
  )
}

/** Animated number counter that counts up when it scrolls into view. */
export function AnimatedCounter({
  value,
  suffix = '',
  decimals = 0,
  duration = 1.8,
}: {
  value: number
  suffix?: string
  decimals?: number
  duration?: number
}) {
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  return (
    <motion.span
      onViewportEnter={() => {
        if (started.current) return
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / (duration * 1000))
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(value * eased)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }}
      viewport={{ once: true, margin: '-80px' }}
    >
      {display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </motion.span>
  )
}
