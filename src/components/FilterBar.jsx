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
      className="w-full bg-glass-bg border border-glass-border rounded-xl p-4 sm:p-6 mb-10 shadow-lg shadow-black/10"
    >
      <div className="flex flex-col gap-4">
        {Object.entries(filterCategories).map(([category, options]) => (
          <div key={category} className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs text-text-muted font-mono uppercase tracking-widest sm:w-28 flex-shrink-0">
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
                        ? 'bg-primary-light text-[#1C1822] border border-primary-light shadow-md shadow-primary-light/20' 
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
