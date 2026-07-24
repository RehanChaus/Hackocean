import { motion } from 'framer-motion'
import { Navbar, MobileBottomNav } from './components/Navigation'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import OceanMap from './components/OceanMap'
import Analytics from './components/Analytics'
import Pipeline from './components/Pipeline'
import TechStack from './components/TechStack'
import Impact from './components/Impact'
import Footer from './components/Footer'

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen overflow-x-hidden"
    >
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-cyan-glow focus:text-abyss-950 focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Dashboard />
        <OceanMap />
        <Analytics />
        <Pipeline />
        <TechStack />
        <Impact />
      </main>
      <Footer />
      <MobileBottomNav />
    </motion.div>
  )
}
