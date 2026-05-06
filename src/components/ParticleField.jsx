import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
// Smooth, professional Digital Data Terrain (AI/ML Theme)
function DigitalTerrain({ scrollProgress }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * 0.4
    
    // Animate vertices for a smooth, undulating fluid grid effect
    const position = meshRef.current.geometry.attributes.position
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i)
      const y = position.getY(i)
      
      // Complex smooth wave math to simulate a data landscape
      const z = Math.sin(x * 0.15 + time) * 2.0 + 
                Math.cos(y * 0.15 + time * 0.8) * 2.0
                
      position.setZ(i, z)
    }
    position.needsUpdate = true
    
    // Parallax effect based on scroll
    meshRef.current.position.y = -10 - scrollProgress * 10
    // Very subtle rotation based on mouse or time could be added, but keeping it fixed is smoother
  })

  return (
    <group>
      {/* The undulating wireframe terrain */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -10, -20]}>
        {/* Large, dense plane geometry */}
        <planeGeometry args={[120, 80, 60, 40]} />
        <meshBasicMaterial 
          color="#3B82F6" 
          wireframe={true} 
          transparent 
          opacity={0.12} 
        />
      </mesh>
      
      {/* Ambient background tech glow */}
      <mesh position={[0, 0, -40]}>
        <planeGeometry args={[200, 100]} />
        <meshBasicMaterial 
          color="#1E1B4B" 
          transparent 
          opacity={0.8} 
        />
      </mesh>
    </group>
  )
}



export default function ParticleField() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const progress = Math.min(window.scrollY / maxScroll, 1)
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isMobile) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000" style={{ opacity: Math.max(0.3, 1 - scrollProgress * 0.5) }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#7C3AED" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#EC4899" />
        
        {/* Smooth flowing digital terrain instead of scattered particles */}
        <DigitalTerrain scrollProgress={scrollProgress} />
        

      </Canvas>
    </div>
  )
}
