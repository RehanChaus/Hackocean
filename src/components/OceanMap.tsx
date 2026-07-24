import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Anchor, Ship, Radio, Flame, X } from 'lucide-react'
import { getSensorPoints, type SensorPoint } from '../data/api'
import { GlassCard } from './ui/primitives'
import SectionHeading from './SectionHeading'

const typeIcon: Record<SensorPoint['type'], any> = {
  sensor: Radio,
  ship: Ship,
  hotspot: Flame,
  drone: Anchor,
}

const severityColor: Record<SensorPoint['severity'], string> = {
  nominal: '#2ED9A6',
  watch: '#FFB020',
  alert: '#FF5C5C',
}

export default function OceanMap() {
  const [points, setPoints] = useState<SensorPoint[] | null>(null)
  const [selected, setSelected] = useState<SensorPoint | null>(null)

  useEffect(() => {
    getSensorPoints().then(setPoints)
  }, [])

  return (
    <section id="map" className="snap-section relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Global coverage"
          title="Interactive ocean monitoring map"
          description="Sensor buoys, drone units, vessel tracking and live pollution hotspots — plotted as data arrives from the field."
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <GlassCard className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
            {/* Backdrop grid + glow */}
            <div className="absolute inset-0 bg-abyss-900" />
            <div className="absolute inset-0 grid-mask opacity-70" />
            <div className="absolute inset-0 bg-ocean-radial" />

            {/* stylized landmasses for context, extremely simplified continents */}
            <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full opacity-[0.14]" preserveAspectRatio="none" aria-hidden>
              <path
                fill="#00E5FF"
                d="M8 20c3-4 8-3 10 0 3-1 7 1 6 5-3 2-8 3-11 1-4 1-8-2-5-6zM30 10c4-3 10-2 12 2 4 0 6 4 3 7-4 3-11 2-14-1-3 0-4-6-1-8zM55 8c6-2 14 1 15 6 3 3-1 8-6 8-5 3-13 0-14-5-3-3 0-8 5-9zM60 30c5-2 12 0 13 5 2 4-2 8-7 8-5 2-11-1-12-6-2-3 1-6 6-7zM20 38c4-2 9 0 10 4 1 3-2 6-6 6-4 1-8-2-8-5-1-3 1-4 4-5zM82 15c4-2 9 0 10 4 1 4-2 7-6 7-4 1-8-2-8-5-1-3 1-5 4-6z"
              />
            </svg>

            {/* heatmap glows under hotspots */}
            {points?.map(
              (p) =>
                p.severity === 'alert' && (
                  <div
                    key={`glow-${p.id}`}
                    className="absolute rounded-full blur-2xl pointer-events-none"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: 140,
                      height: 140,
                      transform: 'translate(-50%,-50%)',
                      background: 'radial-gradient(circle, rgba(255,92,92,0.35), transparent 70%)',
                    }}
                  />
                )
            )}

            {/* markers */}
            {points?.map((p) => {
              const Icon = typeIcon[p.type]
              const color = severityColor[p.severity]
              const isSelected = selected?.id === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  aria-label={p.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  {isSelected && (
                    <>
                      <motion.span
                        className="absolute inset-0 rounded-full border"
                        style={{ borderColor: color }}
                        initial={{ width: 20, height: 20, opacity: 0.8, x: -10, y: -10 }}
                        animate={{ width: 70, height: 70, opacity: 0, x: -35, y: -35 }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <motion.span
                        className="absolute inset-0 rounded-full border"
                        style={{ borderColor: color }}
                        initial={{ width: 20, height: 20, opacity: 0.8, x: -10, y: -10 }}
                        animate={{ width: 70, height: 70, opacity: 0, x: -35, y: -35 }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                      />
                    </>
                  )}
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: color, opacity: 0.35 }}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span
                    className="relative flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 shadow-lg transition-transform group-hover:scale-110"
                    style={{ background: '#04101F', borderColor: color }}
                  >
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color }} strokeWidth={2} />
                  </span>
                </button>
              )
            })}

            {/* legend */}
            <div className="absolute left-4 bottom-4 flex flex-wrap gap-3 text-[11px]">
              {(['nominal', 'watch', 'alert'] as const).map((s) => (
                <div key={s} className="flex items-center gap-1.5 glass rounded-full px-2.5 py-1">
                  <span className="h-2 w-2 rounded-full" style={{ background: severityColor[s] }} />
                  <span className="text-slate-300 capitalize">{s}</span>
                </div>
              ))}
            </div>

            {/* detail panel */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-4 top-4 w-64 glass-strong rounded-2xl p-4"
                >
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close details"
                    className="absolute top-3 right-3 text-slate-500 hover:text-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">{selected.type}</div>
                  <div className="text-sm font-medium text-slate-100 pr-4">{selected.label}</div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: severityColor[selected.severity] }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: severityColor[selected.severity] }} />
                    {selected.severity.charAt(0).toUpperCase() + selected.severity.slice(1)} status
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500 font-mono">
                    {selected.lat.toFixed(2)}°, {selected.lng.toFixed(2)}°
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
