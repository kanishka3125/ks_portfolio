import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronRight, ChevronLeft, ShieldCheck, Award, GraduationCap } from 'lucide-react';
import SectionHeading from './SectionHeading';

const Certifications = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0); // 0 = closed, 1 = first spread, etc.
  const certifications = data.certifications || [];
  
  // Extract data for side panels
  const allCertSkills = [...new Set(certifications.flatMap(cert => cert.skills))];
  
  // Extract unique organizations with their logos
  const uniqueOrgs = [];
  const orgMap = new Set();
  certifications.forEach(cert => {
    if (!orgMap.has(cert.organization)) {
      orgMap.add(cert.organization);
      uniqueOrgs.push({ name: cert.organization, logo: cert.orgLogo });
    }
  });

  // Generate Leaves
  const leaves = [];

  leaves.push({
    front: { type: 'cover', content: 'Professional' },
    back: { type: 'inside-cover', content: '' }
  });

  let pageCounter = 1;
  for (let i = 0; i < certifications.length; i += 2) {
    leaves.push({
      front: { type: 'cert', content: certifications[i], pageNum: pageCounter++ },
      back: certifications[i + 1] ? { type: 'cert', content: certifications[i + 1], pageNum: pageCounter++ } : { type: 'blank', content: '' }
    });
  }

  leaves.push({
    front: { type: 'inside-cover', content: '' },
    back: { type: 'cover', content: 'The End' }
  });

  const totalLeaves = leaves.length;

  const nextPage = () => {
    if (currentPage < totalLeaves) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Render individual page content
  const renderPageContent = (pageData, side) => {
    if (pageData.type === 'cover') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#201A24] border-y border-r border-[#14101A] rounded-r-[12px] shadow-[inset_-8px_0_25px_rgba(0,0,0,0.8),10px_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          
          {/* Authentic Leather Texture - Subtle */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/90 pointer-events-none"></div>
          
          {/* Deep Book Spine (Left Edge) */}
          <div className="absolute left-0 top-0 w-8 sm:w-12 h-full bg-[#14101A] border-r border-black/90 shadow-[4px_0_15px_rgba(0,0,0,0.9)] z-10 flex flex-col justify-between py-16 sm:py-20">
            {/* Minimal Spine binding ribs */}
            <div className="w-full h-1 bg-black/90 border-y border-white/5 shadow-[0_2px_4px_rgba(0,0,0,1)]"></div>
            <div className="w-full h-1 bg-black/90 border-y border-white/5 shadow-[0_2px_4px_rgba(0,0,0,1)]"></div>
            <div className="w-full h-1 bg-black/90 border-y border-white/5 shadow-[0_2px_4px_rgba(0,0,0,1)]"></div>
          </div>
          
          {/* Inner Debossed Panel */}
          <div className="absolute inset-6 sm:inset-8 left-12 sm:left-16 border border-black/60 rounded-sm shadow-[inset_0_0_15px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none"></div>

          <div className="z-20 text-center px-4 pl-10 sm:pl-14 relative flex flex-col items-center mt-12 sm:mt-16 h-full w-full">
             
             {/* Debossed Seal */}
             <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full border border-[#E2E8F0]/20 mb-8 sm:mb-12 flex items-center justify-center shadow-[inset_0_4px_8px_rgba(0,0,0,0.8),0_-1px_1px_rgba(255,255,255,0.05)] bg-black/20">
               <GraduationCap size={24} className="text-[#E2E8F0]/40 sm:w-8 sm:h-8" />
             </div>
             
             {/* Authentic Typography */}
             <h2 className="text-[11px] sm:text-lg md:text-xl lg:text-2xl font-serif font-black mb-2 uppercase tracking-[0.1em] sm:tracking-[0.15em] text-[#E2E8F0]/80 drop-shadow-[0_-1px_1px_rgba(0,0,0,0.9)] w-full px-2 text-center overflow-hidden">
               {pageData.content === 'The End' ? 'The End' : 'Certifications'}
             </h2>
             {pageData.content !== 'The End' && (
               <>
                 <div className="w-12 sm:w-16 h-[1px] bg-[#E2E8F0]/20 mb-3 shadow-[0_-1px_1px_rgba(0,0,0,0.9)]"></div>
                 <h2 className="text-[9px] sm:text-[10px] font-serif font-bold text-[#E2E8F0]/60 mb-8 sm:mb-12 tracking-[0.4em] uppercase drop-shadow-[0_-1px_1px_rgba(0,0,0,0.9)]">
                   Professional Portfolio
                 </h2>
                 
                 {/* User Identity Section */}
                 <div className="mt-auto mb-12 sm:mb-16 flex flex-col items-center w-full px-2">
                   <h3 className="text-[10px] sm:text-xs md:text-sm font-serif font-bold text-[#E2E8F0]/80 tracking-[0.2em] uppercase drop-shadow-[0_-1px_1px_rgba(0,0,0,0.9)] mb-1.5 text-center">
                     Kanishka Sharma
                   </h3>
                   <p className="text-[6px] sm:text-[7px] md:text-[8px] font-sans font-medium text-[#E2E8F0]/50 tracking-[0.1em] sm:tracking-widest uppercase text-center w-full px-2 drop-shadow-[0_-1px_1px_rgba(0,0,0,0.9)] leading-tight">
                     B.Tech CSE • Artificial Intelligence & Machine Learning
                   </p>
                 </div>
               </>
             )}
             
             {currentPage === 0 && (
               <div className="absolute bottom-6 animate-pulse flex items-center justify-center gap-2 text-white/30 hover:text-white/70 transition-colors text-[9px] font-bold uppercase tracking-[0.3em] cursor-pointer">
                 Open Book <ChevronRight size={12} />
               </div>
             )}
          </div>
          
          {/* Page Edge Illusion (Right edge) */}
          <div className="absolute right-0 top-1 bottom-1 w-1 sm:w-1.5 bg-gradient-to-l from-[#E2E8F0] to-[#F8FAFC] shadow-[-2px_0_5px_rgba(0,0,0,0.4)] rounded-r-sm z-0 pointer-events-none"></div>
          {/* Subtle page lines on the edge */}
          <div className="absolute right-0 top-1 bottom-1 w-[2px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4xKSIvPjwvc3ZnPg==')] z-10 pointer-events-none"></div>
        </div>
      );
    }
    
    if (pageData.type === 'inside-cover') {
      return (
        <div className="w-full h-full bg-[#2D2636] shadow-inner relative overflow-hidden">
           {/* Elegant patterned endpaper */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/argyle.png')] opacity-20"></div>
           {/* Deep spine crease shadow based on side */}
           <div className={`absolute top-0 ${side === 'left' ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/80 via-black/20 to-transparent w-8 sm:w-12 h-full z-10 pointer-events-none`}></div>
        </div>
      );
    }

    if (pageData.type === 'blank') {
      return (
        <div className="w-full h-full bg-[#FDFBF7] relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 mix-blend-multiply"></div>
           <div className={`absolute top-0 ${side === 'left' ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/30 via-black/5 to-transparent w-8 sm:w-12 h-full z-10 pointer-events-none`}></div>
           <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] pointer-events-none"></div>
        </div>
      );
    }

    if (pageData.type === 'cert') {
      const cert = pageData.content;
      return (
        <div className="w-full h-full bg-[#FDFBF7] flex flex-col p-4 sm:p-6 shadow-inner relative overflow-hidden group border-x border-[#E2E8F0]">
          {/* Ivory Paper Texture & Shadows */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 mix-blend-multiply pointer-events-none z-0"></div>
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.03)] pointer-events-none z-0"></div>
          
          {/* Dynamic spine crease based on whether the page is on the left or right of the spread */}
          <div className={`absolute top-0 ${side === 'left' ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/40 via-black/5 to-transparent w-8 sm:w-14 h-full z-20 pointer-events-none`}></div>
          
          {/* Physically mounted polaroid/print illusion */}
          <div className="relative w-full aspect-[4/3] bg-white p-2 sm:p-3 mb-4 sm:mb-6 shadow-[0_3px_10px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.05)] flex-shrink-0 z-10 transform rotate-[0.5deg] hover:rotate-0 transition-transform duration-300">
            {/* Vintage photo corners */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-[3px] border-l-[3px] border-gray-300"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-[3px] border-r-[3px] border-gray-300"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-[3px] border-r-[3px] border-gray-300"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-[3px] border-l-[3px] border-gray-300"></div>
            
            <img src={cert.image} alt={cert.title} className="w-full h-full object-contain border border-gray-100" />
          </div>

          <div className="flex-grow flex flex-col justify-between z-10 relative">
            <div>
              {/* Org Logo and Name */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2 opacity-80">
                 {cert.orgLogo && <img src={cert.orgLogo} alt={cert.organization} className="w-3 h-3 sm:w-4 sm:h-4 object-contain" />}
                 <p className="text-[7px] sm:text-[9px] md:text-[10px] font-bold text-gray-500 tracking-widest uppercase line-clamp-1">{cert.organization}</p>
              </div>
              
              {/* Responsive Certificate Title */}
              <h3 className="text-[10px] sm:text-sm md:text-base font-serif font-black text-gray-800 mb-1.5 sm:mb-3 leading-tight sm:leading-snug line-clamp-2 md:line-clamp-none">{cert.title}</h3>
              
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2">
                {cert.skills.map((s, i) => (
                  <span key={i} className="text-[6px] sm:text-[8px] md:text-[9px] font-mono font-semibold bg-gray-100 border border-gray-200 px-1 sm:px-1.5 py-0.5 rounded text-gray-600 truncate max-w-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={cert.verifyLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold text-text-primary bg-white/5 border border-white/10 hover:border-primary-light hover:bg-primary-light hover:text-[#1C1822] px-3 py-2 transition-all shadow-sm mt-auto group-hover:shadow-md"
            >
              View Credential <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
            </a>
          </div>
          
          {/* Subtle Page Numbering */}
          <div className={`absolute bottom-3 ${side === 'left' ? 'left-4' : 'right-4'} text-[9px] font-serif font-bold text-gray-400 opacity-60`}>
             {pageData.pageNum}
          </div>
        </div>
      );
    }
  };

  return (
    <section id="certifications" className="section-reveal py-8 md:py-12 relative overflow-hidden">
      <SectionHeading>Certifications</SectionHeading>
      
      {/* Side Panels - visible mainly on large screens to fill empty space */}
      <div className="absolute inset-0 top-32 flex justify-between items-start pointer-events-none px-4 lg:px-8 xl:px-12 -z-10">
        {/* Left Panel: Verified Expertise */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="hidden lg:flex flex-col w-[220px] xl:w-[280px] transition-all duration-700"
          style={{ opacity: currentPage > 0 ? 0.3 : 0.8 }}
        >
          <div className="flex items-center gap-2 text-gray-500 mb-6 border-b border-gray-800 pb-2">
            <ShieldCheck size={18} className="text-primary-light" />
            <h3 className="font-heading font-bold text-sm tracking-widest uppercase text-gray-400">Validated Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {allCertSkills.map((skill, i) => (
              <span key={i} className="text-[11px] font-medium bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-md text-gray-400 backdrop-blur-sm">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Panel: Issuing Authorities */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="hidden lg:flex flex-col w-[220px] xl:w-[280px] items-end text-right transition-all duration-700"
          style={{ opacity: currentPage > 0 ? 0.3 : 0.8 }}
        >
          <div className="flex items-center justify-end gap-2 text-gray-500 mb-6 border-b border-gray-800 pb-2 w-full">
            <h3 className="font-heading font-bold text-sm tracking-widest uppercase text-gray-400">Issuers</h3>
            <GraduationCap size={18} className="text-secondary" />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {uniqueOrgs.map((org, i) => (
              <div key={i} className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 rounded-lg flex items-center justify-end gap-3 backdrop-blur-sm shadow-sm transition-colors hover:bg-white/[0.05]">
                {org.logo && <img src={org.logo} alt={org.name} className="w-5 h-5 object-contain" />}
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">{org.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Container with high perspective for 3D effect */}
      <div className="relative w-full flex items-center justify-center mt-12 mb-24 min-h-[400px] sm:min-h-[500px]" style={{ perspective: '2000px' }}>
        
        {/* The book anchor / spine */}
        <div 
          className="relative w-[45vw] sm:w-[260px] md:w-[350px] aspect-[3/4] transition-transform duration-1000 ease-in-out"
          style={{
             transform: currentPage > 0 ? 'translateX(50%)' : 'translateX(0)',
          }}
        >
          {leaves.map((leaf, index) => {
            const isFlipped = currentPage > index;
            
            // Calculate z-index to stack pages correctly. 
            // Flipped pages on left need lower z-index as they stack backwards.
            // Unflipped pages on right need higher z-index on top.
            const zIndex = isFlipped ? index : totalLeaves - index;

            return (
              <motion.div
                key={index}
                className="absolute top-0 left-0 w-full h-full cursor-pointer origin-left"
                style={{ 
                  zIndex,
                  transformStyle: 'preserve-3d'
                }}
                initial={false}
                animate={{
                  rotateY: isFlipped ? -180 : 0,
                }}
                transition={{ duration: 0.8, type: "spring", stiffness: 40, damping: 14 }}
                onClick={() => {
                  if (isFlipped) {
                    prevPage();
                  } else {
                    nextPage();
                  }
                }}
              >
                {/* FRONT SIDE */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-r-lg sm:rounded-r-xl overflow-hidden"
                  style={{
                     backfaceVisibility: 'hidden',
                     WebkitBackfaceVisibility: 'hidden',
                     boxShadow: !isFlipped ? '5px 5px 20px rgba(0,0,0,0.3)' : 'none'
                  }}
                >
                  {renderPageContent(leaf.front, 'right')}
                </div>
                
                {/* BACK SIDE */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-l-lg sm:rounded-l-xl overflow-hidden"
                  style={{ 
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    boxShadow: isFlipped ? '-5px 5px 20px rgba(0,0,0,0.3)' : 'none'
                  }}
                >
                  {renderPageContent(leaf.back, 'left')}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        {currentPage > 0 && (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
           >
             <button 
                onClick={(e) => { e.stopPropagation(); prevPage(); }}
                disabled={currentPage === 0}
                className="p-1.5 sm:p-2 rounded-full bg-primary-light/20 hover:bg-primary-light/40 text-primary-light disabled:opacity-30 transition-colors"
             >
                <ChevronLeft size={20} />
             </button>
             <span className="text-gray-300 font-medium text-xs sm:text-sm whitespace-nowrap min-w-[80px] text-center">
                Spread {currentPage} / {totalLeaves}
             </span>
             <button 
                onClick={(e) => { e.stopPropagation(); nextPage(); }}
                disabled={currentPage === totalLeaves}
                className="p-1.5 sm:p-2 rounded-full bg-primary-light/20 hover:bg-primary-light/40 text-primary-light disabled:opacity-30 transition-colors"
             >
                <ChevronRight size={20} />
             </button>
           </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
