import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'

const suggestions = [
  '💡 Tell me about your skills',
  '🚀 Show me your projects',
  '📧 How to contact you?',
  '🎓 Your education?',
]

function generateReply(input, data) {
  const q = input.toLowerCase()
  if (q.includes('name') || q.includes('who')) return `I'm ${data.name}, ${data.role}.`
  if (q.includes('skill') || q.includes('language') || q.includes('tech'))
    return `My skills include ${data.skills.languages.join(', ')} and tools like ${data.skills.tools.join(', ')}.`
  if (q.includes('project'))
    return data.projects.map(p => `🔹 **${p.title}**: ${p.description}`).join('\n\n')
  if (q.includes('experience') || q.includes('work'))
    return data.experience.map(e => `🔹 ${e.role} at ${e.company} (${e.year})`).join('\n')
  if (q.includes('intern'))
    return data.internships.map(i => `🔹 ${i.role} at ${i.company}`).join('\n')
  if (q.includes('certif'))
    return data.certifications.map(c => `🏆 ${c.title} — ${c.organization}`).join('\n')
  if (q.includes('contact') || q.includes('email') || q.includes('reach'))
    return `📧 Email: ${data.contact.email}\n🔗 LinkedIn: ${data.contact.linkedin}`
  if (q.includes('education') || q.includes('university') || q.includes('college') || q.includes('cgpa'))
    return `🎓 ${data.university}\n📊 CGPA: ${data.cgpa}`
  if (q.includes('resume') || q.includes('cv'))
    return `📄 Resume: ${data.contact.resume}`
  if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
    return `Hey there! 👋 I'm Kanishka's AI assistant. Ask me about skills, projects, experience, or anything else!`
  return `I can help you learn about Kanishka's skills, projects, experience, internships, certifications, or contact info. What interests you?`
}

export default function ChatBot({ data }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: `Hi! 👋 I'm Kanishka's portfolio assistant. Ask me anything about skills, projects, or experience!` }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const send = (text) => {
    const msg = text || input.trim()
    if (!msg) return
    const userMsg = { role: 'user', text: msg }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botMsg = { role: 'bot', text: generateReply(msg, data) }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 600 + Math.random() * 400)
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[150] w-14 h-14 rounded-full bg-gradient-to-br from-primary-light to-secondary shadow-lg shadow-primary-light/30 flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
        aria-label="Toggle chatbot"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[150] w-80 sm:w-96 max-h-[70vh] flex flex-col rounded-2xl border border-white/10 bg-[#0f0f2e]/98 backdrop-blur-xl shadow-2xl shadow-primary-light/10 overflow-hidden"
            data-lenis-prevent
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-primary-light/10 to-secondary/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-light to-secondary flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Portfolio Assistant</h3>
                <p className="text-[10px] text-green-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[50vh]">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-primary-light to-primary-light/80 text-white rounded-br-md'
                        : 'bg-white/[0.06] text-gray-200 rounded-bl-md border border-white/5'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.06] px-4 py-3 rounded-2xl rounded-bl-md border border-white/5 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-400"
                        style={{
                          animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s.replace(/^[^\s]+ /, ''))}
                    className="text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); send() }}
              className="flex items-center gap-2 p-3 border-t border-white/5 bg-white/[0.02]"
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-primary-light/50 transition-colors"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-primary-light/20 hover:bg-primary-light/30 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Send size={16} className="text-primary-light" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
