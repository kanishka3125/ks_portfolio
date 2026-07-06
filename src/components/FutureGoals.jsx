import { motion } from 'framer-motion'
import { Rocket, Brain, Globe, BookOpen, Sparkles } from 'lucide-react'
import SectionHeading from './SectionHeading'

const goals = [
  {
    icon: Brain,
    title: 'Master AI/ML Fundamentals',
    description: 'Build a rock-solid foundation in machine learning, deep learning, and data science through hands-on projects and academic excellence.',
    status: 'completed',
    year: '2024–25',
  },
  {
    icon: Rocket,
    title: 'Build Production-Ready AI Systems',
    description: 'Design and deploy adaptive AI systems that solve real-world problems — from emotion recognition to predictive analytics.',
    status: 'current',
    year: '2025–26',
  },
  {
    icon: Globe,
    title: 'Contribute to Open Source AI',
    description: 'Actively contribute to open-source ML/AI libraries and lead community-driven initiatives through OSCG and GSSoC.',
    status: 'upcoming',
    year: '2026–27',
  },
  {
    icon: BookOpen,
    title: 'AI Research & Publications',
    description: 'Pursue research in computer vision and NLP, aiming to publish findings that advance the field of applied AI.',
    status: 'upcoming',
    year: '2027–28',
  },
  {
    icon: Sparkles,
    title: 'Lead AI Innovation at Scale',
    description: 'Drive AI strategy at a leading tech company or launch an AI-first startup solving impactful global challenges.',
    status: 'upcoming',
    year: '2028+',
  },
]

const getStatusColors = (theme) => ({
  completed: { dot: theme === 'light' ? 'bg-green-600' : 'bg-green-400', glow: theme === 'light' ? 'shadow-green-600/40' : 'shadow-green-400/40', text: theme === 'light' ? 'text-green-700' : 'text-green-400' },
  current: { dot: 'bg-primary-light', glow: 'shadow-primary-light/40', text: 'text-primary-light' },
  upcoming: { dot: 'bg-gray-600', glow: '', text: 'text-gray-500' },
})

export default function FutureGoals({ theme }) {
  const statusColors = getStatusColors(theme)

  return (
    <section id="future-goals" className="section-reveal py-8 md:py-12">
      <SectionHeading>Future Roadmap</SectionHeading>

      <div className="relative max-w-xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-light/40 via-secondary/20 to-transparent" />

        <div className="space-y-8">
          {goals.map((goal, index) => {
            const Icon = goal.icon
            const colors = statusColors[goal.status]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 md:pl-16"
              >
                {/* Timeline dot */}
                <div className={`absolute left-3 md:left-4 top-1 w-4 h-4 rounded-full border-2 border-[#0F0E17] ${colors.dot} ${goal.status === 'current' ? 'animate-glow-pulse' : ''} ${colors.glow ? `shadow-md ${colors.glow}` : ''}`} />

                {/* Card */}
                <div className={`glass-card rounded-xl p-5 ${goal.status === 'current' ? 'border-primary-light/30' : ''}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className={colors.text} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.text}`}>
                      {goal.year} {goal.status === 'current' && '• Current'}
                      {goal.status === 'completed' && '• ✓ Done'}
                    </span>
                  </div>
                  <h3 className="text-base font-heading font-bold text-white mb-1">{goal.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{goal.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
