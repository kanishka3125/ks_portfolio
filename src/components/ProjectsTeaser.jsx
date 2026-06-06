import { motion } from 'framer-motion';
import { ArrowRight, Code2, BrainCircuit, Terminal, Sparkles } from 'lucide-react';

const ProjectsTeaser = () => {
  const stats = [
    {
      icon: BrainCircuit,
      title: "Core Specialization",
      value: "AI & Machine Learning",
      description: "Neural networks, emotion recognition, SVM classifiers.",
      color: "text-primary-light"
    },
    {
      icon: Code2,
      title: "System Architecture",
      value: "Full-Stack Web Systems",
      description: "Interactive single-page apps, REST/FastAPI backends.",
      color: "text-secondary"
    },
    {
      icon: Terminal,
      title: "Tech Stack & Tools",
      value: "Modern Toolkits",
      description: "Python, TensorFlow, OpenCV, React, Tailwind CSS.",
      color: "text-accent"
    }
  ];

  return (
    <section id="projects" className="section-reveal py-16 md:py-24 relative overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-light/5 via-bg-primary/50 to-bg-primary z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light/10 border border-primary-light/20 text-primary-light text-[11px] font-semibold mb-4"
          >
            <Sparkles size={12} className="animate-pulse" />
            Engineering Portfolio
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-4 tracking-tight">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Explore interactive modules detailing my technical projects, system architectures, and engineering learnings in artificial intelligence and web engineering.
          </p>
        </div>

        {/* Highlight Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary-light/25 hover:shadow-lg hover:shadow-primary-light/5 text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-4 group-hover:scale-110 group-hover:border-primary-light/30 transition-all duration-300">
                  <Icon size={20} className={stat.color} />
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.title}</span>
                <h3 className="text-lg font-heading font-bold text-white mt-1 mb-2">{stat.value}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Enter Projects Hub Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={() => {
              window.location.hash = '#projects-hub';
            }}
            className="group relative inline-flex items-center gap-2.5 bg-gradient-button text-white font-bold py-3.5 px-8 rounded-xl shadow-xl hover:shadow-primary-light/35 transition-all duration-300 text-sm cursor-pointer"
          >
            Enter Project Section
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsTeaser;
