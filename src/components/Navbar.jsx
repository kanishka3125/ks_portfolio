import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Briefcase } from 'lucide-react'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const Navbar = ({ data, theme, toggleTheme, isRecruiterMode, toggleRecruiterMode }) => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-1.5' : 'py-3'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`flex items-center justify-between h-12 px-5 md:px-6 rounded-xl transition-all duration-500 ${scrolled ? 'bg-header-bg backdrop-blur-xl border border-glass-border shadow-xl shadow-black/10' : 'bg-white/[0.03] backdrop-blur-md border border-white/5'}`}>
            <a href="#" className="text-lg font-heading font-black tracking-tighter text-text-primary group">
              KS<span className="text-primary-light group-hover:text-secondary transition-colors duration-300">.</span>
            </a>

            <div className="hidden md:flex items-center gap-0.5">
              {!isRecruiterMode && navItems.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`relative text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-300 ${
                    activeSection === href ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                  {activeSection === href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/[0.08] rounded-md"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleRecruiterMode}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-300 text-[11px] font-bold uppercase tracking-wider ${
                  isRecruiterMode
                    ? 'bg-green-500/10 text-green-400 border-green-500/40 shadow-[0_0_10px_rgba(34,197,94,0.15)]'
                    : 'bg-white/5 text-text-muted border-white/10 hover:text-white hover:bg-white/10'
                }`}
                title="Toggle Recruiter Mode"
              >
                <Briefcase size={13} className={isRecruiterMode ? "animate-pulse" : ""} />
                <span>{isRecruiterMode ? 'Recruiter Mode' : 'Recruiter Mode'}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="w-8.5 h-8.5 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-text-primary transition-all duration-300 cursor-pointer hover:scale-105"
                aria-label="Toggle light/dark theme"
              >
                {theme === 'dark' ? (
                  <Sun size={15} className="text-primary-light fill-primary-light/10 animate-float" style={{ animationDuration: '4s' }} />
                ) : (
                  <Moon size={15} className="text-accent fill-accent/10 animate-float" style={{ animationDuration: '4s' }} />
                )}
              </button>

              <a
                href={data.contact.resume}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex text-xs font-bold bg-gradient-button text-white px-4 py-1.5 rounded-lg shadow-md shadow-primary-light/20 hover:shadow-primary-light/40 transition-all duration-300"
              >
                Resume
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-8 h-8 flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-white cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99] md:hidden"
          >
            <div className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl transition-colors duration-300" />
            <div className="relative flex flex-col items-center justify-center h-full gap-6">
              
              <button
                onClick={() => {
                  toggleRecruiterMode()
                  setMobileOpen(false)
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all duration-300 text-sm font-bold uppercase tracking-wider mb-4 ${
                  isRecruiterMode
                    ? 'bg-green-500/10 text-green-400 border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                    : 'bg-white/5 text-text-muted border-white/10 hover:text-white'
                }`}
              >
                <Briefcase size={16} />
                <span>{isRecruiterMode ? 'Recruiter Mode ON' : 'Recruiter Mode'}</span>
              </button>

              {navItems.map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`text-2xl font-heading font-bold transition-colors ${
                    activeSection === href ? 'text-primary-light' : 'text-white hover:text-primary-light'
                  }`}
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href={data.contact.resume}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 text-sm font-bold bg-gradient-button text-white px-6 py-2.5 rounded-xl"
              >
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
