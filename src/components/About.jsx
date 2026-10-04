import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle, TrendingUp, BookOpen, Calendar, MapPin, Target } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { calculateTotalExperienceYears } from '../utils/experienceCalculator';

export const About = ({ profile, education = [], stats = [], experience = [] }) => {
  const bioParagraphs = profile.bio ? profile.bio.split('\n\n') : [
    "I specialize in Performance Marketing, Social Media Marketing, SEO, Content Strategy, and Digital Analytics. My experience includes working with Google Ads, Meta Ads, LinkedIn, social media platforms, email marketing, and lead generation campaigns.",
    "I enjoy understanding audience behaviour, analysing campaign performance, and turning data into practical marketing strategies. Along with execution, I also have experience in team coordination and handling digital marketing activities from strategy to implementation.",
    "I’m continuously exploring new digital trends, tools, and strategies to improve my skills and create better marketing outcomes for businesses.",
    "My goal is simple - create meaningful digital experiences, generate measurable results, and keep growing as a digital marketing professional."
  ];

  // Dynamically calculate total experience years from experience entries
  const totalExpYears = calculateTotalExperienceYears(experience);

  return (
    <section id="about" className="py-20 relative bg-slate-50/50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
            About <span className="gradient-text-blue-teal">Me</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto rounded-full mt-2" />
        </div>

        {/* Bio & Stat Badges Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
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
                <div className="flex items-center gap-3 text-blue-600 border-b border-slate-100 pb-3">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="text-xl font-extrabold text-slate-900">Professional Summary</h3>
                </div>

                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  {bioParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Core Strengths Badges */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Google & Meta Paid Ads</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>On-Page & Off-Page SEO</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>CTR & CPC Optimization</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Lead Generation & Analytics</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Clean Compact Metric Cards Column - Centered Vertically */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center h-full my-auto gap-5"
          >
            {/* Metric Card 1: Dynamic Years Experience */}
            <TiltCard className="p-5 border-slate-200/90 bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">Years Experience</h4>
                    <p className="text-[11px] text-slate-500">Auto-calculated from timeline</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                  Verified
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 mt-3">
                <div className="text-3xl font-black text-blue-600 tracking-tight leading-none">
                  {totalExpYears} <span className="text-base font-bold text-slate-700">Years</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Hands-on execution in Performance Ads, Search Optimization & Social Media growth.
                </p>
              </div>
            </TiltCard>

            {/* Metric Card 2: Campaigns Managed */}
            <TiltCard className="p-5 border-slate-200/90 bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">Campaigns Managed</h4>
                    <p className="text-[11px] text-slate-500">Multi-channel ad funnels</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider border border-teal-100">
                  High ROI
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 mt-3">
                <div className="text-3xl font-black text-teal-600 tracking-tight leading-none">
                  70+ <span className="text-base font-bold text-slate-700">Campaigns</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Targeted Google Ads & Meta Ads lead generation across commercial business sectors.
                </p>
              </div>
            </TiltCard>

          </motion.div>

        </div>

        {/* Education Timeline Block */}
        <div className="space-y-8 pt-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-blue-600" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Education Qualification</h3>
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
