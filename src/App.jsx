import { useEffect, useState, Suspense, lazy } from 'react'
import './App.css'
import { portfolioData } from './data/portfolioData'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SkillGalaxy from './components/SkillGalaxy'
import Experience from './components/Experience'
import Internships from './components/Internships'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import ChatBot from './components/ChatBot'
import CustomCursor from './components/CustomCursor'
import StatsGrid from './components/StatsGrid'
import TechJourney from './components/TechJourney'
import HackathonBattlefield from './components/HackathonBattlefield'
import RecruiterOverview from './components/RecruiterOverview'
import ContactBar from './components/ContactBar'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Lazy-load heavy 3D component
const ParticleField = lazy(() => import('./components/ParticleField'))

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ks_portfolio_theme') || 'dark'
  })
  
  const [isRecruiterMode, setIsRecruiterMode] = useState(false)
  const toggleRecruiterMode = () => setIsRecruiterMode(prev => !prev)

  // Sync theme class to documentElement
  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
    localStorage.setItem('ks_portfolio_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    // Expose instance globally so modals can pause/resume scroll
    window.__lenis = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      window.__lenis = null
    }
  }, [])

  // Listen to hash changes for smooth scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash && hash !== '#') {
        const targetId = hash === '#projects-hub' ? '#projects' : hash
        setTimeout(() => {
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
          ScrollTrigger.refresh()
        }, 150)
      } else {
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 150)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Initial check

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // Global 3D scroll reveal animations for sections (runs on mount)
  useEffect(() => {
    const sections = document.querySelectorAll('.section-reveal')
    sections.forEach((section) => {
      // Create a 3D smooth transition
      gsap.set(section, { transformPerspective: 1000 })
      
      gsap.fromTo(section,
        { 
          opacity: 0, 
          y: 80, 
          rotationX: -15, 
          z: -100,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          z: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden relative transition-colors duration-300">
      {/* 3D Immersive Background (desktop only, lazy-loaded) */}
      <Suspense fallback={null}>
        <ParticleField theme={theme} />
      </Suspense>

      {/* CSS fallback background (visible on mobile / while 3D loads) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="immersive-bg"></div>
        <div className="immersive-grid"></div>
        <div className="immersive-particles"></div>
      </div>

      {/* Custom Cursor (desktop only) */}
      <CustomCursor />

      <Navbar data={portfolioData} theme={theme} toggleTheme={toggleTheme} isRecruiterMode={isRecruiterMode} toggleRecruiterMode={toggleRecruiterMode} />

      <main className="container mx-auto px-4 md:px-6 pt-24 relative z-10 flex flex-col gap-6 md:gap-10 pb-20">
        {!isRecruiterMode ? (
          <>
            <Hero data={portfolioData} theme={theme} />
            <StatsGrid data={portfolioData} />
            <About data={portfolioData} />
            <SkillGalaxy data={portfolioData} />
            <Experience data={portfolioData} />
            <HackathonBattlefield data={portfolioData} />
            <TechJourney data={portfolioData} />
            <Internships data={portfolioData} />
            <Projects data={portfolioData} />
            <Certifications data={portfolioData} />
            <Contact data={portfolioData} theme={theme} />
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col gap-6 md:gap-10">
              <RecruiterOverview data={portfolioData} />
              <Experience data={portfolioData} />
              <Internships data={portfolioData} />
              <Projects data={portfolioData} />
              <SkillGalaxy data={portfolioData} />
              <HackathonBattlefield data={portfolioData} />
              <Certifications data={portfolioData} />
            </div>
          </div>
        )}
      </main>

      <ChatBot data={portfolioData} />
      
      <ContactBar data={portfolioData} isVisible={isRecruiterMode} />

      <footer className="py-8 border-t border-white/10 text-center relative z-10 bg-black/20 backdrop-blur-sm">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {portfolioData.name}. Built with React, Three.js, GSAP & Tailwind v4.
        </p>
      </footer>
    </div>
  )
}

export default App
