import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { getTrendData, type TrendPoint } from '../data/api'
import { GlassCard } from './ui/primitives'
import SectionHeading from './SectionHeading'

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-xs">
      <div className="text-slate-400 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2" style={{ color: p.color }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Analytics() {
  const [data, setData] = useState<TrendPoint[] | null>(null)

  useEffect(() => {
    getTrendData().then(setData)
  }, [])

  return (
    <section id="analytics" className="snap-section relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="AI Analytics"
          title="Patterns the ocean can't hide"
          description="Twelve months of fused sensor and satellite data, modeled forward to forecast risk before it becomes an incident."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-14">
          <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <GlassCard className="p-6">
              <h3 className="font-display text-lg text-slate-100 mb-1">Pollution Trends</h3>
              <p className="text-xs text-slate-500 mb-4">Composite index across detected debris & chemical signals</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data ?? []}>
                    <defs>
                      <linearGradient id="pollutionGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF5C5C" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#FF5C5C" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={28} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="pollution"
                      name="Pollution Index"
                      stroke="#FF5C5C"
                      strokeWidth={2.5}
                      fill="url(#pollutionGrad)"
                      animationDuration={1400}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <GlassCard className="p-6">
              <h3 className="font-display text-lg text-slate-100 mb-1">Marine Species Count</h3>
              <p className="text-xs text-slate-500 mb-4">Unique species identified via drone & sonar imaging</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data ?? []}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={36} domain={['dataMin - 50', 'dataMax + 20']} />
                    <Tooltip content={<ChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="species"
                      name="Species Tracked"
                      stroke="#2ED9A6"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5 }}
                      animationDuration={1400}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <GlassCard className="p-6">
              <h3 className="font-display text-lg text-slate-100 mb-1">Water Quality</h3>
              <p className="text-xs text-slate-500 mb-4">Composite score from pH, turbidity, dissolved oxygen</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data ?? []}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={28} domain={[70, 90]} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="waterQuality" name="Water Quality" fill="#00E5FF" radius={[6, 6, 0, 0]} animationDuration={1400} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <GlassCard className="p-6">
              <h3 className="font-display text-lg text-slate-100 mb-1">Risk Forecast</h3>
              <p className="text-xs text-slate-500 mb-4">Gemini-modeled environmental risk, projected forward</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data ?? []}>
                    <defs>
                      <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFB020" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#FFB020" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={28} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="riskForecast"
                      name="Risk Score"
                      stroke="#FFB020"
                      strokeWidth={2.5}
                      fill="url(#riskGrad)"
                      animationDuration={1400}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
