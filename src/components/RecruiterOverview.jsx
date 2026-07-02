import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Trophy, Code, GraduationCap, MapPin, Briefcase } from 'lucide-react'

const RecruiterOverview = ({ data }) => {
  return (
    <section id="recruiter-overview" className="section-reveal scroll-mt-24 mb-16 relative z-10">
      <div className="bg-card-bg/60 border border-primary-light/30 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-heading font-black text-text-primary tracking-tight">
                  {data.name}
                </h1>
                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-500/30 uppercase tracking-widest animate-pulse">
                  Open to Work
                </span>
              </div>
              <p className="text-primary-light font-medium text-lg md:text-xl">
                {data.role}
              </p>
            </div>
            
            <a 
              href={data.contact.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-button text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-primary-light/25 hover:scale-[1.02] transition-all whitespace-nowrap"
            >
              <FileText size={18} />
              Download Resume
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Education Info */}
            <div className="bg-bg-primary/50 border border-card-border p-4 rounded-2xl flex items-start gap-3">
              <div className="bg-primary-light/10 p-2 rounded-lg text-primary-light">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-1">Education</h3>
                <p className="text-xs text-text-muted">{data.university}</p>
                <p className="text-xs font-semibold text-text-primary mt-1">CGPA: {data.cgpa}</p>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="bg-bg-primary/50 border border-card-border p-4 rounded-2xl flex items-start gap-3">
              <div className="bg-secondary/10 p-2 rounded-lg text-secondary">
                <Code size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-1">Core Tech Stack</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {data.skills.languages.slice(0, 3).join(', ')} <br/>
                  <span className="font-semibold text-text-primary">React, FastAPI, Docker</span>
                </p>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="bg-bg-primary/50 border border-card-border p-4 rounded-2xl flex items-start gap-3">
              <div className="bg-accent/10 p-2 rounded-lg text-accent">
                <Trophy size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-1">Key Achievements</h3>
                <p className="text-xs text-text-muted">
                  {data.stats.hackathons} Hackathons (Top 10 Finalist twice) <br/>
                  {data.stats.internships} Internships <br/>
                  {data.stats.projects} Deployed Projects
                </p>
              </div>
            </div>
          </div>

          <div className="bg-bg-primary/40 border border-card-border p-5 rounded-2xl">
            <h3 className="text-sm font-bold text-text-primary mb-3">60-Second Summary</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              I am an AI/ML Engineer and Full-Stack Developer specializing in building adaptive intelligent systems and scalable web applications. My expertise lies in designing robust ML pipelines (Computer Vision, NLP) and integrating them with high-performance backends (FastAPI, Node.js) and interactive frontends (React). Proven track record of delivering end-to-end solutions in competitive hackathons and internships.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecruiterOverview
