import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Link, CodeXml } from 'lucide-react'

const ContactBar = ({ data, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6 pointer-events-none flex justify-center"
        >
          <div className="bg-header-bg/90 backdrop-blur-xl border border-glass-border shadow-2xl rounded-2xl px-6 py-3 flex items-center gap-6 md:gap-10 pointer-events-auto">
            <a 
              href={`mailto:${data.contact.email}`}
              className="flex items-center gap-2 text-text-muted hover:text-primary-light transition-colors group"
            >
              <div className="bg-white/5 p-2 rounded-full group-hover:bg-primary-light/20 transition-colors">
                <Mail size={18} />
              </div>
              <span className="text-sm font-medium hidden md:block">Email</span>
            </a>
            
            <a 
              href={`tel:${data.contact.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-text-muted hover:text-secondary transition-colors group"
            >
              <div className="bg-white/5 p-2 rounded-full group-hover:bg-secondary/20 transition-colors">
                <Phone size={18} />
              </div>
              <span className="text-sm font-medium hidden md:block">Phone</span>
            </a>

            <div className="w-px h-8 bg-glass-border hidden sm:block"></div>

            <a 
              href={data.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-[#0A66C2] transition-colors group"
            >
              <div className="bg-white/5 p-2 rounded-full group-hover:bg-[#0A66C2]/20 transition-colors">
                <Link size={18} />
              </div>
              <span className="text-sm font-medium hidden md:block">LinkedIn</span>
            </a>

            <a 
              href={data.contact.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-white transition-colors group"
            >
              <div className="bg-white/5 p-2 rounded-full group-hover:bg-white/20 transition-colors">
                <CodeXml size={18} />
              </div>
              <span className="text-sm font-medium hidden md:block">GitHub</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactBar
