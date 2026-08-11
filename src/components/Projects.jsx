import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart2, 
  ExternalLink, 
  Target, 
  Zap, 
  CheckCircle, 
  TrendingUp, 
  Layers, 
  X 
} from 'lucide-react';
import { TiltCard } from './TiltCard';

export const Projects = ({ projects = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', ...new Set(projects.map(p => p.category || 'Campaigns'))];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
            Case Studies & Campaigns
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Featured <span className="gradient-text-blue-teal">Digital Growth Projects</span>
          </h2>
          <p className="text-base text-slate-600">
            Real campaign setups, performance optimizations, and metric breakdowns demonstrating high ROI execution.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TiltCard className="p-6 sm:p-7 space-y-5 flex flex-col justify-between h-full border-slate-200/90 hover:border-blue-300">
                
                <div className="space-y-4">
                  {/* Category Pill */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                      {project.category || 'Performance Campaign'}
                    </span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Verified Case Study
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Metrics Strip */}
                  {project.metrics && (
                    <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 block uppercase font-semibold">CTR</span>
                        <span className="text-xs font-bold text-blue-600">{project.metrics.ctr || 'N/A'}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 block uppercase font-semibold">CPC</span>
                        <span className="text-xs font-bold text-teal-600">{project.metrics.cpc || 'N/A'}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 block uppercase font-semibold">CPA</span>
                        <span className="text-xs font-bold text-orange-600">{project.metrics.cpa || 'N/A'}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 block uppercase font-semibold">ROAS</span>
                        <span className="text-xs font-bold text-emerald-600">{project.metrics.roas || 'N/A'}</span>
                      </div>
                    </div>
                  )}

                  {/* Tools Badges */}
                  {project.tools && project.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tools.map((tool, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                  >
                    <span>View Campaign Metrics Breakdown</span>
                    <TrendingUp className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Modal Case Study Preview */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card max-w-xl w-full p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl relative border-slate-300"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedProject.description}
                </p>

                {selectedProject.metrics && (
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800">Verified Campaign Growth Metrics:</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between border-b border-blue-100 pb-1">
                        <span className="text-slate-600">Click-Through Rate (CTR):</span>
                        <span className="font-bold text-blue-700">{selectedProject.metrics.ctr}</span>
                      </div>
                      <div className="flex justify-between border-b border-blue-100 pb-1">
                        <span className="text-slate-600">Cost-Per-Click (CPC):</span>
                        <span className="font-bold text-teal-700">{selectedProject.metrics.cpc}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Cost-Per-Acquisition (CPA):</span>
                        <span className="font-bold text-orange-700">{selectedProject.metrics.cpa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Return on Ad Spend (ROAS):</span>
                        <span className="font-bold text-emerald-700">{selectedProject.metrics.roas}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-primary px-6 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Close Case Study
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
