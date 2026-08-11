import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Building } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const Experience = ({ experience = [] }) => {
  return (
    <section id="experience" className="py-20 relative bg-slate-50/50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
            Work History
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional <span className="gradient-text-blue-teal">Work Experience</span>
          </h2>
          <p className="text-base text-slate-600">
            Track record of managing cross-channel paid ad campaigns, organic SEO ranking strategies, and social media production.
          </p>
        </div>

        {/* Vertical Light Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="hidden sm:block absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-teal-400 to-slate-200" />

          <div className="space-y-10">
            {experience.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-0 sm:pl-20"
              >
                {/* Timeline Dot */}
                <div className="hidden sm:flex absolute left-4 top-6 w-8 h-8 rounded-full bg-white border-2 border-blue-600 shadow-md items-center justify-center text-blue-600 z-10 -translate-x-1/2">
                  <Briefcase className="w-4 h-4" />
                </div>

                <TiltCard className="p-6 sm:p-8 space-y-5 border-slate-200/80 shadow-md">
                  
                  {/* Top Meta info */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                        {item.type || 'Full-time'}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                        {item.role}
                      </h3>
                      <p className="text-base font-semibold text-slate-700 flex items-center gap-2">
                        <Building className="w-4 h-4 text-blue-500" />
                        <span>{item.company}</span>
                      </p>
                    </div>

                    <div className="text-right space-y-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        {item.period}
                      </span>
                      <p className="text-xs text-slate-500 flex items-center gap-1 justify-end pt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Role Overview */}
                  {item.description && (
                    <p className="text-slate-600 text-sm leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{item.description}"
                    </p>
                  )}

                  {/* Highlights Bullet Points */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="space-y-2.5 pt-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Deliverables & Impact:</h4>
                      <ul className="space-y-2">
                        {item.highlights.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-normal">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
