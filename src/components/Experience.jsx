import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from './SectionHeading'

const Experience = ({ data }) => {
  const timelineRef = useRef(null)
  const inView = useInView(timelineRef, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-reveal py-8 md:py-12 relative">
      <SectionHeading>Experience</SectionHeading>

      <div ref={timelineRef} className="relative max-w-3xl mx-auto">
        {/* Animated vertical line */}
        <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px">
          <motion.div
            initial={{ height: '0%' }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full bg-gradient-to-b from-primary-light via-secondary/50 to-transparent"
          />
        </div>

        <div className="space-y-8 md:space-y-10">
          {data.experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 pl-12 md:pl-0 ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 w-full">
                <div className={`glass-card p-5 rounded-xl shadow-lg ${
                  index % 2 !== 0 ? 'md:text-left' : 'md:text-right'
                }`}>
                  <span className="inline-block text-[10px] font-bold text-primary-light mb-1 uppercase tracking-widest bg-primary-light/10 px-2 py-0.5 rounded-full">
                    {item.year}
                  </span>
                  <h3 className="text-base font-heading font-bold text-white mb-0.5">{item.role}</h3>
                  <p className="text-sm text-gray-400">{item.company}</p>
                </div>
              </div>

              <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 z-10">
                <div className="w-4 h-4 rounded-full bg-primary-light border-3 border-bg-primary shadow-md shadow-primary-light/30" />
              </div>

              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
