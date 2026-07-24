import { Waves } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 px-6 pb-28 md:pb-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Waves className="h-4 w-4 text-cyan-glow" />
          DeepSea Guardian — AI-Powered Deep Ocean Monitoring
        </div>
        <p className="text-xs text-slate-600">Built for the ocean. Rendered in glass, cyan, and current.</p>
      </div>
    </footer>
  )
}
