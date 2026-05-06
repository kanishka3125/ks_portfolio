import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const outer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, .tilt-card')
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Re-attach hover listeners when DOM changes
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    // Animation loop
    let raf
    const animate = () => {
      // Smooth follow for outer ring
      outer.current.x += (mouse.current.x - outer.current.x) * 0.12
      outer.current.y += (mouse.current.y - outer.current.y) * 0.12

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outer.current.x}px, ${outer.current.y}px) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%) scale(${isHovering ? 0.5 : 1})`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [isHovering, isVisible])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.5)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s, width 0.3s, height 0.3s',
          willChange: 'transform',
        }}
      />
      <div
        ref={innerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
