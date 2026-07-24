import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Droplets,
  Fish,
  FlaskConical,
  HeartPulse,
  Anchor,
  Trash2,
  Flame,
  ShieldAlert,
} from 'lucide-react'
import { getMetricCards, type MetricCard } from '../data/api'
import { GlassCard, Sparkline, StatusPill } from './ui/primitives'
import SectionHeading from './SectionHeading'

const icons: Record<string, any> = {
  pollution: Droplets,
  biodiversity: Fish,
  'water-quality': FlaskConical,
  coral: HeartPulse,
  'ghost-nets': Anchor,
  dumping: Trash2,
  'oil-spill': Flame,
  'risk-score': ShieldAlert,
}

function CardSkeleton() {
  return (
    <div className="glass rounded-xl3 p-6 h-[188px] animate-pulse">
      <div className="h-9 w-9 rounded-xl bg-white/10 mb-5" />
      <div className="h-3 w-2/3 rounded bg-white/10 mb-3" />
      <div className="h-7 w-1/2 rounded bg-white/10 mb-5" />
      <div className="h-7 w-full rounded bg-white/5" />
    </div>
  )
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Dashboard() {
  const [cards, setCards] = useState<MetricCard[] | null>(null)

  useEffect(() => {
    getMetricCards().then(setCards)
  }, [])

  return (
    <section id="dashboard" className="snap-section relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Real-time telemetry"
          title="A living pulse of the ocean"
          description="Every card streams from the same detection pipeline that powers alerts — updated continuously as new signals arrive."
        />

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14"
        >
          {!cards
            ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
            : cards.map((c) => {
                const Icon = icons[c.id] ?? Droplets
                return (
                  <motion.div key={c.id} variants={cardVariants} whileHover={{ y: -6 }} className="group">
                    <GlassCard glow className="p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-5">
                        <motion.div
                          whileHover={{ rotate: [0, -8, 8, 0] }}
                          transition={{ duration: 0.5 }}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/20 to-ocean/10 border border-cyan-glow/20 group-hover:shadow-glow transition-shadow"
                        >
                          <Icon className="h-5 w-5 text-cyan-glow" strokeWidth={1.8} />
                        </motion.div>
                        <StatusPill status={c.status} />
                      </div>

                      <h3 className="text-sm text-slate-400 mb-1">{c.title}</h3>
                      <div className="flex items-baseline gap-1.5 mb-4">
                        <span className="font-display text-2xl font-semibold text-slate-50">{c.value}</span>
                        {c.unit && <span className="text-xs text-slate-500">{c.unit}</span>}
                      </div>

                      <div className="mt-auto">
                        <Sparkline data={c.sparkline} status={c.status} />
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-xs font-medium ${c.delta >= 0 ? 'text-seagreen' : 'text-coral'}`}>
                            {c.delta > 0 ? '+' : ''}
                            {c.delta}%
                          </span>
                          <span className="text-[11px] text-slate-600">vs last period</span>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )
              })}
        </motion.div>
      </div>
    </section>
  )
}
