import React from 'react';
import { TrendingUp, Mail } from 'lucide-react';
import { Linkedin } from './LinkedinIcon';

export const Footer = ({ profile }) => {
  return (
    <footer className="bg-slate-100/80 border-t border-slate-200/80 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">Narendiran K K</h4>
              <p className="text-xs text-slate-500">Digital Marketing Executive • Chennai, India</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-blue-600 transition-colors">Campaigns</a>
            <a href="#certificates" className="hover:text-blue-600 transition-colors">Certificates</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a 
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href={`mailto:${profile.email}`}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-200/60 flex items-center justify-center text-xs text-slate-500 text-center">
          <p>© {new Date().getFullYear()} Narendiran K K. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
