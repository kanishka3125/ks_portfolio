import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CodeXml, ExternalLink, Sparkles, Lightbulb, Zap } from 'lucide-react'

export default function ProjectModal({ project, isOpen, onClose }) {
  // Lock body scroll + hide navbar when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Hide navbar
      const nav = document.querySelector('nav')
      if (nav) nav.style.display = 'none'
    } else {
      document.body.style.overflow = ''
      const nav = document.querySelector('nav')
      if (nav) nav.style.display = ''
    }
    return () => {
      document.body.style.overflow = ''
      const nav = document.querySelector('nav')
      if (nav) nav.style.display = ''
    }
  }, [isOpen])

  // Close on Escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-lg" />

          {/* Modal Content — centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#0d0d28]/98 border border-white/10 shadow-2xl shadow-primary-light/5"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={16} className="text-white" />
            </button>

            {/* Project Image */}
            {project.image ? (
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d28] via-transparent to-transparent" />
              </div>
            ) : (
              <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary-light/20 to-secondary/20 flex items-center justify-center">
                <Sparkles size={36} className="text-primary-light/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d28] via-transparent to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-6 -mt-8 relative z-10">
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-300 leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                      className="text-xs font-semibold bg-primary-light/10 border border-primary-light/20 text-primary-light px-3 py-1 rounded-full"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Zap size={12} className="text-secondary" /> Key Features
                </h4>
                <ul className="space-y-1.5">
                  {project.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                      className="flex items-start gap-2 text-gray-300 text-sm"
                    >
                      <div className="w-1 h-1 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <span>{f}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Challenges & Learnings */}
              {project.challenges && (
                <div className="mb-5">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Lightbulb size={12} className="text-accent" /> Challenges & Learnings
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{project.challenges}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary-light/30 text-white font-semibold text-sm transition-all duration-300"
                  >
                    <CodeXml size={16} /> Source Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-button text-white font-semibold text-sm"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
