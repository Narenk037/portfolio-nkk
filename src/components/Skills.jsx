import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Search, 
  Share2, 
  Mail, 
  MessageSquare, 
  PenTool, 
  TrendingUp, 
  Sparkles,
  Zap
} from 'lucide-react';
import { TiltCard } from './TiltCard';

const iconMap = {
  Target: Target,
  Search: Search,
  Share2: Share2,
  Mail: Mail,
  MessageSquare: MessageSquare,
  PenTool: PenTool,
  TrendingUp: TrendingUp,
};

export const Skills = ({ skills = [] }) => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold uppercase tracking-wider">
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Marketing Skills & <span className="gradient-text-blue-teal">Growth Channels</span>
          </h2>
          <p className="text-base text-slate-600">
            Specialized toolkit spanning paid advertising, search rankings, audience retention, and creative content strategy.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.iconName] || Zap;
            return (
              <motion.div
                key={skill.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TiltCard className="p-6 h-full flex flex-col justify-between space-y-4 border-slate-200/80 hover:border-blue-300">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-100 text-blue-600 flex items-center justify-center border border-blue-200/60 shadow-xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                        {skill.category || 'Digital Marketing'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {skill.name}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Active Practice
                    </span>
                    <span className="text-slate-400 font-normal">Expert Level</span>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
