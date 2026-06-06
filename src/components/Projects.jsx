import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, RotateCcw, X, Save, Sparkles, FolderGit2 } from 'lucide-react';
import FilterBar from './FilterBar';
import ProjectModule from './ProjectModule';
import ProjectWindow from './ProjectWindow';

const ProjectsHub = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    domain: "All Domains",
    type: "All Types",
    difficulty: "All Levels"
  });

  // State to hold projects list, loaded from localStorage or default data
  const [projectsList, setProjectsList] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form input state
  const [formData, setFormData] = useState({
    title: "",
    domain: "Web",
    type: "Personal",
    difficulty: "Advanced",
    status: "Completed",
    shortDescription: "",
    description: "",
    image: "",
    frontendTech: "",
    backendTech: "",
    aiTech: "",
    toolsTech: "",
    features: "",
    architecture: "",
    challenges: "",
    takeaways: "",
    future: "",
    github: "",
    demoLink: ""
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ks_portfolio_projects');
    if (saved) {
      try {
        setProjectsList(JSON.parse(saved));
        return;
      } catch (e) {
        console.error("Failed to parse saved projects", e);
      }
    }
    setProjectsList(data.projects);
  }, [data.projects]);

  const handleFilterToggle = (category, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const filteredProjects = useMemo(() => {
    return projectsList.filter(project => {
      const matchDomain = activeFilters.domain === "All Domains" || project.domain === activeFilters.domain;
      const matchType = activeFilters.type === "All Types" || project.type === activeFilters.type;
      const matchDifficulty = activeFilters.difficulty === "All Levels" || project.difficulty === activeFilters.difficulty;
      return matchDomain && matchType && matchDifficulty;
    });
  }, [projectsList, activeFilters]);

  // Lock body scroll when windows/modals are open
  useEffect(() => {
    if (selectedProject || showAddForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, showAddForm]);

  // Form handle change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit form to add project
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription || !formData.description) {
      alert("Please fill in Title, Short Description, and Full Description.");
      return;
    }

    const newProject = {
      id: `project-${Date.now()}`,
      title: formData.title,
      domain: formData.domain,
      type: formData.type,
      difficulty: formData.difficulty,
      status: formData.status,
      shortDescription: formData.shortDescription,
      description: formData.description,
      image: formData.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", // high-quality placeholder image
      tech: {
        frontend: formData.frontendTech ? formData.frontendTech.split(',').map(s => s.trim()).filter(Boolean) : [],
        backend: formData.backendTech ? formData.backendTech.split(',').map(s => s.trim()).filter(Boolean) : [],
        ai: formData.aiTech ? formData.aiTech.split(',').map(s => s.trim()).filter(Boolean) : [],
        tools: formData.toolsTech ? formData.toolsTech.split(',').map(s => s.trim()).filter(Boolean) : []
      },
      features: formData.features ? formData.features.split('\n').map(s => s.trim()).filter(Boolean) : [],
      architecture: formData.architecture || "",
      learnings: {
        challenges: formData.challenges || "Managing project requirements and technical constraints.",
        takeaways: formData.takeaways || "Learned how to design scalable modular application architectures.",
        future: formData.future || "Optimize rendering performance and write comprehensive unit tests."
      },
      github: formData.github || "https://github.com",
      demoLink: formData.demoLink || ""
    };

    const updatedProjects = [newProject, ...projectsList];
    setProjectsList(updatedProjects);
    localStorage.setItem('ks_portfolio_projects', JSON.stringify(updatedProjects));
    
    // Reset form and close
    setFormData({
      title: "",
      domain: "Web",
      type: "Personal",
      difficulty: "Advanced",
      status: "Completed",
      shortDescription: "",
      description: "",
      image: "",
      frontendTech: "",
      backendTech: "",
      aiTech: "",
      toolsTech: "",
      features: "",
      architecture: "",
      challenges: "",
      takeaways: "",
      future: "",
      github: "",
      demoLink: ""
    });
    setShowAddForm(false);
  };

  // Reset projects to default data list
  const handleResetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset the projects list to defaults? All custom added projects will be removed.")) {
      localStorage.removeItem('ks_portfolio_projects');
      setProjectsList(data.projects);
    }
  };

  return (
    <section id="projects" className="py-8 md:py-12 relative min-h-screen">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-light/5 via-bg-primary/80 to-bg-primary z-0 pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        
        {/* Header Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-white/5 pb-6">
          <button 
            onClick={() => { window.location.hash = '#'; }}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-primary-light/30 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft size={14} />
            Back to Home
          </button>

          <div className="flex gap-2.5">
            <button
              onClick={handleResetToDefaults}
              className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-400 bg-white/5 border border-white/10 hover:border-red-500/20 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md"
              title="Reset projects list to defaults"
            >
              <RotateCcw size={14} />
              Reset List
            </button>

            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 text-xs font-bold bg-gradient-button text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-primary-light/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Plus size={15} />
              Add Project
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-3 tracking-tight">
            Projects <span className="text-gradient">Hub</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Welcome to my technical projects archives. Explore the interactive modules below detailing system architectures, tech stacks, and source codes.
          </p>
        </div>

        {/* Filters */}
        <FilterBar activeFilters={activeFilters} onFilterToggle={handleFilterToggle} />

        {/* Projects Grid */}
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
            className="text-center py-24 text-text-muted font-mono text-sm border border-dashed border-card-border rounded-2xl bg-bg-primary/40 backdrop-blur-sm"
          >
            {">"} No projects match the active filter parameters.
          </motion.div>
        )}
      </div>

      {/* Details Window / Modal */}
      {selectedProject && (
        <ProjectWindow 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
          >
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setShowAddForm(false)}></div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-2xl bg-card-bg border border-card-border rounded-2xl shadow-2xl shadow-black/30 z-10 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="h-14 bg-bg-primary border-b border-card-border flex items-center justify-between px-6 select-none shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-primary-light animate-pulse" />
                  <span className="text-sm font-heading font-bold text-text-primary">Add New Project</span>
                </div>
                <button 
                  onClick={() => setShowAddForm(false)} 
                  className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-primary-light/20 scrollbar-track-transparent">
                
                {/* section: Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">1. Basic Information</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Project Title *</label>
                    <input 
                      type="text" 
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Distributed Neural System"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light focus:ring-1 focus:ring-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">Domain</label>
                      <select 
                        name="domain"
                        value={formData.domain}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-3 py-2.5 outline-none transition-all"
                      >
                        <option value="Web">Web</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="App">App</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">Type</label>
                      <select 
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-3 py-2.5 outline-none transition-all"
                      >
                        <option value="Personal">Personal</option>
                        <option value="Internship">Internship</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="Academic">Academic</option>
                        <option value="Corporate">Corporate</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">Difficulty Level</label>
                      <select 
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-3 py-2.5 outline-none transition-all"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">Status</label>
                      <select 
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-3 py-2.5 outline-none transition-all"
                      >
                        <option value="Completed">Completed</option>
                        <option value="Ongoing">Ongoing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Short Description * (Displayed on Card)</label>
                    <input 
                      type="text" 
                      name="shortDescription"
                      required
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      placeholder="Brief one-liner summarizing the project."
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light focus:ring-1 focus:ring-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Full Description * (For Detailed Window)</label>
                    <textarea 
                      name="description"
                      required
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Explain the background, core function, and impact of the project."
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light focus:ring-1 focus:ring-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Cover Image URL</label>
                    <input 
                      type="text" 
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Leave empty for premium design placeholder image"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light focus:ring-1 focus:ring-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* section: Tech Stack */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">2. Technologies (Comma-Separated)</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">Frontend</label>
                      <input 
                        type="text" 
                        name="frontendTech"
                        value={formData.frontendTech}
                        onChange={handleInputChange}
                        placeholder="React, Framer Motion, GSAP"
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">Backend</label>
                      <input 
                        type="text" 
                        name="backendTech"
                        value={formData.backendTech}
                        onChange={handleInputChange}
                        placeholder="Node.js, Express, FastAPI"
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">AI / ML</label>
                      <input 
                        type="text" 
                        name="aiTech"
                        value={formData.aiTech}
                        onChange={handleInputChange}
                        placeholder="TensorFlow, OpenCV, PyTorch"
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">Tools / Other</label>
                      <input 
                        type="text" 
                        name="toolsTech"
                        value={formData.toolsTech}
                        onChange={handleInputChange}
                        placeholder="Git, Docker, Kubernetes"
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* section: Key Features & Architecture */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">3. Features & Architecture</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Key Features (One feature per line)</label>
                    <textarea 
                      name="features"
                      rows={3}
                      value={formData.features}
                      onChange={handleInputChange}
                      placeholder="Real-time face tracking&#10;Temporal voting classifier&#10;Responsive glassmorphism layout"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none resize-none font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">System Architecture (Markdown Supported)</label>
                    <textarea 
                      name="architecture"
                      rows={2.5}
                      value={formData.architecture}
                      onChange={handleInputChange}
                      placeholder="Explain system dataflow or service communication patterns."
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* section: Challenges & Learnings */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">4. Learnings & Challenges</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Challenges Faced</label>
                    <textarea 
                      name="challenges"
                      rows={2}
                      value={formData.challenges}
                      onChange={handleInputChange}
                      placeholder="e.g. Optimizing canvas renderings on legacy mobile hardware."
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Key Takeaways</label>
                    <textarea 
                      name="takeaways"
                      rows={2}
                      value={formData.takeaways}
                      onChange={handleInputChange}
                      placeholder="e.g. Mastered math computations behind 3D bezier transformations."
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Future Improvements</label>
                    <textarea 
                      name="future"
                      rows={2}
                      value={formData.future}
                      onChange={handleInputChange}
                      placeholder="e.g. Add distributed cache layers using Redis."
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* section: Links */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">5. Repository & Deployment Links</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">GitHub URL</label>
                      <input 
                        type="text" 
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        placeholder="https://github.com/..."
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">Live Demo URL</label>
                      <input 
                        type="text" 
                        name="demoLink"
                        value={formData.demoLink}
                        onChange={handleInputChange}
                        placeholder="https://..."
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-primary-light text-text-primary text-sm rounded-xl px-4 py-2.5 outline-none"
                      />
                    </div>
                  </div>
                </div>

              </form>

              {/* Modal Footer */}
              <div className="h-16 bg-bg-primary border-t border-card-border flex items-center justify-end px-6 gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)} 
                  className="px-4 py-2 rounded-xl text-xs font-bold text-text-muted hover:text-text-primary bg-white/5 border border-white/10 hover:border-card-border transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-button text-white shadow-md hover:shadow-primary-light/20 transition-all cursor-pointer"
                >
                  <Save size={14} />
                  Save Project
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsHub;

