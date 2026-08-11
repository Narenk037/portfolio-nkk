import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gamepad2, Heart } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const Interests = ({ interests = [] }) => {
  const iconMap = {
    Trophy: Trophy,
    Gamepad2: Gamepad2
  };

  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card p-6 sm:p-8 rounded-3xl border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Beyond Marketing</h3>
              <p className="text-xs text-slate-500">Personal interests & competitive strategy hobbies</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {interests.map((item, idx) => {
              const Icon = iconMap[item.iconName] || Trophy;
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs"
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">{item.name}</span>
                    <span className="text-[11px] text-slate-500">{item.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
