import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { CodeXml, Link, FileText, ChevronDown, Sparkles } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import * as THREE from 'three'

// Section nodes for navigation - distributed for better visibility
const globeNodes = [
  { id: 'about', label: 'About Me', phi: Math.PI * 0.25, theta: 0 },
  { id: 'skills', label: 'Skills', phi: Math.PI * 0.4, theta: Math.PI * 0.3 },
  { id: 'experience', label: 'Experience', phi: Math.PI * 0.5, theta: -Math.PI * 0.3 },
  { id: 'internships', label: 'Internships', phi: Math.PI * 0.65, theta: Math.PI * 0.4 },
  { id: 'projects', label: 'Projects', phi: Math.PI * 0.75, theta: -Math.PI * 0.2 },
  { id: 'certifications', label: 'Certifications', phi: Math.PI * 0.45, theta: Math.PI * 0.7 },
  { id: 'contact', label: 'Contact', phi: Math.PI * 0.85, theta: Math.PI * 0.1 },
]

function getSphericalPos(radius, phi, theta) {
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

function NeuralGlobe({ theme }) {
  const groupRef = useRef()
  const globeRadius = 2.5

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.04
    const targetX = (state.pointer.x * Math.PI) / 6
    const targetY = (state.pointer.y * Math.PI) / 6
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05
  })

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={1}>
      <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
        <mesh>
          <icosahedronGeometry args={[globeRadius, 3]} />
          <meshStandardMaterial
            color={theme === 'light' ? '#DE8755' : '#FED2B4'}
            emissive={theme === 'light' ? '#96689F' : '#D3B7D8'}
            emissiveIntensity={0.6}
            wireframe={true}
            transparent
            opacity={0.25}
          />
        </mesh>

        <points>
          <icosahedronGeometry args={[globeRadius, 3]} />
          <pointsMaterial
            color={theme === 'light' ? '#D96D68' : '#FFAAA6'}
            size={0.04}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>

        {globeNodes.map((node, i) => {
          const pos = getSphericalPos(globeRadius + 0.1, node.phi, node.theta)
          return (
            <group key={i} position={pos}>
              <mesh>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color="#34D399" />
              </mesh>
              <Html center distanceFactor={10} zIndexRange={[100, 0]}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleNavClick(node.id);
                  }}
                  className="cursor-pointer group whitespace-nowrap bg-glass-bg/95 backdrop-blur-md border border-primary-light/35 hover:border-secondary px-4 py-2 rounded-xl text-sm font-bold text-text-primary hover:text-primary-light hover:scale-110 transition-all duration-300 shadow-md shadow-primary-light/20"
                  style={{ pointerEvents: 'auto' }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#34D399] inline-block mr-2 animate-pulse shadow-[0_0_8px_#34D399]" />
                  {node.label}
                </button>
              </Html>
            </group>
          )
        })}
      </group>
    </Float>
  )
}

const Hero = ({ data, theme }) => {
  const heroRef = useRef(null)
  const parallaxRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Typing effect
  const [displayedRole, setDisplayedRole] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    const role = data.role
    let i = 0
    const interval = setInterval(() => {
      if (i <= role.length) {
        setDisplayedRole(role.slice(0, i))
        i++
      } else {
        clearInterval(interval)
        setTypingDone(true)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [data.role])

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from(".hero-line", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power4.out"
      })
        .from(".hero-social", {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .from(".hero-scroll", {
          y: -8,
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut"
        })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Mouse parallax
  const handleMouseMove = useCallback((e) => {
    if (!parallaxRef.current) return
    const rect = parallaxRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[80vh] flex flex-col justify-center"
      onMouseMove={handleMouseMove}
    >
      <div ref={parallaxRef} className="max-w-3xl relative">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="hero-line inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] font-semibold mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </motion.div>

        <h2
          className="hero-line text-sm font-bold text-primary-light mb-2 tracking-widest uppercase"
          style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}
        >
          Welcome to my portfolio
        </h2>
        <h1
          className="hero-line text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tighter text-white mb-4"
          style={{ transform: `translate(${mousePos.x * -6}px, ${mousePos.y * -6}px)` }}
        >
          {data.name}
        </h1>
        <div
          className="hero-line mb-5 min-h-[2em]"
          style={{ transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -4}px)` }}
        >
          <span className="text-xl md:text-2xl font-bold bg-linear-to-r from-primary-light to-secondary bg-clip-text text-transparent leading-tight">
            {displayedRole}
          </span>
          <span className={`inline-block w-0.5 h-6 ml-1 bg-primary-light align-middle ${typingDone ? 'animate-pulse' : ''}`} />
        </div>
        <p
          className="hero-line text-sm md:text-base text-gray-400 max-w-xl mb-8 leading-relaxed"
          style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
        >
          Turning complex ideas into intelligent systems from AI and data-driven products to immersive digital experiences.
        </p>

        <div className="hero-line flex flex-wrap items-center gap-3 md:gap-4">
          <a
            href="#projects"
            className="group relative bg-gradient-button text-white font-bold py-2.5 px-7 rounded-xl shadow-xl hover:shadow-primary-light/30 transition-all duration-300 text-sm"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles size={15} /> View My Work
            </span>
          </a>
          <div className="flex items-center gap-2.5">
            <SocialIcon href={data.contact.linkedin} icon={<Link size={16} />} label="LinkedIn" />
            <SocialIcon href={data.contact.github} icon={<CodeXml size={16} />} label="GitHub" />
            <SocialIcon href={data.contact.resume} icon={<FileText size={16} />} label="Resume" />
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 z-20">
        <span className="text-[10px] font-bold uppercase tracking-widest">Scroll Down</span>
        <ChevronDown size={16} />
      </div>

      {/* 3D Interactive Navigation Globe */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[50%] h-[120%] pointer-events-auto z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <NeuralGlobe theme={theme} />
        </Canvas>
      </div>
    </section>
  )
}

const SocialIcon = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="hero-social w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-primary-light/50 hover:bg-primary-light/10 hover:shadow-lg hover:shadow-primary-light/10 transition-all duration-300"
    aria-label={label}
  >
    {icon}
  </a>
)

export default Hero
