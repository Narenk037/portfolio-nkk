import React from 'react';
import { motion } from 'framer-motion';
import { Award, FileCheck, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const Certificates = ({ certificates = [] }) => {
  return (
    <section id="certificates" className="py-20 relative bg-slate-50/50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
            Verified Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Certifications & <span className="gradient-text-blue-teal">Diplomas</span>
          </h2>
          <p className="text-base text-slate-600">
            Professional technical diplomas and speed typing qualifications demonstrating detail accuracy.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id || index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TiltCard className="p-7 space-y-4 border-slate-200/90 shadow-md flex flex-col justify-between h-full">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {cert.grade || 'First Class'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-sm font-medium text-slate-700">
                    Issuer: <span className="text-blue-600">{cert.issuer}</span>
                  </p>

                  {cert.description && (
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {cert.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Year Awarded: {cert.year || '2023-2024'}</span>
                  <span className="text-teal-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>

              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
