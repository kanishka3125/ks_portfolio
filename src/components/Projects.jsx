import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterBar from './FilterBar';
import ProjectModule from './ProjectModule';
import ProjectWindow from './ProjectWindow';

const Projects = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    domain: "All Domains",
    type: "All Types",
    difficulty: "All Levels"
  });

  const handleFilterToggle = (category, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const filteredProjects = useMemo(() => {
    return data.projects.filter(project => {
      const matchDomain = activeFilters.domain === "All Domains" || project.domain === activeFilters.domain;
      const matchType = activeFilters.type === "All Types" || project.type === activeFilters.type;
      const matchDifficulty = activeFilters.difficulty === "All Levels" || project.difficulty === activeFilters.difficulty;
      return matchDomain && matchType && matchDifficulty;
    });
  }, [data.projects, activeFilters]);

  // Lock body scroll when window is open
  if (typeof window !== 'undefined') {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  return (
    <section id="projects" className="section-reveal py-16 md:py-24 relative min-h-screen">
      {/* Subtle Lab Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1E293B]/20 via-[#0A0A1E]/80 to-[#0A0A1E] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwdi00MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-4 tracking-tight">
              Project <span className="text-[#3B82F6]">Lab</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-sm md:text-base">
              Explore interactive modules detailing my technical projects, system architectures, and engineering learnings.
            </p>
          </div>
        </div>

        <FilterBar activeFilters={activeFilters} onFilterToggle={handleFilterToggle} />

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectModule 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-20 text-gray-500 font-mono text-sm border border-dashed border-gray-800 rounded-xl"
          >
            {">"} No active modules match the current filter parameters.
          </motion.div>
        )}
      </div>

      {selectedProject && (
        <ProjectWindow 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;
