import { useEffect, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronLeft, ChevronRight, Trophy, MapPin, Calendar,
  Users, BookOpen, CodeXml, ExternalLink, ZoomIn, ZoomOut
} from 'lucide-react'

// ─── Status Badge Config ────────────────────────────────────────────────────
const statusConfig = {
  Winner:      { cls: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', dot: 'bg-emerald-400' },
  Finalist:    { cls: 'bg-amber-500/20   text-amber-400   border-amber-500/40',   dot: 'bg-amber-400'   },
  Qualified:   { cls: 'bg-blue-500/20    text-blue-400    border-blue-500/40',    dot: 'bg-blue-400'    },
  Participant: { cls: 'bg-accent/20      text-accent      border-accent/40',       dot: 'bg-accent'      },
}

// ─── Image Carousel ─────────────────────────────────────────────────────────
function Carousel({ images, onZoom }) {
  const [current, setCurrent] = useState(0)
  const touchStart = useRef(null)

  const prev = useCallback(() =>
    setCurrent(c => (c - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() =>
    setCurrent(c => (c + 1) % images.length), [images.length])

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  // Touch swipe
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStart.current === null) return
    const delta = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev()
    touchStart.current = null
  }

  return (
    <div className="relative w-full bg-black select-none" style={{ aspectRatio: '16/9' }}>
      {/* Images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Slide ${current + 1}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="w-full h-full object-cover cursor-zoom-in"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={() => onZoom(images[current])}
          draggable={false}
        />
      </AnimatePresence>

      {/* Zoom hint */}
      <button
        onClick={() => onZoom(images[current])}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/70 transition-all"
        title="Click to zoom"
      >
        <ZoomIn size={14} />
      </button>

      {/* Prev / Next — only if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/80 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/80 transition-all"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-5 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Zoom Lightbox (full-screen image) ───────────────────────────────────────
function ZoomLightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
      >
        <X size={18} />
      </button>
      <motion.img
        src={src}
        alt="Zoomed"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="max-w-full max-h-[90vh] rounded-xl shadow-2xl cursor-zoom-out object-contain"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />
    </motion.div>,
    document.body
  )
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
  const [zoomSrc, setZoomSrc] = useState(null)
  const overlayRef = useRef(null)
  const badge = statusConfig[hack.status] || statusConfig.Participant
  const images = hack.images?.length ? hack.images : [hack.banner]

  // Lock/unlock Lenis smooth scroll for the lifetime of this modal
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()
    return () => {
      document.body.style.overflow = ''
      if (window.__lenis) window.__lenis.start()
    }
  }, []) // runs only on mount / unmount

  // ESC key — re-runs if zoomSrc changes (don't want ESC to close modal when zoom is open)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !zoomSrc) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, zoomSrc])

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return createPortal(
    <>
      <AnimatePresence>
        {zoomSrc && (
          <ZoomLightbox src={zoomSrc} onClose={() => setZoomSrc(null)} />
        )}
      </AnimatePresence>

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

          {/* ── Image Carousel ── */}
          <div className="flex-shrink-0">
            <Carousel images={images} onZoom={setZoomSrc} />
          </div>

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
