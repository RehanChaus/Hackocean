/**
 * DATA LAYER
 * ------------------------------------------------------------------
 * Every function here is the ONLY place that should be touched to wire
 * this UI up to your real backend. Each function returns a typed
 * shape the components already consume — swap the mock body for a
 * `fetch('/api/...')` / WebSocket subscription and nothing above this
 * file needs to change.
 * ------------------------------------------------------------------
 */

export type Status = 'nominal' | 'watch' | 'alert'

export interface MetricCard {
  id: string
  title: string
  value: string
  unit?: string
  delta: number // positive/negative % change
  status: Status
  sparkline: number[]
}

export interface SensorPoint {
  id: string
  label: string
  lat: number
  lng: number
  type: 'sensor' | 'ship' | 'hotspot' | 'drone'
  severity: Status
  x: number // pre-projected position (0-100) for our stylized map
  y: number
}

export interface TrendPoint {
  month: string
  pollution: number
  species: number
  waterQuality: number
  riskForecast: number
}

export interface PipelineStage {
  id: string
  label: string
  icon: 'satellite' | 'drone' | 'sonar' | 'iot' | 'cpu' | 'scan' | 'sparkles' | 'chart' | 'layout'
  description: string
}

export interface TechItem {
  name: string
  category: string
}

export interface ImpactStat {
  id: string
  label: string
  value: number
  suffix: string
  decimals?: number
}

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function getMetricCards(): Promise<MetricCard[]> {
  await wait(150)
  return [
    {
      id: 'pollution',
      title: 'Live Pollution Detection',
      value: '12',
      unit: 'active zones',
      delta: -8.2,
      status: 'watch',
      sparkline: [4, 6, 5, 8, 7, 9, 6, 8, 5, 6],
    },
    {
      id: 'biodiversity',
      title: 'Marine Biodiversity',
      value: '2,438',
      unit: 'species tracked',
      delta: 3.4,
      status: 'nominal',
      sparkline: [20, 22, 21, 24, 26, 25, 27, 29, 28, 30],
    },
    {
      id: 'water-quality',
      title: 'Water Quality Index',
      value: '86',
      unit: '/ 100',
      delta: 1.1,
      status: 'nominal',
      sparkline: [78, 79, 81, 80, 82, 83, 84, 85, 84, 86],
    },
    {
      id: 'coral',
      title: 'Coral Health',
      value: '71',
      unit: '/ 100',
      delta: -2.6,
      status: 'watch',
      sparkline: [80, 78, 77, 76, 75, 74, 73, 72, 72, 71],
    },
    {
      id: 'ghost-nets',
      title: 'Ghost Nets Detected',
      value: '34',
      unit: 'this month',
      delta: 12.5,
      status: 'alert',
      sparkline: [10, 12, 14, 13, 18, 20, 22, 26, 30, 34],
    },
    {
      id: 'dumping',
      title: 'Illegal Dumping Events',
      value: '5',
      unit: 'flagged',
      delta: -40,
      status: 'watch',
      sparkline: [12, 10, 9, 8, 9, 7, 6, 5, 6, 5],
    },
    {
      id: 'oil-spill',
      title: 'Oil Spill Detection',
      value: '0',
      unit: 'active spills',
      delta: 0,
      status: 'nominal',
      sparkline: [1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    },
    {
      id: 'risk-score',
      title: 'Environmental Risk Score',
      value: '38',
      unit: '/ 100 (lower is better)',
      delta: -5.7,
      status: 'nominal',
      sparkline: [55, 52, 50, 48, 47, 44, 42, 41, 39, 38],
    },
  ]
}

export async function getSensorPoints(): Promise<SensorPoint[]> {
  await wait(150)
  return [
    { id: 's1', label: 'Buoy Array — Mariana Basin', lat: 11.35, lng: 142.2, type: 'sensor', severity: 'nominal', x: 78, y: 38 },
    { id: 's2', label: 'Sonar Node — Java Trench', lat: -9.1, lng: 107.6, type: 'sensor', severity: 'watch', x: 70, y: 58 },
    { id: 'h1', label: 'Pollution Hotspot — Coral Triangle', lat: -2.5, lng: 118.0, type: 'hotspot', severity: 'alert', x: 74, y: 50 },
    { id: 'sh1', label: 'Cargo Vessel MV Halcyon', lat: 1.35, lng: 103.8, type: 'ship', severity: 'watch', x: 68, y: 46 },
    { id: 'd1', label: 'Drone Unit DG-07', lat: 24.1, lng: -110.3, type: 'drone', severity: 'nominal', x: 22, y: 34 },
    { id: 'h2', label: 'Ghost Net Cluster — North Pacific Gyre', lat: 32.9, lng: -145.0, type: 'hotspot', severity: 'alert', x: 15, y: 24 },
    { id: 's3', label: 'IoT Buoy — Gulf Stream', lat: 34.5, lng: -68.2, type: 'sensor', severity: 'nominal', x: 34, y: 30 },
    { id: 'sh2', label: 'Tanker Reroute Alert', lat: 12.6, lng: 43.4, type: 'ship', severity: 'watch', x: 54, y: 40 },
    { id: 'h3', label: 'Oil Sheen — Gulf of Guinea', lat: 3.2, lng: 5.6, type: 'hotspot', severity: 'watch', x: 47, y: 47 },
    { id: 'd2', label: 'Drone Unit DG-12', lat: -18.4, lng: 147.8, type: 'drone', severity: 'nominal', x: 84, y: 63 },
  ]
}

export async function getTrendData(): Promise<TrendPoint[]> {
  await wait(150)
  return [
    { month: 'Jan', pollution: 62, species: 2180, waterQuality: 79, riskForecast: 48 },
    { month: 'Feb', pollution: 58, species: 2205, waterQuality: 80, riskForecast: 46 },
    { month: 'Mar', pollution: 55, species: 2244, waterQuality: 81, riskForecast: 45 },
    { month: 'Apr', pollution: 51, species: 2290, waterQuality: 82, riskForecast: 43 },
    { month: 'May', pollution: 49, species: 2318, waterQuality: 83, riskForecast: 41 },
    { month: 'Jun', pollution: 44, species: 2356, waterQuality: 84, riskForecast: 40 },
    { month: 'Jul', pollution: 41, species: 2379, waterQuality: 84, riskForecast: 39 },
    { month: 'Aug', pollution: 39, species: 2401, waterQuality: 85, riskForecast: 38 },
    { month: 'Sep', pollution: 36, species: 2412, waterQuality: 85, riskForecast: 37 },
    { month: 'Oct', pollution: 34, species: 2427, waterQuality: 86, riskForecast: 38 },
    { month: 'Nov', pollution: 33, species: 2431, waterQuality: 86, riskForecast: 37 },
    { month: 'Dec', pollution: 31, species: 2438, waterQuality: 86, riskForecast: 38 },
  ]
}

export async function getPipeline(): Promise<PipelineStage[]> {
  await wait(100)
  return [
    { id: 'satellite', label: 'Satellite', icon: 'satellite', description: 'Wide-area optical & radar imagery of surface anomalies.' },
    { id: 'drones', label: 'Underwater Drones', icon: 'drone', description: 'Autonomous vehicles capture close-range visual data.' },
    { id: 'sonar', label: 'Sonar', icon: 'sonar', description: 'Acoustic mapping detects submerged debris and nets.' },
    { id: 'iot', label: 'IoT Sensors', icon: 'iot', description: 'Buoy networks stream water chemistry in real time.' },
    { id: 'processing', label: 'AI Processing', icon: 'cpu', description: 'Multi-source signals are fused into a unified feed.' },
    { id: 'yolo', label: 'YOLO Detection', icon: 'scan', description: 'Real-time object detection flags debris & wildlife.' },
    { id: 'gemini', label: 'Gemini AI', icon: 'sparkles', description: 'Contextual reasoning classifies risk and root cause.' },
    { id: 'insights', label: 'Environmental Insights', icon: 'chart', description: 'Findings are scored, ranked, and trended over time.' },
    { id: 'dashboard', label: 'Dashboard', icon: 'layout', description: 'Delivered to response teams as actionable alerts.' },
  ]
}

export async function getTechStack(): Promise<TechItem[]> {
  await wait(100)
  return [
    { name: 'React', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Framer Motion', category: 'Animation' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'Gemini API', category: 'AI Reasoning' },
    { name: 'YOLO', category: 'Detection' },
    { name: 'TensorFlow', category: 'ML' },
    { name: 'Firebase', category: 'Realtime DB' },
    { name: 'Mapbox', category: 'Geospatial' },
    { name: 'Chart.js', category: 'Analytics' },
    { name: 'Google Cloud', category: 'Infra' },
  ]
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  await wait(100)
  return [
    { id: 'plastic', label: 'Plastic Waste Removed', value: 184.6, suffix: ' tons', decimals: 1 },
    { id: 'species', label: 'Marine Species Protected', value: 2438, suffix: '+' },
    { id: 'reefs', label: 'Coral Reefs Monitored', value: 312, suffix: '' },
    { id: 'accuracy', label: 'Detection Accuracy', value: 97.3, suffix: '%', decimals: 1 },
    { id: 'coverage', label: 'Ocean Coverage', value: 4.2, suffix: 'M km²', decimals: 1 },
  ]
}
