import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, CodeXml, ExternalLink, BookOpen, Expand } from 'lucide-react'
import SectionHeading from './SectionHeading'
import HackathonModal from './HackathonModal'

// ─── Status Config ───────────────────────────────────────────────────────────
const STATUS_RULES = [
  { test: /winner/i,     cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.35)]" },
  { test: /top\s*\d/i,  cls: "bg-amber-500/20   text-amber-400   border-amber-500/30   shadow-[0_0_15px_rgba(245,158,11,0.35)]" },
  { test: /finalist/i,  cls: "bg-amber-500/20   text-amber-400   border-amber-500/30   shadow-[0_0_15px_rgba(245,158,11,0.35)]" },
  { test: /qualified/i, cls: "bg-blue-500/20    text-blue-400    border-blue-500/30    shadow-[0_0_15px_rgba(59,130,246,0.35)]" },
]
const FALLBACK_CLS = "bg-accent/20 text-accent border-accent/30 shadow-[0_0_15px_var(--glow-purple)]"
function getBadgeClass(status = '') {
  return (STATUS_RULES.find(r => r.test.test(status)) || { cls: FALLBACK_CLS }).cls
}

// ─── Mission Card ────────────────────────────────────────────────────────────
function MissionCard({ hack, index, onOpen }) {
  const cardRef  = useRef(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [tilt,         setTilt]         = useState({ x: 0, y: 0 })
  const [isHovered,    setIsHovered]    = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setSpotlightPos({ x, y })
    const xc = rect.width  / 2
    const yc = rect.height / 2
    setTilt({ x: -(y - yc) / (rect.height / 15), y: (x - xc) / (rect.width / 15) })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const badgeClass = getBadgeClass(hack.status)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
      className="group relative rounded-2xl bg-card-bg border border-card-border overflow-hidden shadow-xl hover:shadow-primary-light/5 hover:border-primary-light/25 flex flex-col h-full"
    >
      {/* Spotlight gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(254,210,180,0.08), transparent 45%)`,
        }}
      />

      {/* ── Hero Banner ── */}
      <div
        className="relative h-[220px] w-full overflow-hidden bg-black/30 border-b border-card-border flex-shrink-0 z-0 cursor-pointer"
        onClick={() => onOpen(hack)}
        title="Click to view details"
      >
        <img
          src={hack.banner}
          alt={hack.name}
          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-95 group-hover:opacity-75 transition-opacity" />

        {/* Expand hint on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Expand size={16} className="text-white" />
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-widest rounded border backdrop-blur-md ${badgeClass}`}>
            {hack.status}
          </span>
        </div>

        {/* Name + Date overlay */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className="text-[10px] font-mono font-bold text-text-muted bg-bg-primary/80 border border-card-border px-2 py-0.5 rounded-md">
            {hack.date}
          </span>
          <h3 className="text-base sm:text-lg font-heading font-black text-white mt-1 leading-tight drop-shadow-md">
            {hack.name}
          </h3>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5 flex flex-col justify-between flex-grow relative z-20" style={{ transform: 'translateZ(30px)' }}>
        <div>
          <span className="text-[10px] font-mono font-semibold tracking-wider text-secondary uppercase">
            Project: {hack.projectName}
          </span>

          <p className="text-sm font-heading text-text-muted mt-2.5 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {hack.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap items-center gap-1 mt-4">
            {hack.techStack.map(tech => (
              <span key={tech} className="text-[9px] font-mono bg-bg-primary/60 text-text-muted border border-card-border/80 px-2 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>

          {/* Hover drawer */}
          <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-48 group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 ease-in-out border-t border-card-border/40 pt-0 group-hover:pt-3">
            {hack.achievements && (
              <div className="flex items-start gap-1.5 text-xs text-amber-400/90 mb-2 font-medium">
                <Trophy size={13} className="mt-0.5 flex-shrink-0" />
                <span><strong className="text-amber-400">Accomplished:</strong> {hack.achievements}</span>
              </div>
            )}
            {hack.learnings && (
              <div className="flex items-start gap-1.5 text-xs text-text-muted font-medium">
                <BookOpen size={13} className="mt-0.5 flex-shrink-0 text-accent" />
                <span><strong className="text-text-primary">Key Learning:</strong> {hack.learnings}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-5 pt-3 border-t border-card-border/50 flex items-center justify-between gap-2">
          <a
            href={hack.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <CodeXml size={14} /> Repository
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpen(hack)}
              className="flex items-center gap-1 text-xs font-bold text-text-muted border border-card-border hover:border-primary-light/40 hover:text-text-primary px-3 py-1.5 rounded-lg transition-all"
            >
              Details
            </button>
            <a
              href={hack.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-[#1C1822] bg-primary-light hover:bg-secondary px-3 py-1.5 rounded-lg transition-colors shadow-md shadow-primary-light/10"
              onClick={e => e.stopPropagation()}
            >
              Demo <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function HackathonBattlefield({ data }) {
  const [activeHack, setActiveHack] = useState(null)

  return (
    <>
      <section id="hackathons" className="section-reveal py-8 md:py-12 relative">
        <SectionHeading>Hackathon Battlefield</SectionHeading>

        <p className="text-text-muted max-w-lg text-sm leading-relaxed -mt-4 mb-8">
          Futuristic mission logs representing competitive hackathons, custom architectures built under constraints, and code repository links.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.hackathons.map((hack, index) => (
            <MissionCard
              key={hack.id}
              hack={hack}
              index={index}
              onOpen={setActiveHack}
            />
          ))}
        </div>
      </section>

      {/* Modal Portal */}
      <AnimatePresence>
        {activeHack && (
          <HackathonModal
            hack={activeHack}
            onClose={() => setActiveHack(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
