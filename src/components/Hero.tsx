import { motion } from 'framer-motion'
import { ArrowRight, Radio, ChevronDown } from 'lucide-react'
import OceanBackdrop from './OceanBackdrop'
import { MagneticButton } from './ui/primitives'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-20">
      <OceanBackdrop />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center flex flex-col items-center"
      >
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-cyan-soft"
        >
          <Radio className="h-3.5 w-3.5 animate-pulseGlow" />
          Live satellite &amp; sensor fusion — 24/7 monitoring
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight text-slate-50"
        >
          Protecting the{' '}
          <span className="text-gradient-cyan">Deep Ocean</span>
          <br className="hidden sm:block" /> with Artificial Intelligence
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-2xl text-base sm:text-lg text-slate-400">
          DeepSea Guardian fuses satellite imagery, autonomous drones, sonar and IoT sensor networks with
          Gemini-powered reasoning to detect pollution, protect biodiversity, and guide response teams before
          damage spreads.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <MagneticButton variant="primary" onClick={() => scrollTo('dashboard')} ariaLabel="Explore dashboard">
            Explore Dashboard
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollTo('map')} ariaLabel="View live ocean monitoring">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
            </span>
            Live Ocean Monitoring
          </MagneticButton>
        </motion.div>

        <motion.div variants={item} className="mt-16 grid grid-cols-3 gap-6 sm:gap-14 text-left">
          {[
            ['4.2M km²', 'Ocean surveyed'],
            ['97.3%', 'Detection accuracy'],
            ['24/7', 'Autonomous monitoring'],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="font-display text-2xl sm:text-3xl font-semibold text-slate-50">{value}</div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollTo('dashboard')}
        aria-label="Scroll to dashboard"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-500 hover:text-cyan-soft"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  )
}
