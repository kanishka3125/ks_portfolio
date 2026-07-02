import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Trophy, MapPin, Calendar,
  Users, BookOpen, CodeXml, ExternalLink
} from 'lucide-react'


// ─── Status Badge Config ─────────────────────────────────────────────────────
// Handles both exact strings and partial matches (e.g. "Top 10 Finalist")
const STATUS_MAP = [
  { test: /winner/i,     cls: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', dot: 'bg-emerald-400' },
  { test: /top\s*\d/i,  cls: 'bg-amber-500/20   text-amber-400   border-amber-500/40',   dot: 'bg-amber-400'   },
  { test: /finalist/i,  cls: 'bg-amber-500/20   text-amber-400   border-amber-500/40',   dot: 'bg-amber-400'   },
  { test: /qualified/i, cls: 'bg-blue-500/20    text-blue-400    border-blue-500/40',    dot: 'bg-blue-400'    },
]
const DEFAULT_BADGE = { cls: 'bg-accent/20 text-accent border-accent/40', dot: 'bg-accent' }
function getBadge(status = '') {
  return STATUS_MAP.find(m => m.test.test(status)) || DEFAULT_BADGE
}



// ─── Info Row helper ─────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value, accent }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${accent || 'bg-white/5 border border-white/10'}`}>
        <Icon size={14} className="text-text-muted" />
      </div>
      <div>
        <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-text-muted">{label}</p>
        <p className="text-sm text-text-primary font-medium leading-snug mt-0.5">{value}</p>
      </div>
    </div>
  )
}

// ─── Main Modal ──────────────────────────────────────────────────────────────
export default function HackathonModal({ hack, onClose }) {
  const overlayRef = useRef(null)
  const badge  = getBadge(hack.status)


  // Lock/unlock Lenis smooth scroll for the lifetime of this modal
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()
    return () => {
      document.body.style.overflow = ''
      if (window.__lenis) window.__lenis.start()
    }
  }, [])

  // ESC to close (lightbox inside ImageCarousel handles its own ESC)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return createPortal(
    <>

      <motion.div
        ref={overlayRef}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleOverlayClick}
        onWheel={(e) => e.stopPropagation()}
      >
        <motion.div
          className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-card-border bg-card-bg"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Close button ── */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-bg-primary/80 border border-card-border text-text-muted hover:text-text-primary hover:bg-card-bg transition-all"
          >
            <X size={15} />
          </button>



          {/* ── Scrollable Content ── */}
          <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-5 scrollbar-thin scrollbar-thumb-card-border scrollbar-track-transparent">

            {/* Header */}
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <span className={`inline-flex items-center gap-1.5 text-[9px] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded border mb-2 ${badge.cls}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                  {hack.status}
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-black text-text-primary leading-tight">
                  {hack.name}
                </h2>
                <p className="text-xs font-mono font-semibold text-secondary mt-1">
                  Project: {hack.projectName}
                </p>
              </div>
            </div>

            {/* Meta info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoRow icon={Calendar} label="Date" value={hack.date} />
              <InfoRow icon={MapPin}   label="Location" value={hack.location || 'India'} />
              {hack.teamMembers?.length > 0 && (
                <InfoRow
                  icon={Users}
                  label="Team Members"
                  value={hack.teamMembers.join(' · ')}
                />
              )}
              <InfoRow icon={Trophy} label="Achievement" value={hack.status} />
            </div>

            {/* Divider */}
            <div className="h-px bg-card-border/50" />

            {/* Description */}
            <div>
              <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-text-muted mb-2">
                About the Project
              </p>
              <p className="text-sm text-text-muted leading-relaxed">{hack.description}</p>
            </div>

            {/* Achievements */}
            {hack.achievements && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-start gap-3">
                <Trophy size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-emerald-400 mb-1">
                    Accomplishments
                  </p>
                  <p className="text-sm text-text-primary leading-relaxed">{hack.achievements}</p>
                </div>
              </div>
            )}

            {/* Learnings */}
            {hack.learnings && (
              <div className="rounded-xl border border-card-border bg-bg-primary/40 p-4 flex items-start gap-3">
                <BookOpen size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-accent mb-1">
                    Key Learnings
                  </p>
                  <p className="text-sm text-text-muted leading-relaxed">{hack.learnings}</p>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {hack.techStack?.length > 0 && (
              <div>
                <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-text-muted mb-2.5">
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {hack.techStack.map(tech => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono font-semibold bg-bg-primary/60 text-text-primary border border-card-border px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-card-border/50" />

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap pb-1">
              <a
                href={hack.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-text-primary border border-card-border bg-bg-primary/60 hover:bg-card-bg hover:border-primary-light/40 px-4 py-2 rounded-xl transition-all"
              >
                <CodeXml size={15} /> Repository
              </a>
              <a
                href={hack.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-[#1C1822] bg-primary-light hover:bg-secondary px-4 py-2 rounded-xl transition-colors shadow-md shadow-primary-light/10"
              >
                View Demo <ExternalLink size={13} />
              </a>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </>,
    document.body
  )
}
