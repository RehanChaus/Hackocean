import { motion } from 'framer-motion'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'text-left max-w-2xl'}
    >
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-cyan-glow mb-3">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-50 tracking-tight">{title}</h2>
      {description && <p className="mt-4 text-slate-400 text-base leading-relaxed">{description}</p>}
    </motion.div>
  )
}
