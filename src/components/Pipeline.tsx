import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Satellite, Cpu, Radar, Wifi, Scan, Sparkles, BarChart3, LayoutDashboard, Bot } from 'lucide-react'
import { getPipeline, type PipelineStage } from '../data/api'
import { GlassCard } from './ui/primitives'
import SectionHeading from './SectionHeading'

const iconMap: Record<PipelineStage['icon'], any> = {
  satellite: Satellite,
  drone: Bot,
  sonar: Radar,
  iot: Wifi,
  cpu: Cpu,
  scan: Scan,
  sparkles: Sparkles,
  chart: BarChart3,
  layout: LayoutDashboard,
}

export default function Pipeline() {
  const [stages, setStages] = useState<PipelineStage[] | null>(null)

  useEffect(() => {
    getPipeline().then(setStages)
  }, [])

  return (
    <section id="pipeline" className="snap-section relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="From raw signal to actionable insight"
          description="Nine stages, fused in real time — this is the exact sequence every detection travels through before it reaches your dashboard."
        />

        <div className="mt-16 relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute left-0 right-0 top-[52px] h-px bg-gradient-to-r from-transparent via-cyan-glow/30 to-transparent" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4 lg:gap-3">
            {(stages ?? Array.from({ length: 9 })).map((stage: any, i) => {
              const Icon = stage ? iconMap[stage.icon as PipelineStage['icon']] : Cpu
              return (
                <motion.div
                  key={stage?.id ?? i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center relative"
                >
                  <span className="lg:hidden absolute -top-2 -left-1 text-[10px] font-mono text-slate-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl glass-strong shadow-glow mb-3 z-10"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-2xl border border-cyan-glow/30"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                    {stage ? <Icon className="h-6 w-6 text-cyan-glow" strokeWidth={1.8} /> : <div className="h-6 w-6 rounded bg-white/10" />}
                  </motion.div>
                  <div className="text-xs sm:text-sm font-medium text-slate-200">{stage?.label ?? '—'}</div>
                  {i < 8 && (
                    <span className="hidden lg:block text-cyan-glow/40 text-lg mt-1" aria-hidden>
                      →
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {stages && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {stages.slice(0, 3).map((s) => (
              <GlassCard key={s.id} className="p-5">
                <div className="text-xs font-semibold text-cyan-glow mb-1">{s.label}</div>
                <div className="text-sm text-slate-400">{s.description}</div>
              </GlassCard>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
