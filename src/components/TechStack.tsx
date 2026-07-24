import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getTechStack, type TechItem } from '../data/api'
import { GlassCard } from './ui/primitives'
import SectionHeading from './SectionHeading'

export default function TechStack() {
  const [items, setItems] = useState<TechItem[] | null>(null)

  useEffect(() => {
    getTechStack().then(setItems)
  }, [])

  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Under the hood"
          title="Built on a modern, production-grade stack"
          description="Every layer, from satellite ingestion to the interface you're looking at, chosen for reliability at ocean scale."
        />

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {(items ?? []).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="animate-float"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <GlassCard glow className="px-6 py-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="text-sm font-semibold text-slate-100">{t.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{t.category}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
