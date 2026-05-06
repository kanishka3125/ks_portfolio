import { motion } from 'framer-motion';

const FilterBar = ({ activeFilters, onFilterToggle }) => {
  const filterCategories = {
    domain: ["All Domains", "Web", "AI/ML", "Systems"],
    type: ["All Types", "Personal", "Hackathon", "Internship"],
    difficulty: ["All Levels", "Beginner", "Intermediate", "Advanced"]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-[#0A0F1E]/80 backdrop-blur-md border border-[#1E293B] rounded-xl p-4 sm:p-6 mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      <div className="flex flex-col gap-4">
        {Object.entries(filterCategories).map(([category, options]) => (
          <div key={category} className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs text-[#64748B] font-mono uppercase tracking-widest sm:w-28 flex-shrink-0">
              {category}
            </span>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const isActive = activeFilters[category] === option;
                return (
                  <button
                    key={option}
                    onClick={() => onFilterToggle(category, option)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-[#3B82F6]' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/10'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FilterBar;
