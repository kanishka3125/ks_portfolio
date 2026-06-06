import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, X, ZoomIn } from 'lucide-react'
import SectionHeading from './SectionHeading'

export default function TechJourney({ data }) {
  const [activeImage, setActiveImage] = useState(null)
  const containerRef = useRef(null)

  // Timeline scroll progression line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })
  
  // Smooth out the scroll progression line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="journey" className="section-reveal py-8 md:py-12 relative">
      <SectionHeading>Tech Journey</SectionHeading>

      <div ref={containerRef} className="relative max-w-4xl mx-auto mt-10 pl-6 sm:pl-10">
        
        {/* Animated Vertical Timeline Progression Line */}
        <div className="absolute left-1.5 sm:left-[17px] top-0 bottom-0 w-1 bg-white/5 rounded-full" />
        <motion.div 
          className="absolute left-1.5 sm:left-[17px] top-0 w-1 bg-gradient-to-b from-primary-light via-secondary to-accent rounded-full origin-top"
          style={{ 
            height: "100%",
            scaleY: scaleY 
          }}
        />

        <div className="space-y-12">
          {data.techJourney.map((event, index) => {
            return (
              <div key={event.id} className="relative group">
                
                {/* Timeline node dot indicator */}
                <div className="absolute -left-[30px] sm:-left-[39px] top-6 z-20 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-4 h-4 rounded-full bg-bg-primary border-3 border-secondary group-hover:border-primary-light shadow-[0_0_10px_rgba(255,170,166,0.4)] group-hover:shadow-[0_0_15px_rgba(254,210,180,0.6)] transition-all duration-300"
                  />
                </div>

                {/* Timeline Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card flex flex-col md:flex-row rounded-2xl overflow-hidden border border-card-border shadow-xl hover:shadow-primary-light/5 hover:border-primary-light/20 transition-all duration-300"
                >
                  
                  {/* Left: Interactive 16:9 Image (occupies 55% of the width on desktop) */}
                  <div className="relative aspect-video md:w-[55%] overflow-hidden bg-black/40 border-b md:border-b-0 md:border-r border-card-border group-hover:border-primary-light/20 flex-shrink-0 cursor-zoom-in">
                    
                    {/* Hover Zoom on Banner Image */}
                    <img 
                      src={event.banner} 
                      alt={event.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      onClick={() => setActiveImage(event.banner)}
                    />

                    {/* Lightbox Trigger indicator overlay */}
                    <div 
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 pointer-events-none"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1C1822]/70 flex items-center justify-center border border-white/10 text-white backdrop-blur-sm">
                        <ZoomIn size={16} />
                      </div>
                    </div>

                    {/* Brand Logo Overlay */}
                    <div className="absolute bottom-3 left-3 bg-[#1C1822]/85 backdrop-blur-md border border-white/10 p-1.5 rounded-xl flex items-center justify-center w-10 h-10 shadow-lg shadow-black/30 group-hover:border-secondary transition-colors z-10">
                      <img src={event.logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>

                  </div>

                  {/* Right: Content details (occupies 45% of width) */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-primary-light uppercase bg-primary-light/10 border border-primary-light/20 px-2.5 py-1 rounded-md">
                        {event.role}
                      </span>
                      
                      <h3 className="text-base sm:text-lg font-heading font-black text-text-primary mt-3 leading-tight group-hover:text-primary-light transition-colors">
                        {event.name}
                      </h3>
                      
                      {/* Meta dates/location info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-muted mt-2 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} className="text-secondary" /> {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-accent" /> {event.location}
                        </span>
                      </div>

                      <p className="text-xs text-text-muted mt-3.5 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-card-border/50 pt-4">
                      <a
                        href={event.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold text-text-primary bg-white/5 border border-white/10 hover:border-primary-light hover:bg-primary-light hover:text-[#1C1822] px-3.5 py-2 rounded-xl transition-all shadow-sm"
                      >
                        View Credential <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Full-Screen Image Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
            onClick={() => setActiveImage(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
              onClick={() => setActiveImage(null)}
            >
              <X size={20} />
            </button>
            
            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/5"
            >
              <img 
                src={activeImage} 
                alt="Enlarged View" 
                className="w-full h-full object-contain pointer-events-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
