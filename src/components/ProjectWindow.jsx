import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, Database, BrainCircuit, Play, Info, Layout } from 'lucide-react';

const ProjectWindow = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  if (!project) return null;

  const tabs = [
    { id: 'Overview', icon: Info },
    { id: 'Tech Stack', icon: Code2 },
    { id: 'Architecture', icon: Layout },
    { id: 'Demo', icon: Play },
    { id: 'Learnings', icon: BrainCircuit }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-card-border bg-bg-primary">
               {project.image ? (
                 <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-text-muted">No Image Available</div>
               )}
            </div>
            <div>
              <h4 className="text-lg font-bold text-text-primary mb-2">About the Project</h4>
              <p className="text-sm text-text-muted leading-relaxed">{project.description}</p>
            </div>
            {project.features && (
              <div>
                <h4 className="text-lg font-bold text-text-primary mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-light mt-1.5 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        );
      case 'Tech Stack':
        return (
          <motion.div key="tech" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
            {project.tech.frontend?.length > 0 && (
              <div>
                <h4 className="text-sm font-mono text-text-muted mb-3 uppercase tracking-widest flex items-center gap-2">
                  <Layout size={14}/> Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.frontend.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-bg-primary text-text-primary text-xs rounded-md border border-card-border">{t}</span>
                  ))}
                </div>
              </div>
            )}
            {project.tech.backend?.length > 0 && (
              <div>
                <h4 className="text-sm font-mono text-text-muted mb-3 uppercase tracking-widest flex items-center gap-2">
                  <Database size={14}/> Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.backend.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-bg-primary text-text-primary text-xs rounded-md border border-card-border">{t}</span>
                  ))}
                </div>
              </div>
            )}
            {project.tech.ai?.length > 0 && (
              <div>
                <h4 className="text-sm font-mono text-text-muted mb-3 uppercase tracking-widest flex items-center gap-2">
                  <BrainCircuit size={14}/> AI / ML
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.ai.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-primary-light/20 text-primary-light text-xs rounded-md border border-primary-light/35">{t}</span>
                  ))}
                </div>
              </div>
            )}
            {project.tech.tools?.length > 0 && (
              <div>
                <h4 className="text-sm font-mono text-text-muted mb-3 uppercase tracking-widest flex items-center gap-2">
                  <Code2 size={14}/> Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.tools.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-bg-primary text-text-primary text-xs rounded-md border border-card-border">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );
      case 'Architecture':
        return (
          <motion.div key="arch" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            <h4 className="text-lg font-bold text-text-primary mb-2">System Architecture</h4>
            <p className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap">
              {project.architecture || "Architecture details not available for this project."}
            </p>
          </motion.div>
        );
      case 'Demo':
        return (
          <motion.div key="demo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="h-full flex flex-col min-h-[400px]">
            {project.demoLink ? (
              <div className="flex-grow rounded-lg overflow-hidden border border-card-border bg-bg-primary relative min-h-[300px]">
                <iframe 
                  src={project.demoLink} 
                  title={`${project.title} Demo`}
                  className="w-full h-full absolute inset-0"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center rounded-lg border border-card-border bg-bg-primary p-6 text-center min-h-[300px]">
                <Play size={48} className="text-primary-light/50 mb-4" />
                <h4 className="text-lg font-bold text-text-primary mb-2">Live Demo Not Available</h4>
                <p className="text-sm text-text-muted">This project currently does not have a live interactive demo deployed.</p>
              </div>
            )}
            
            <div className="mt-4 flex justify-between items-center bg-bg-primary/50 p-4 rounded-lg border border-card-border shrink-0">
              <span className="text-xs text-text-muted">Want to see the source code?</span>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-[#1C1822] bg-primary-light hover:bg-secondary px-4 py-2 rounded transition-colors">
                View Repository <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        );
      case 'Learnings':
        return (
          <motion.div key="learnings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            {project.learnings ? (
              <>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-5">
                  <h4 className="text-sm font-bold text-red-400 mb-2 uppercase tracking-wider">Challenges Faced</h4>
                  <p className="text-sm text-text-primary leading-relaxed">{project.learnings.challenges}</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-5">
                  <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wider">Key Takeaways</h4>
                  <p className="text-sm text-text-primary leading-relaxed">{project.learnings.takeaways}</p>
                </div>
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-5">
                  <h4 className="text-sm font-bold text-accent mb-2 uppercase tracking-wider">Future Improvements</h4>
                  <p className="text-sm text-text-primary leading-relaxed">{project.learnings.future}</p>
                </div>
              </>
            ) : (
              <p className="text-text-muted">No learning logs available.</p>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-sm"
      >
        {/* Modal Backdrop to close */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full h-full md:max-w-5xl md:h-[85vh] bg-card-bg md:border md:border-card-border md:rounded-xl overflow-hidden flex flex-col shadow-2xl shadow-black/35 z-10"
        >
          {/* OS Header */}
          <div className="h-12 bg-bg-primary border-b border-card-border flex items-center justify-between px-4 select-none shrink-0">
            <div className="flex items-center gap-3">
               <div className="flex gap-1.5">
                 <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></button>
                 <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
               </div>
               <span className="text-xs font-mono text-text-muted border-l border-card-border pl-3 hidden sm:block">
                 project_lab.exe // {project.id}
               </span>
            </div>
            <div className="flex items-center gap-3">
               <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded border ${
                 project.status === 'Completed' 
                   ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                   : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
               }`}>
                 {project.status || 'Ongoing'}
               </span>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-48 lg:w-56 bg-bg-primary/50 border-b md:border-b-0 md:border-r border-card-border p-2 flex md:flex-col overflow-x-auto md:overflow-y-auto shrink-0 scrollbar-hide">
               {tabs.map((tab) => {
                 const isActive = activeTab === tab.id;
                 const Icon = tab.icon;
                 return (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`flex items-center gap-3 px-3 py-3 md:py-4 md:px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap md:whitespace-normal mb-0 md:mb-1 ${
                       isActive 
                         ? 'bg-primary-light/10 text-primary-light' 
                         : 'text-text-muted hover:bg-white/5 hover:text-text-primary'
                     }`}
                   >
                     <Icon size={16} />
                     {tab.id}
                   </button>
                 );
               })}
            </div>

            {/* Main Content Area */}
            <div className="flex-grow p-4 md:p-8 overflow-y-auto bg-card-bg scrollbar-thin scrollbar-thumb-primary-light/20 scrollbar-track-transparent">
               <div className="max-w-3xl mx-auto h-full">
                 <h2 className="text-2xl md:text-3xl font-heading font-black text-text-primary mb-6">
                   {project.title}
                 </h2>
                 <AnimatePresence mode="wait">
                   {renderTabContent()}
                 </AnimatePresence>
               </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectWindow;
