import { motion } from 'framer-motion'

export default function SectionHeading({ children, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-10 ${align === 'center' ? 'text-center' : ''}`}
    >
      <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight inline-block">
        <span className="text-gradient">{children}</span>
      </h2>
      <div className="mt-2 flex gap-1 items-center" style={align === 'center' ? { justifyContent: 'center' } : {}}>
        <div className="w-8 h-0.5 rounded-full bg-primary-light" />
        <div className="w-2 h-0.5 rounded-full bg-secondary" />
        <div className="w-1 h-0.5 rounded-full bg-accent" />
      </div>
    </motion.div>
  )
}
