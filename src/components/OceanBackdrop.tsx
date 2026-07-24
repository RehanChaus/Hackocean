import { motion } from 'framer-motion'
import { useMemo } from 'react'

function Bubbles({ count = 22 }: { count?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 4 + Math.random() * 10,
        duration: 14 + Math.random() * 16,
        delay: Math.random() * 14,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count]
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="absolute rounded-full bg-cyan-glow/20 border border-cyan-glow/30 animate-rise"
          style={{
            left: `${b.left}%`,
            bottom: '-5%',
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            transform: `translateX(${b.drift}px)`,
          }}
        />
      ))}
    </div>
  )
}

function Jellyfish({ x, y, scale = 1, delay = 0 }: { x: string; y: string; scale?: number; delay?: number }) {
  const gradId = `jelly-${x.replace(/\D/g, '')}-${y.replace(/\D/g, '')}-${Math.round(scale * 100)}`
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
      transition={{ duration: 9 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      aria-hidden
    >
      <svg width={60 * scale} height={80 * scale} viewBox="0 0 60 80" fill="none">
        <defs>
          <radialGradient id={gradId} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#7EF7FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.08" />
          </radialGradient>
        </defs>
        <path d="M30 5C14 5 4 18 4 32c0 10 8 15 26 15s26-5 26-15C56 18 46 5 30 5Z" fill={`url(#${gradId})`} />
        {[14, 22, 30, 38, 46].map((cx, i) => (
          <motion.path
            key={i}
            d={`M${cx} 47 Q${cx + (i % 2 === 0 ? 6 : -6)} 60 ${cx} 75`}
            stroke="#00E5FF"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            fill="none"
            animate={{ d: [`M${cx} 47 Q${cx + 6} 60 ${cx} 75`, `M${cx} 47 Q${cx - 6} 60 ${cx} 75`, `M${cx} 47 Q${cx + 6} 60 ${cx} 75`] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

function WaveLayer({ opacity, duration, className }: { opacity: number; duration: number; className?: string }) {
  return (
    <div className={`absolute inset-x-0 bottom-0 h-40 overflow-hidden ${className}`} aria-hidden>
      <motion.svg
        viewBox="0 0 1440 200"
        className="absolute bottom-0 w-[200%] h-full"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C 240,160 480,40 720,100 C 960,160 1200,40 1440,100 L1440,200 L0,200 Z M1440,100 C1680,160 1920,40 2160,100 C2400,160 2640,40 2880,100 L2880,200 L1440,200 Z"
          fill="#00E5FF"
          fillOpacity={opacity}
        />
      </motion.svg>
    </div>
  )
}

export default function OceanBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-ocean-radial" />
      <div className="absolute inset-0 grid-mask" />
      <Jellyfish x="8%" y="18%" scale={0.9} delay={0} />
      <Jellyfish x="82%" y="12%" scale={1.2} delay={1.4} />
      <Jellyfish x="46%" y="28%" scale={0.7} delay={2.8} />
      <Bubbles />
      <WaveLayer opacity={0.05} duration={22} />
      <WaveLayer opacity={0.08} duration={16} className="translate-y-4" />
      <div className="noise-overlay" />
    </div>
  )
}
