import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getImpactStats, type ImpactStat } from '../data/api'
import { AnimatedCounter, GlassCard } from './ui/primitives'
import SectionHeading from './SectionHeading'

export default function Impact() {
  const [stats, setStats] = useState<ImpactStat[] | null>(null)

  useEffect(() => {
    getImpactStats().then(setStats)
  }, [])

  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Measurable impact"
          title="The ocean, quantified"
          description="Aggregate outcomes since DeepSea Guardian went live — every number below traces back to a logged detection event."
        />

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-5 gap-4">
          {(stats ?? []).map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard glow className="p-6 text-center h-full flex flex-col items-center justify-center">
                <div className="font-display text-3xl sm:text-4xl font-semibold text-gradient-cyan">
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-2">{s.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
