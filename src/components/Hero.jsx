import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  TrendingUp, 
  BarChart2, 
  Target, 
  Share2, 
  User,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { Linkedin } from './LinkedinIcon';
import { TiltCard } from './TiltCard';

export const Hero = ({ profile }) => {
  const roles = profile.roles || [
    "Digital Marketing Specialist",
    "SEO & SEM Specialist",
    "Social Media Strategist",
    "Performance Marketer"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Effect Logic
  useEffect(() => {
    const targetRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(targetRole.substring(0, displayText.length + 1));
        if (displayText === targetRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(targetRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const handleDownloadResume = () => {
    const resumeText = `Narendiran K K - Digital Marketing Executive\nEmail: ${profile.email}\nPhone: ${profile.phone}\nLocation: ${profile.location}\nLinkedIn: ${profile.linkedin}\n\nKey Skills: Google Ads, Meta Ads, SEO, SEM, SMM, Content Writing, Email Marketing, WhatsApp Campaigns.`;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Narendiran_cv.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Hero Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Full-time Roles & Growth Projects</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-500 ml-1" />
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Hi, I'm <span className="gradient-text-blue-teal">{profile.name}</span>
            </h1>

            {/* Typewriter Subtitle */}
            <div className="h-10 sm:h-12 flex items-center">
              <p className="text-xl sm:text-2xl font-bold text-slate-700">
                I am a{' '}
                <span className="text-blue-600 border-b-2 border-blue-600 pb-0.5">
                  {displayText}
                </span>
                <span className="animate-pulse text-blue-600 font-normal">|</span>
              </p>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {profile.tagline}
            </p>

            {/* Contact Quick-Links Strip */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm text-slate-600">
              <a 
                href={`mailto:${profile.email}`} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 hover:border-blue-300 hover:text-blue-600 hover:shadow-xs transition-all"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>{profile.email}</span>
              </a>
              <a 
                href={`tel:${profile.phone}`} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 hover:border-blue-300 hover:text-blue-600 hover:shadow-xs transition-all"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{profile.phone}</span>
              </a>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200/80">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Chennai, India</span>
              </div>
              {profile.linkedin && (
                <a 
                  href={profile.linkedin} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#skills"
                className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-base shadow-lg shadow-blue-500/20"
              >
                <span>View My Work</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={handleDownloadResume}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-base text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-xs transition-all"
              >
                <Download className="w-5 h-5 text-slate-600" />
                <span>Download Resume</span>
              </button>
            </div>

          </motion.div>

          {/* Right Column: Profile Photo Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <TiltCard className="p-4 sm:p-6 relative z-10 border-slate-200/90 shadow-2xl rounded-3xl max-w-sm w-full bg-white/90">
              
              {/* Profile Image Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-4/5 bg-gradient-to-br from-blue-50 via-slate-100 to-sky-100 flex items-center justify-center border border-slate-200 shadow-inner group">
                <img 
                  src={profile.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"} 
                  alt={profile.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient Overlay & Watermark Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white space-y-0.5">
                    <h3 className="font-bold text-lg leading-tight">{profile.name}</h3>
                    <p className="text-xs text-sky-200 font-medium">Digital Marketing Specialist</p>
                  </div>
                </div>
              </div>

              {/* Floating Highlight Badges */}
              <div className="pt-4 grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-center">
                  <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider block">Specialization</span>
                  <span className="text-xs font-bold text-slate-800">Performance Ads</span>
                </div>
                <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-center">
                  <span className="text-[10px] font-bold uppercase text-teal-600 tracking-wider block">SEO & SMM</span>
                  <span className="text-xs font-bold text-slate-800">Growth Strategy</span>
                </div>
              </div>

            </TiltCard>

            {/* Decorative Light Backdrop Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 via-sky-100 to-teal-200 rounded-3xl blur-2xl opacity-50 -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
