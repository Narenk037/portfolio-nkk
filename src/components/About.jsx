import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle, TrendingUp, BookOpen, Calendar, MapPin } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const About = ({ profile, education = [], stats = [] }) => {
  return (
    <section id="about" className="py-20 relative bg-slate-50/50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-100/70 text-blue-700 text-xs font-bold uppercase tracking-wider">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Data-Driven Performance <span className="gradient-text-blue-teal">Marketing Marketer</span>
          </h2>
          <p className="text-base text-slate-600">
            Bridging technical analytics, creative content, and strategic ad placements to maximize audience conversion.
          </p>
        </div>

        {/* Bio & Stat Badges Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Detailed Bio Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex"
          >
            <TiltCard className="p-8 flex flex-col justify-between space-y-6 w-full shadow-md">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-blue-600">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-slate-900">Professional Summary</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-base">
                  {profile.bio || "Performance-focused Digital Marketing Executive skilled in Google Ads, Meta campaigns, SEO, and data-driven growth strategies (CTR, CPC, CPA)."}
                </p>
                <p className="text-slate-600 leading-relaxed text-base">
                  With a solid foundation in Commerce and Computer Applications (B.Com CA with 9.2 CGPA), I combine analytical precision with marketing creativity to optimize customer acquisition costs and drive sustainable organic growth.
                </p>
              </div>

              {/* Core Strengths Badges */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Google & Meta Paid Ads</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>On-Page & Off-Page SEO</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>CTR & CPC Optimization</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Canva & Scripting</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Stat Badges Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            <TiltCard className="p-6 flex items-center gap-5 border-blue-200/80 bg-gradient-to-r from-white via-blue-50/30 to-white">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-black shadow-md shadow-blue-600/20 shrink-0">
                1.5+
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Years Experience</h4>
                <p className="text-xs text-slate-500">In Digital Marketing, SEO & Ads Management</p>
              </div>
            </TiltCard>

            <TiltCard className="p-6 flex items-center gap-5 border-teal-200/80 bg-gradient-to-r from-white via-teal-50/30 to-white">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl font-black shadow-md shadow-teal-600/20 shrink-0">
                50+
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Campaigns Managed</h4>
                <p className="text-xs text-slate-500">Google Ads & Meta Campaigns across industries</p>
              </div>
            </TiltCard>

            <TiltCard className="p-6 flex items-center gap-5 border-orange-200/80 bg-gradient-to-r from-white via-orange-50/30 to-white">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-2xl font-black shadow-md shadow-orange-500/20 shrink-0">
                SEO
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">SEO / SEM / SMM</h4>
                <p className="text-xs text-slate-500">End-to-End Specialist Strategy & Execution</p>
              </div>
            </TiltCard>
          </motion.div>

        </div>

        {/* Education Timeline Block */}
        <div className="space-y-8 pt-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Education Qualification</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, idx) => (
              <motion.div
                key={edu.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <TiltCard className="p-6 space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                        {edu.period}
                      </span>
                      <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        {edu.score}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900">{edu.degree}</h4>
                    <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span>{edu.institution}</span>
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{edu.location}</span>
                    </p>
                  </div>

                  {edu.highlight && (
                    <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                      💡 {edu.highlight}
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
