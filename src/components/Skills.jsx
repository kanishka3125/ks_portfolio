import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Terminal, Users } from 'lucide-react'
import SectionHeading from './SectionHeading'

/* ─── Skill logo map (Devicon / Simple Icons CDN) ─────────────────────────── */
const SKILL_ICONS = {
  // Languages
  'Python':           'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'C':                'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
  'C++':              'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
  'HTML':             'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'Java':             'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  'JavaScript':       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'JavaScript, SQL':  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'SQL':              'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',

  // Tools
  'Git & GitHub':     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  'NumPy/Pandas':     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
  'VS Code':          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
  'Jupyter Notebook': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg',
  'Google Colab':     'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',

  // Communities
  'GirlScript Summer of Code':  'https://cdn.simpleicons.org/opensourceinitiative/3DA639',
  'Open Source Connect Global':  'https://cdn.simpleicons.org/github/white',
  'Open Source Connect India':   'https://cdn.simpleicons.org/github/white',
  'Google Developer Community':  'https://cdn.simpleicons.org/google/4285F4',
  'Google and NVIDIA Community': 'https://cdn.simpleicons.org/nvidia/76B900',
}

const skillMeta = {
  'Python': { proficiency: 90, related: ['TensorFlow', 'NumPy', 'Pandas'] },
  'C': { proficiency: 75, related: ['Data Structures', 'Algorithms'] },
  'C++': { proficiency: 75, related: ['OOP', 'STL'] },
  'HTML': { proficiency: 85, related: ['CSS', 'Tailwind'] },
  'Java': { proficiency: 70, related: ['OOP', 'Collections'] },
  'JavaScript': { proficiency: 80, related: ['React', 'Node.js'] },
  'JavaScript, SQL': { proficiency: 80, related: ['React', 'Node.js', 'MySQL'] },
  'Git & GitHub': { proficiency: 85, related: ['Version Control', 'CI/CD'] },
  'NumPy/Pandas': { proficiency: 80, related: ['Data Analysis', 'ML'] },
  'VS Code': { proficiency: 90, related: ['Extensions', 'Debugging'] },
  'Jupyter Notebook': { proficiency: 85, related: ['Data Science', 'Visualization'] },
  'Google Colab': { proficiency: 80, related: ['Cloud ML', 'GPU'] },
}

const categories = [
  { key: 'languages', title: 'Languages', icon: Code2, color: 'primary-light', colorVar: 'var(--primary-light)' },
  { key: 'tools', title: 'Tools & Frameworks', icon: Terminal, color: 'secondary', colorVar: 'var(--secondary)' },
  { key: 'communities', title: 'Community', icon: Users, color: 'accent', colorVar: 'var(--accent)' },
]

const Skills = ({ data }) => {
  return (
    <section id="skills" className="section-reveal py-8 md:py-12">
      <SectionHeading>Skills & Expertise</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {categories.map((cat, catIdx) => {
          const Icon = cat.icon
          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card glow-border p-6 rounded-2xl relative overflow-hidden group"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 opacity-15 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: cat.colorVar }}
              />
              <div className="relative z-10">
                <div className="mb-4 w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon style={{ color: cat.colorVar }} size={18} />
                </div>
                <h3 className="text-base font-heading font-bold text-white mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills[cat.key].map((item, index) => (
                    <SkillPill key={index} name={item} index={index} colorVar={cat.colorVar} meta={skillMeta[item]} logo={SKILL_ICONS[item]} />
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function SkillPill({ name, index, colorVar, meta, logo }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3 + (index % 3), repeat: Infinity, delay: index * 0.3, ease: 'easeInOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 cursor-default whitespace-nowrap"
        style={hovered ? { borderColor: colorVar, color: colorVar } : {}}
      >
        {logo && (
          <img
            src={logo}
            alt=""
            className="w-4 h-4 object-contain flex-shrink-0"
            style={{ filter: hovered ? 'none' : 'grayscale(80%) brightness(0.7)' , transition: 'filter 0.3s ease' }}
          />
        )}
        {name}
      </span>

      {hovered && meta && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2.5 rounded-lg bg-card-bg border border-card-border shadow-2xl z-50 min-w-[160px]"
        >
          <div className="flex items-center gap-2 mb-1.5">
            {logo && <img src={logo} alt="" className="w-4 h-4 object-contain" />}
            <span className="text-[11px] font-bold text-text-primary flex-1">{name}</span>
            <span className="text-[11px] font-bold" style={{ color: colorVar }}>{meta.proficiency}%</span>
          </div>
          <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden mb-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${meta.proficiency}%` }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="h-full rounded-full"
              style={{ backgroundColor: colorVar }}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {meta.related.map((r, i) => (
              <span key={i} className="text-[9px] font-medium text-text-muted bg-white/5 px-1.5 py-0.5 rounded">{r}</span>
            ))}
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-card-bg border-r border-b border-card-border" />
        </motion.div>
      )}
    </motion.div>
  )
}

export default Skills
