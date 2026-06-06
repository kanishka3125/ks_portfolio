import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Mic, Award, Users } from 'lucide-react'

function Counter({ target, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!inView) return
    let startTime = null
    const startValue = 0

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out quad formula for smooth decelerating animation
      const easeProgress = progress * (2 - progress)
      
      setCount(Math.floor(easeProgress * (target - startValue) + startValue))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, target, duration])

  return (
    <span ref={ref} className="font-heading font-black text-3xl sm:text-4xl text-text-primary tracking-tight tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function StatsGrid({ data }) {
  const statsList = [
    {
      label: "Hackathons",
      value: data.stats.hackathons || 5,
      suffix: "+",
      icon: Trophy,
      color: "from-primary-light/20 to-primary-light/5",
      textColor: "text-primary-light",
      glowColor: "shadow-primary-light/5 hover:shadow-primary-light/15",
      description: "Participated & Won Tracks"
    },
    {
      label: "Events Attended",
      value: data.stats.events || 12,
      suffix: "+",
      icon: Mic,
      color: "from-secondary/20 to-secondary/5",
      textColor: "text-secondary",
      glowColor: "shadow-secondary/5 hover:shadow-secondary/15",
      description: "Meetups & Tech Conferences"
    },
    {
      label: "Certificates",
      value: data.stats.certificates || 8,
      suffix: "",
      icon: Award,
      color: "from-accent/20 to-accent/5",
      textColor: "text-accent",
      glowColor: "shadow-accent/5 hover:shadow-accent/15",
      description: "NVIDIA, Google & Microsoft"
    },
    {
      label: "Connections",
      value: data.stats.connections || 500,
      suffix: "+",
      icon: Users,
      color: "from-secondary/20 to-accent/5",
      textColor: "text-secondary",
      glowColor: "shadow-secondary/5 hover:shadow-accent/15",
      description: "Professional Dev Network"
    }
  ]

  return (
    <div className="w-full section-reveal mt-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsList.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`glass-card p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between border border-card-border shadow-lg ${stat.glowColor} transition-all duration-300 group`}
            >
              {/* Shifting radial glow background */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} blur-2xl opacity-40 group-hover:opacity-75 group-hover:scale-125 transition-all duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary-light/40 group-hover:scale-110 transition-all duration-300`}>
                    <Icon size={20} className={stat.textColor} />
                  </div>
                </div>

                <div className="flex flex-col mt-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                  <span className="text-xs sm:text-sm font-heading font-bold text-text-primary mt-1">
                    {stat.label}
                  </span>
                  <span className="text-[10px] text-text-muted mt-0.5 line-clamp-1 leading-none font-medium">
                    {stat.description}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
