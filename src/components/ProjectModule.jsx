import { motion } from 'framer-motion';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';

const ProjectModule = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative cursor-pointer h-full"
      onClick={onClick}
    >
      {/* Holographic Glowing Border */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/30 via-transparent to-[#8B5CF6]/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 z-0"></div>
      
      <div className="relative h-full flex flex-col bg-[#0A0F1E] border border-[#1E293B] group-hover:border-[#3B82F6]/50 rounded-2xl overflow-hidden z-10 transition-colors duration-300">
        
        {/* Module Header / Status */}
        <div className="absolute top-3 left-3 z-20 flex gap-2">
          <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded shadow-md backdrop-blur-md border ${
            project.status === 'Completed' 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
              : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
          }`}>
            {project.status || 'Ongoing'}
          </span>
          {project.difficulty && (
            <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded shadow-md backdrop-blur-md border bg-blue-500/20 text-blue-400 border-blue-500/30">
              {project.difficulty}
            </span>
          )}
        </div>

        {/* Thumbnail Preview */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#050810] border-b border-[#1E293B]">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FolderGit2 size={48} className="text-[#1E293B]" />
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-heading font-black text-[#E2E8F0] group-hover:text-[#3B82F6] transition-colors mb-2 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-[#94A3B8] font-sans leading-relaxed mb-4 line-clamp-2 flex-grow">
            {project.shortDescription || project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-auto">
            {project.domain && (
              <span className="text-[10px] font-mono font-bold bg-[#1E293B] text-[#94A3B8] px-2 py-1 rounded">
                {project.domain}
              </span>
            )}
            {project.type && (
              <span className="text-[10px] font-mono font-bold bg-[#1E293B] text-[#94A3B8] px-2 py-1 rounded">
                {project.type}
              </span>
            )}
            
            <div className="ml-auto flex items-center justify-center w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#3B82F6] transition-colors">
              <ArrowUpRight size={14} className="text-gray-400 group-hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectModule;
