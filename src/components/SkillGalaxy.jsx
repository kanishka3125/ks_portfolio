import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Brain, Globe, Wrench, Award } from 'lucide-react'
import SectionHeading from './SectionHeading'

// Helper to resolve category Lucide Icons
const getCategoryIcon = (id) => {
  switch (id) {
    case 'programming': return <Terminal className="w-4.5 h-4.5 text-cyan-400" />
    case 'aiml': return <Brain className="w-4.5 h-4.5 text-pink-400" />
    case 'webdev': return <Globe className="w-4.5 h-4.5 text-purple-400" />
    case 'tools': return <Wrench className="w-4.5 h-4.5 text-emerald-400" />
    default: return <Terminal className="w-4.5 h-4.5" />
  }
};

// Skill Badge Component with custom Vercel-style hover tooltip
function SkillBadge({ skill, category }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      id={`skill-${skill.id}`}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/5 hover:border-white/15 rounded-xl cursor-default transition-all duration-300 shadow-sm"
        style={{
          boxShadow: isHovered ? `0 0 15px ${(skill.color || category.color)}20` : 'none'
        }}
      >
        {/* Glow behind badge */}
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-xl opacity-[0.03] blur-md pointer-events-none transition-all duration-300"
            style={{ backgroundColor: skill.color || category.color }}
          />
        )}
        
        {/* Tech Icon / Fallback dot */}
        {!imgError && skill.icon ? (
          <img 
            src={skill.icon} 
            alt={skill.name} 
            className="w-3.5 h-3.5 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105" 
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full relative z-10" style={{ backgroundColor: skill.color || category.color }} />
        )}
        <span className="text-[11.5px] font-semibold text-gray-300 hover:text-white relative z-10 select-none transition-colors duration-200">
          {skill.name}
        </span>
      </motion.div>

      {/* Popover detailed tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 6, scale: 0.96, x: '-50%' }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 mb-3.5 z-[100] w-[260px] sm:w-72 pointer-events-none"
          >
            <div className="glass-card bg-[#0b0813]/98 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md relative overflow-visible text-left">
              {/* Colored top indicator */}
              <div 
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" 
                style={{ backgroundColor: skill.color || category.color }} 
              />
              
              {/* Name & Icon */}
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                  {!imgError && skill.icon ? (
                    <img src={skill.icon} alt="" className="w-3.5 h-3.5 object-contain" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: skill.color || category.color }} />
                  )}
                </div>
                <span className="text-[13px] font-bold text-white font-heading">{skill.name}</span>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-2 text-[10.5px] mb-3 relative z-10">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2 text-center">
                  <span className="text-gray-500 block text-[8px] uppercase tracking-wider font-bold mb-0.5">Proficiency</span>
                  <span className="font-extrabold text-white">{skill.level}</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2 text-center">
                  <span className="text-gray-500 block text-[8px] uppercase tracking-wider font-bold mb-0.5">Experience</span>
                  <span className="font-extrabold text-white font-mono">{skill.experience}</span>
                </div>
              </div>

              {/* Projects */}
              {skill.projects && skill.projects.length > 0 && (
                <div className="mb-3 relative z-10">
                  <span className="text-[8.5px] text-gray-500 block mb-1 font-bold uppercase tracking-wider">Applied Projects</span>
                  <ul className="space-y-1 pl-1">
                    {skill.projects.map((proj, idx) => (
                      <li key={idx} className="text-[10px] text-gray-300 flex items-start gap-1.5 leading-snug">
                        <span className="text-secondary mt-1.5 shrink-0 w-1 h-1 rounded-full bg-secondary" />
                        <span className="font-medium">{proj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certifications */}
              {skill.certifications && skill.certifications.length > 0 && (
                <div className="pt-2.5 border-t border-white/5 relative z-10">
                  <span className="text-[8.5px] text-gray-500 block mb-1.5 font-bold uppercase tracking-wider">Certifications</span>
                  <div className="flex flex-wrap gap-1">
                    {skill.certifications.map((cert, idx) => (
                      <span key={idx} className="bg-gradient-to-r from-primary-light/10 to-secondary/10 border border-secondary/15 px-2 py-0.5 rounded-lg text-[9px] text-white font-semibold flex items-center gap-1 shadow-sm">
                        <Award className="w-2.5 h-2.5 text-secondary shrink-0" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Decorative Tooltip Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0b0813] rotate-45 border-r border-b border-white/10 -mt-1.5 shadow-lg z-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Category Card Layout Component
function CategoryCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="glass-card flex flex-col justify-between p-6 rounded-3xl relative overflow-visible group"
    >
      {/* Top accent glow line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl opacity-80 transition-all duration-300 group-hover:h-[4px]"
        style={{ 
          backgroundColor: '#FFAB91',
          boxShadow: '0 2px 14px rgba(255, 171, 145, 0.3)'
        }}
      />

      <div className="relative z-10">
        {/* Header Area */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center shadow-inner group-hover:border-white/15 transition-all duration-300">
            {getCategoryIcon(category.id)}
          </div>
          <h4 className="text-white font-heading font-black text-[13.5px] tracking-wider uppercase">
            {category.name}
          </h4>
        </div>

        {/* Short description */}
        <p className="text-[11.5px] text-gray-400 leading-relaxed mb-6 font-medium">
          {category.description}
        </p>

        {/* Skills wrapper */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} category={category} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillGalaxy({ data }) {
  const categories = Object.values(data.workspaceSkills || {});

  return (
    <section id="skills" className="section-reveal py-16 md:py-24 relative overflow-visible">
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <SectionHeading align="center">Skills & Technologies</SectionHeading>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto mt-3 leading-relaxed"
          >
            An interactive overview of my programming proficiency, data science techniques, web framework competence, and engineer tooling.
          </motion.p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-primary-light/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
    </section>
  )
}
