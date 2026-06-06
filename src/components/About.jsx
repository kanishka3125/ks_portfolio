import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'

// Animated counter
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const num = parseFloat(target)
    const isDecimal = target.toString().includes('.')
    const duration = 1500
    const steps = 40
    const increment = num / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= num) {
        setCount(num)
        clearInterval(interval)
      } else {
        setCount(isDecimal ? Math.round(current * 100) / 100 : Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [inView, target])

  return (
    <span ref={ref} className="text-2xl font-heading font-black text-white tabular-nums">
      {typeof count === 'number' && count % 1 !== 0 ? count.toFixed(2) : count}{suffix}
    </span>
  )
}

const About = ({ data }) => {
  const imgRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8
    setTilt({ x, y })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const stats = [
    { label: 'CGPA', value: data.cgpa, suffix: '' },
    { label: 'Projects', value: data.stats.projects, suffix: '+' },
    { label: 'Communities', value: data.stats.communities, suffix: '+' },
    { label: 'Skills', value: data.stats.skills, suffix: '+' },
  ]

  return (
    <section id="about" className="section-reveal py-8 md:py-12">
      <SectionHeading>About Me</SectionHeading>

      {/* Single card layout like reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Small circular photo */}
          <motion.div
            ref={imgRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex-shrink-0 mx-auto md:mx-0"
          >
            <div
              className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary-light/30 shadow-lg shadow-primary-light/10"
              style={{
                transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              <img
                src="https://www.image2url.com/r2/default/images/1780716559140-d456d6d9-2929-418e-8186-754db8316721.jpeg"
                alt="Kanishka Sharma"
                loading="lazy"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex-1 space-y-3">
            {data.bio.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`leading-relaxed ${i === 0 ? 'text-sm md:text-base text-gray-200' : 'text-sm text-gray-400'}`}
              >
                {i === 0 ? (
                  <>
                    Hello! I am <span className="font-bold text-white">Kanishka</span>, a B.Tech Computer Science student specializing in AI & ML at <span className="text-secondary font-bold">SRM Institute</span>, with a strong academic foundation (CGPA {data.cgpa}).
                  </>
                ) : para}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 pt-5 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/[0.03] p-3 rounded-xl text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
