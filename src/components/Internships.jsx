import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, X, Award } from 'lucide-react'
import SectionHeading from './SectionHeading'

const Internships = ({ data }) => {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="internships" className="section-reveal py-8 md:py-12">
      <SectionHeading>Internships</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {data.internships.map((intern, index) => (
          <InternCard key={index} intern={intern} index={index} onViewCert={() => setLightbox(intern.certificate)} />
        ))}
      </div>

      {/* Certificate Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightbox(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

            {/* Glass modal */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative z-10 w-full max-w-lg flex flex-col rounded-2xl overflow-hidden"
              style={{
                height: 'min(85vh, 600px)',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 0 30px var(--glow-pink), 0 25px 60px rgba(0,0,0,0.6)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <Award size={16} className="text-secondary" />
                  <span className="text-sm font-bold text-white tracking-wide">Certificate</span>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>

              {/* Image — stretches to fill, scales down to fit */}
              <div className="flex-1 min-h-0 overflow-hidden p-4">
                <img
                  src={lightbox}
                  alt="Certificate"
                  className="rounded-xl shadow-2xl"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>

              {/* Footer */}
              <div className="px-5 py-2 border-t border-white/10 flex-shrink-0 text-center">
                <span className="text-[10px] text-gray-500 tracking-wider">Click outside to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

function InternCard({ intern, index, onViewCert }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6
    setTilt({ x, y })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        className="glass-card glow-border p-6 rounded-2xl flex flex-col h-full relative overflow-hidden group"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-secondary/10 transition-all pointer-events-none" />

        <div className="flex items-start gap-4 mb-4 relative z-10">
          <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center p-2 border border-white/10 group-hover:scale-110 group-hover:border-secondary/30 transition-all duration-500 flex-shrink-0">
            <img src={intern.logo} alt={intern.company} className="w-full h-full object-contain" loading="lazy" />
          </div>
          <div>
            <h3 className="text-base font-heading font-bold text-white">{intern.role}</h3>
            <p className="text-sm text-secondary font-semibold">{intern.company}</p>
            <div className="flex items-center gap-1.5 text-gray-500 text-[10px] mt-0.5 font-bold tracking-wider">
              <Calendar size={10} />
              <span>{intern.duration}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow relative z-10">{intern.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
          {intern.skills.map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.04 }}
              className="text-[11px] font-medium bg-white/5 px-2.5 py-1 rounded-md text-gray-300 border border-white/5"
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {intern.certificate && (
          <button
            onClick={onViewCert}
            className="relative z-10 inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary/30 px-4 py-2 rounded-lg transition-all cursor-pointer self-start"
          >
            <Award size={14} className="text-secondary" /> View Certificate
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default Internships
