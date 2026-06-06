import { useEffect, useState, Suspense, lazy } from 'react'
import './App.css'
import { portfolioData } from './data/portfolioData'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Internships from './components/Internships'
import ProjectsTeaser from './components/ProjectsTeaser'
import ProjectsHub from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import ChatBot from './components/ChatBot'
import CustomCursor from './components/CustomCursor'
import StatsGrid from './components/StatsGrid'
import TechJourney from './components/TechJourney'
import HackathonBattlefield from './components/HackathonBattlefield'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Lazy-load heavy 3D component
const ParticleField = lazy(() => import('./components/ParticleField'))

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home' | 'projects-hub'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ks_portfolio_theme') || 'dark'
  })

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

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  // Listen to hash changes for view routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#projects-hub') {
        setCurrentView('projects-hub')
        window.scrollTo({ top: 0, behavior: 'instant' })
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      } else {
        setCurrentView('home')
        
        // If coming back from projects hub, wait a moment for home view to mount before scrolling
        if (hash && hash !== '#') {
          setTimeout(() => {
            const targetElement = document.querySelector(hash)
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
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Initial check

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // Global 3D scroll reveal animations for sections (runs on mount and view changes)
  useEffect(() => {
    if (currentView !== 'home') return

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
  }, [currentView])

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

      <Navbar data={portfolioData} theme={theme} toggleTheme={toggleTheme} />

      <main className="container mx-auto px-4 md:px-6 pt-24 relative z-10 flex flex-col gap-6 md:gap-10 pb-20">
        {currentView === 'home' ? (
          <>
            <Hero data={portfolioData} theme={theme} />
            <StatsGrid data={portfolioData} />
            <About data={portfolioData} />
            <Skills data={portfolioData} />
            <Experience data={portfolioData} />
            <HackathonBattlefield data={portfolioData} />
            <TechJourney data={portfolioData} />
            <Internships data={portfolioData} />
            <ProjectsTeaser />
            <Certifications data={portfolioData} />
            <Contact data={portfolioData} theme={theme} />
          </>
        ) : (
          <ProjectsHub data={portfolioData} />
        )}
      </main>

      <ChatBot data={portfolioData} />

      <footer className="py-8 border-t border-white/10 text-center relative z-10 bg-black/20 backdrop-blur-sm">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {portfolioData.name}. Built with React, Three.js, GSAP & Tailwind v4.
        </p>
      </footer>
    </div>
  )
}

export default App
