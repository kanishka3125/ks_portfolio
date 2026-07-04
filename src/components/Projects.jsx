import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CodeXml, ExternalLink, FolderGit2, Play, ChevronDown, GitBranch
} from 'lucide-react';
import SectionHeading from './SectionHeading';


// ─── Status Config ───────────────────────────────────────────────────────────
const STATUS_RULES = [
  { test: /completed/i, cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.35)]" },
  { test: /ongoing/i,   cls: "bg-amber-500/20   text-amber-400   border-amber-500/30   shadow-[0_0_15px_rgba(245,158,11,0.35)]" },
]
const FALLBACK_STATUS_CLS = "bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.35)]"
function getStatusClass(status = '') {
  return (STATUS_RULES.find(r => r.test.test(status)) || { cls: FALLBACK_STATUS_CLS }).cls
}

// ─── Project Card with Hover Overlay Details ────────────────────────────────
function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setSpotlightPos({ x, y })
    const xc = rect.width / 2
    const yc = rect.height / 2
    setTilt({ x: -(y - yc) / (rect.height / 15), y: (x - xc) / (rect.width / 15) })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const statusClass = getStatusClass(project.status)

  const techStack = project.tech || [];

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
      className="group relative rounded-2xl bg-card-bg border border-card-border overflow-hidden shadow-xl hover:shadow-primary-light/5 hover:border-primary-light/25 flex flex-col h-full cursor-default"
    >
      {/* Spotlight gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(254,210,180,0.08), transparent 45%)`,
        }}
      />

      {/* ── Hero Banner ── */}
      <div className="relative h-[220px] w-full overflow-hidden bg-black/30 border-b border-card-border flex-shrink-0 z-0">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-bg-primary/50 text-text-muted">
            <FolderGit2 size={48} className="opacity-40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-95 group-hover:opacity-75 transition-opacity" />

        {/* Status & Difficulty Badges */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className={`px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-widest rounded border backdrop-blur-md ${statusClass}`}>
            {project.status || 'Ongoing'}
          </span>
          {project.difficulty && (
            <span className="px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-widest rounded border backdrop-blur-md bg-accent/20 text-accent border-accent/30 shadow-[0_0_15px_var(--glow-purple)]">
              {project.difficulty}
            </span>
          )}
        </div>

        {/* Domain + Type overlay */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className="text-[10px] font-mono font-bold text-text-muted bg-bg-primary/80 border border-card-border px-2 py-0.5 rounded-md animate-float">
            {project.domain} · {project.type}
          </span>
          <h3 className="text-base sm:text-lg font-heading font-black text-white mt-1 leading-tight drop-shadow-md line-clamp-1">
            {project.title}
          </h3>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5 flex flex-col justify-between flex-grow relative z-20" style={{ transform: 'translateZ(30px)' }}>
        <p className="text-xs text-text-muted mt-1 leading-relaxed line-clamp-4 font-medium font-sans">
          {project.shortDescription || project.description}
        </p>
      </div>

      {/* ── Cinematic Hover Overlay ── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 rounded-2xl overflow-hidden cursor-default"
            style={{ background: 'linear-gradient(180deg, #0a0810 0%, #1C1822 60%, #0f0d14 100%)' }}
          >
            {/* Cinematic letterbox bars */}
            <div className="absolute top-0 left-0 right-0 h-5 bg-black z-40" />
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-black z-40" />

            {/* Scanning line effect */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0.6 }}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute top-0 left-0 w-full h-full origin-left z-30 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(254,210,180,0.08), transparent)' }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)' }} />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col px-5 pt-7 pb-6">

              {/* Title + Watch Demo */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.05, duration: 0.35 }}
                className="flex items-center justify-between mb-3"
              >
                <h4 className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-neutral-400 truncate">
                  {project.title}
                </h4>
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[9px] font-mono font-bold text-primary-light border border-primary-light/40 bg-primary-light/10 px-2 py-0.5 rounded-full hover:bg-primary-light/20 transition-all whitespace-nowrap ml-2 flex-shrink-0"
                  >
                    <Play size={8} className="fill-primary-light" /> WATCH DEMO
                  </a>
                )}
              </motion.div>

              {/* About and Tech Stack */}
              <div className="flex-1 flex flex-col justify-start gap-4 mt-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {/* About Project */}
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col"
                >
                  <span className="text-[7px] font-mono font-black uppercase tracking-[0.25em] text-primary-light mb-1.5"
                    style={{ textShadow: `0 0 10px rgba(254,210,180,0.4)` }}
                  >
                    ABOUT PROJECT
                  </span>
                  <p className="text-[11px] font-sans font-medium text-neutral-300 leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col"
                >
                  <span className="text-[7px] font-mono font-black uppercase tracking-[0.25em] text-secondary mb-2"
                    style={{ textShadow: `0 0 10px rgba(255,170,166,0.4)` }}
                  >
                    TECH STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.map((tech, i) => (
                      <span key={i} className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer: GitHub + Demo */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.35 }}
                className="pt-2 mt-2 border-t border-white/20 flex items-center gap-2"
              >
                {/* GitHub button — full bright */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50 px-3 py-1.5 rounded-lg transition-all shadow-lg hover:shadow-white/10"
                  style={{ textShadow: '0 0 8px rgba(255,255,255,0.4)' }}
                >
                  {/* GitHub Octocat SVG */}
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  GitHub
                </a>

                {/* Live Demo button — glowing accent */}
                {project.demoLink ? (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-wider text-[#1C1822] bg-primary-light hover:bg-secondary px-3 py-1.5 rounded-lg transition-all shadow-lg shadow-primary-light/30 hover:shadow-primary-light/50"
                    style={{ textShadow: 'none' }}
                  >
                    <ExternalLink size={11} className="flex-shrink-0" /> Live Demo
                  </a>
                ) : (
                  <span className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-wider text-neutral-600 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg cursor-not-allowed select-none">
                    <ExternalLink size={11} className="flex-shrink-0" /> No Demo
                  </span>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main Projects Section ──────────────────────────────────────────────────
const Projects = ({ data }) => {
  return (
    <section id="projects" className="section-reveal py-8 md:py-12 relative">
      <div className="mb-8">
        <SectionHeading>Projects Lab</SectionHeading>
        <p className="text-text-muted max-w-lg text-sm leading-relaxed -mt-4 font-medium font-sans">
          Explore interactive modules detailing my technical projects, system architectures, and engineering learnings in artificial intelligence and web engineering.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
