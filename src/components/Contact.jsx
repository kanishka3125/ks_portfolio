import { motion } from 'framer-motion'
import { Mail, Phone, Link, CodeXml, FileText, ExternalLink, Send } from 'lucide-react'
import SectionHeading from './SectionHeading'

export default function Contact({ data, theme }) {
  const { contact } = data

  const isLight = theme === 'light';
  const links = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}`, color: isLight ? '#DE8755' : '#FED2B4' },
    { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}`, color: isLight ? '#D96D68' : '#FFAAA6' },
    { icon: Link, label: 'LinkedIn', value: 'Connect on LinkedIn', href: contact.linkedin, color: isLight ? '#96689F' : '#D3B7D8' },
    { icon: CodeXml, label: 'GitHub', value: 'github.com/kanishka3125', href: contact.github, color: isLight ? '#96689F' : '#B58E9F' },
    { icon: FileText, label: 'Resume', value: 'Download Resume', href: contact.resume, color: isLight ? '#D96D68' : '#FFAAA6' },
  ]

  return (
    <section id="contact" className="section-reveal py-8 md:py-12">
      <SectionHeading>Get In Touch</SectionHeading>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gray-400 mb-8 max-w-lg text-sm leading-relaxed -mt-4"
      >
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map(({ icon: Icon, label, value, href, color }, index) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -3 }}
            className="group glass-card glow-border flex items-center gap-3 p-4 rounded-xl"
          >
            <div
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0 font-semibold">{label}</p>
              <p className="text-xs text-gray-200 truncate group-hover:text-white transition-colors">{value}</p>
            </div>
            <ExternalLink size={12} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-10 text-center"
      >
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 bg-gradient-button text-white font-bold py-3 px-8 rounded-xl shadow-xl hover:shadow-primary-light/30 transition-all duration-300 text-sm"
        >
          <Send size={16} /> Let's Work Together
        </a>
      </motion.div>
    </section>
  )
}
