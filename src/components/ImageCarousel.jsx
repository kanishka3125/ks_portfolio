/**
 * ImageCarousel — Premium reusable carousel + lightbox
 *
 * Card-level carousel with Ken Burns, auto-advance, hover pause.
 * Click opens a fullscreen lightbox with swipe, zoom, arrows, counter.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react'

/* ─── Inject Ken Burns + progress keyframes once ─────────────────────────── */
const STYLE_ID = 'carousel-keyframes'
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = `
    @keyframes kbZoomIn   { from{transform:scale(1) translateZ(0)} to{transform:scale(1.06) translateZ(0)} }
    @keyframes kbZoomOut  { from{transform:scale(1.06) translateZ(0)} to{transform:scale(1) translateZ(0)} }
    @keyframes progressFill { from{width:0%} to{width:100%} }
  `
  document.head.appendChild(s)
}

/* ─── Preload ────────────────────────────────────────────────────────────── */
function preload(src) {
  if (!src) return
  const img = new Image()
  img.src = src
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARD-LEVEL CAROUSEL
   ═══════════════════════════════════════════════════════════════════════════ */
export function ImageCarousel({ images = [], aspectRatio = '16/9', onOpenLightbox }) {
  const [idx, setIdx]         = useState(0)
  const [dir, setDir]         = useState(1)
  const [hovered, setHovered] = useState(false)
  const [kbAlt, setKbAlt]     = useState(false)
  const timer = useRef(null)
  const len   = images.length

  const go = useCallback((d) => {
    setDir(d)
    setKbAlt(v => !v)
    setIdx(i => {
      const n = (i + d + len) % len
      preload(images[(n + 1) % len])
      preload(images[(n - 1 + len) % len])
      return n
    })
  }, [len, images])

  // Auto-advance every 5s
  const startAuto = useCallback(() => {
    clearInterval(timer.current)
    if (len <= 1) return
    timer.current = setInterval(() => go(1), 5000)
  }, [len, go])

  useEffect(() => { startAuto(); return () => clearInterval(timer.current) }, [startAuto])
  useEffect(() => { hovered ? clearInterval(timer.current) : startAuto() }, [hovered, startAuto])
  useEffect(() => { preload(images[1]); preload(images[len - 1]) }, [images, len])

  if (!len) return null

  return (
    <div
      className="relative w-full overflow-hidden bg-black select-none"
      style={{ aspectRatio }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Slide */}
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div
          key={idx}
          custom={dir}
          initial={(d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 })}
          animate={{ x: 0, opacity: 1 }}
          exit={(d) => ({ x: d > 0 ? '-50%' : '50%', opacity: 0 })}
          transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
          className="absolute inset-0"
        >
          <img
            src={images[idx]}
            alt={`Slide ${idx + 1}`}
            draggable={false}
            onClick={() => onOpenLightbox?.(idx)}
            className="w-full h-full object-cover cursor-zoom-in"
            style={{
              animation: `${kbAlt ? 'kbZoomOut' : 'kbZoomIn'} 6s ease-in-out forwards`,
              willChange: 'transform',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Zoom hint on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
          <ZoomIn size={15} className="text-white" />
        </div>
      </div>

      {/* Arrows + dots + progress (only if multiple) */}
      {len > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); startAuto() }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-white hover:bg-black/70 transition-all"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); startAuto() }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-white hover:bg-black/70 transition-all"
          >
            <ChevronRight size={15} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setDir(i > idx ? 1 : -1); setIdx(i); startAuto() }}
                className="rounded-full"
                style={{
                  width: i === idx ? 18 : 6, height: 6,
                  background: i === idx ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                  boxShadow: i === idx ? '0 0 6px rgba(255,255,255,0.5)' : 'none',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-3 right-3 z-30 text-[10px] font-mono font-bold text-white/80 bg-black/50 backdrop-blur-sm border border-white/15 px-2 py-0.5 rounded-full">
            {idx + 1}/{len}
          </div>

          {/* Progress */}
          {!hovered && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-30 overflow-hidden">
              <div key={idx} className="h-full bg-white/70" style={{ animation: 'progressFill 5s linear forwards' }} />
            </div>
          )}
        </>
      )}
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════════════════
   FULLSCREEN LIGHTBOX  (portalled to document.body to escape modal stacking)
   ═══════════════════════════════════════════════════════════════════════════ */
function FullscreenLightbox({ images, startIndex, onClose }) {
  const [idx, setIdx]         = useState(startIndex)
  const [dir, setDir]         = useState(1)
  const [zoomed, setZoomed]   = useState(false)
  const [hovered, setHovered] = useState(false)
  const timer    = useRef(null)
  const touchRef = useRef(null)
  const len = images.length

  const go = useCallback((d) => {
    if (zoomed) return
    setDir(d)
    setIdx(i => {
      const n = (i + d + len) % len
      preload(images[(n + 1) % len])
      return n
    })
  }, [len, images, zoomed])

  const startAuto = useCallback(() => {
    clearInterval(timer.current)
    if (len <= 1 || zoomed) return
    timer.current = setInterval(() => go(1), 5000)
  }, [len, go, zoomed])

  useEffect(() => { startAuto(); return () => clearInterval(timer.current) }, [startAuto])
  useEffect(() => { hovered ? clearInterval(timer.current) : startAuto() }, [hovered, startAuto])

  // Keyboard
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') { go(1); startAuto() }
      if (e.key === 'ArrowLeft')  { go(-1); startAuto() }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [go, onClose, startAuto])

  // Lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()
    return () => {
      document.body.style.overflow = prev
      if (window.__lenis) window.__lenis.start()
    }
  }, [])

  // Touch swipe
  const onTouchStart = (e) => { touchRef.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchRef.current === null) return
    const d = touchRef.current - e.changedTouches[0].clientX
    if (Math.abs(d) > 40) { d > 0 ? go(1) : go(-1); startAuto() }
    touchRef.current = null
  }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Top bar ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 sm:px-8 py-4 z-10">
        <span className="text-sm font-mono font-bold text-white/70 tracking-widest">
          {idx + 1} <span className="text-white/30">/</span> {len}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomed(z => !z)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white/70 hover:bg-white/20 hover:text-white transition-all"
          >
            {zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white/70 hover:bg-white/20 hover:text-white transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ── Image area ── */}
      <div
        className="flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-16 relative"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`Image ${idx + 1}`}
            draggable={false}
            initial={{ opacity: 0, x: dir > 0 ? 120 : -120 }}
            animate={{ opacity: 1, x: 0, scale: zoomed ? 1.8 : 1 }}
            exit={{ opacity: 0, x: dir > 0 ? -120 : 120 }}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { type: 'spring', stiffness: 260, damping: 22 },
            }}
            onClick={() => setZoomed(z => !z)}
            className="max-w-full rounded-2xl shadow-2xl object-contain select-none"
            style={{
              cursor: zoomed ? 'zoom-out' : 'zoom-in',
              maxHeight: 'calc(100vh - 160px)',
            }}
          />
        </AnimatePresence>

        {/* Arrows */}
        {len > 1 && (
          <>
            <button
              onClick={() => { go(-1); startAuto() }}
              className="absolute left-2 sm:left-5 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => { go(1); startAuto() }}
              className="absolute right-2 sm:right-5 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* ── Bottom bar ── */}
      {len > 1 && (
        <div className="flex-shrink-0 flex flex-col items-center gap-3 py-4 z-10">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); startAuto() }}
                className="rounded-full border-none p-0"
                style={{
                  width: i === idx ? 22 : 7, height: 7,
                  background: i === idx ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                  boxShadow: i === idx ? '0 0 8px rgba(255,255,255,0.4)' : 'none',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
          {/* Progress */}
          {!hovered && !zoomed && (
            <div className="w-44 h-[2px] rounded-full bg-white/10 overflow-hidden">
              <div key={idx} className="h-full rounded-full bg-white/60" style={{ animation: 'progressFill 5s linear forwards' }} />
            </div>
          )}
        </div>
      )}

      {/* Thumbnail strip (≥ 4 images) */}
      {len >= 4 && (
        <div className="flex-shrink-0 flex items-center justify-center gap-2 px-4 pb-4 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); startAuto() }}
              className="flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all duration-300"
              style={{
                opacity: i === idx ? 1 : 0.4,
                transform: i === idx ? 'scale(1.1)' : 'scale(1)',
                outline: i === idx ? '2px solid rgba(255,255,255,0.5)' : '2px solid transparent',
                outlineOffset: '1px',
              }}
            >
              <img src={src} alt={`Thumb ${i + 1}`} draggable={false} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body
  )
}


/* ═══════════════════════════════════════════════════════════════════════════
   DEFAULT EXPORT — Carousel + Lightbox wired together (drop-in)
   ═══════════════════════════════════════════════════════════════════════════ */
export default function CarouselWithLightbox({ images = [], aspectRatio = '16/9' }) {
  const [lbIdx, setLbIdx] = useState(null)

  return (
    <>
      <ImageCarousel
        images={images}
        aspectRatio={aspectRatio}
        onOpenLightbox={(i) => setLbIdx(i)}
      />
      <AnimatePresence>
        {lbIdx !== null && (
          <FullscreenLightbox
            images={images}
            startIndex={lbIdx}
            onClose={() => setLbIdx(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
