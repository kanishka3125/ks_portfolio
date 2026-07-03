import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { X, FileCheck, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading'

const Experience = ({ data }) => {
  const timelineRef = useRef(null)
  const inView = useInView(timelineRef, { once: true, margin: '-100px' })
  const [selected, setSelected] = useState(null)

  const ProofViewer = ({ item, onClose }) => (
    <div className="glass-card rounded-2xl shadow-lg border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
        <div className="flex items-center gap-2">
          <FileCheck size={14} className="text-primary-light" />
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Proof of Position</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={14} />
        </button>
      </div>
      <div className="p-4">
        {(item.proof || item.image) ? (
          <div className="space-y-3">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
              <img
                src={item.proof || item.image}
                alt={`Proof`}
                className="w-full h-auto max-h-[250px] object-contain"
                loading="lazy"
              />
            </div>
            <a
              href={item.proof || item.image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary-light/70 hover:text-primary-light transition-colors"
            >
              <ExternalLink size={12} />
              Open full image
            </a>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xs text-gray-500">No proof uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  )

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
          {data.experience.map((item, index) => {
            const hasProof = !!(item.proof || item.image)
            const isSelected = selected === index
            return (
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
                {/* 1. Card Side */}
                <div className="flex-1 w-full">
                  <div
                    onClick={() => setSelected(isSelected ? null : index)}
                    className={`glass-card p-5 rounded-xl shadow-lg cursor-pointer transition-all duration-300 group/card ${isSelected ? 'border-primary-light/40 shadow-primary-light/10' : 'hover:border-primary-light/30 hover:shadow-primary-light/5'} ${
                      index % 2 !== 0 ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    <span className="inline-block text-[10px] font-bold text-primary-light mb-1 uppercase tracking-widest bg-primary-light/10 px-2 py-0.5 rounded-full">
                      {item.year}
                    </span>
                    <h3 className="text-base font-heading font-bold text-white mb-0.5">{item.role}</h3>
                    <p className="text-sm text-gray-400">{item.company}</p>

                    {/* Image Thumbnail on Card */}
                    {item.image && (
                      <div className="mt-3 rounded-lg overflow-hidden border border-white/10 bg-white/5 relative h-24">
                        <img 
                          src={item.image} 
                          alt={item.company} 
                          className="w-full h-full object-cover opacity-70 group-hover/card:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    )}

                    {/* Proof indicator */}
                    {hasProof && (
                      <div className={`flex items-center gap-1 mt-2 text-[10px] text-primary-light/60 group-hover/card:text-primary-light transition-colors ${
                        index % 2 !== 0 ? 'md:justify-start' : 'md:justify-end'
                      }`}>
                        <FileCheck size={11} />
                        <span className="font-medium tracking-wide uppercase">{isSelected ? 'Close Proof' : 'View Proof'}</span>
                      </div>
                    )}

                    {/* Click hint for cards without proof */}
                    {!hasProof && (
                      <div className={`flex items-center gap-1 mt-2 text-[10px] text-gray-600 group-hover/card:text-gray-400 transition-colors ${
                        index % 2 !== 0 ? 'md:justify-start' : 'md:justify-end'
                      }`}>
                        <span className="font-medium tracking-wide uppercase">Click to view</span>
                      </div>
                    )}
                  </div>

                  {/* Mobile Proof Viewer */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 overflow-hidden"
                      >
                        <ProofViewer item={item} onClose={() => setSelected(null)} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Timeline dot */}
                <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full border-3 border-bg-primary shadow-md transition-colors duration-300 ${isSelected ? 'bg-[#FFAB91] shadow-[#FFAB91]/40' : 'bg-primary-light shadow-primary-light/30'}`} />
                </div>

                {/* 3. Empty Space / Desktop Proof Viewer */}
                <div className="flex-1 hidden md:block w-full">
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        className="w-full"
                      >
                        <ProofViewer item={item} onClose={() => setSelected(null)} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
