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
  MousePointer,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Linkedin } from './LinkedinIcon';
import { TiltCard } from './TiltCard';

export const Hero = ({ profile }) => {
  const roles = profile.roles || [
    "Digital Marketing Executive",
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
    // Generate clean text resume / alert for user
    const resumeText = `Narendiran K K - Digital Marketing Executive\nEmail: ${profile.email}\nPhone: ${profile.phone}\nLocation: ${profile.location}\nLinkedIn: ${profile.linkedin}\n\nKey Skills: Google Ads, Meta Ads, SEO, SEM, SMM, Content Writing, Email Marketing, WhatsApp Campaigns.`;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Narendiran_KK_Digital_Marketing_Executive_Resume.txt';
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

          {/* Right Column: Light Marketing Analytics & Tool Ring Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <TiltCard className="p-6 sm:p-8 space-y-6 relative z-10 border-slate-200/90 shadow-xl">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Campaign Analytics</h3>
                    <p className="text-xs text-slate-500">Live ROI & Performance Overview</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  +34.2% YoY Growth
                </span>
              </div>

              {/* Dynamic Growth Metric Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Avg CTR</span>
                  <p className="text-xl font-bold text-blue-600 mt-0.5">4.8%</p>
                  <span className="text-[10px] text-emerald-600 font-medium">↑ High Intent</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Avg CPC</span>
                  <p className="text-xl font-bold text-teal-600 mt-0.5">₹12.40</p>
                  <span className="text-[10px] text-emerald-600 font-medium">↓ -24% Saved</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Target CPA</span>
                  <p className="text-xl font-bold text-orange-600 mt-0.5">Optimal</p>
                  <span className="text-[10px] text-emerald-600 font-medium">Top Quality</span>
                </div>
              </div>

              {/* Visual Campaign Bar Chart */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Google Ads Campaign Conversion</span>
                  <span className="text-blue-600 font-bold">92% Target</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"
                  />
                </div>

                <div className="flex justify-between text-xs font-semibold text-slate-700 pt-1">
                  <span>Meta Ads Lead Generation</span>
                  <span className="text-teal-600 font-bold">88% Qualified</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "88%" }}
                    transition={{ duration: 1.2, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                  />
                </div>
              </div>

              {/* Orbiting Marketing Tool Icon Row */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Tools Ecosystem:</span>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 hover:scale-110 transition-transform" title="Google Ads">
                    <Target className="w-4 h-4" />
                  </div>
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 hover:scale-110 transition-transform" title="Meta Campaigns">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-600 border border-teal-100 hover:scale-110 transition-transform" title="Analytics">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <div className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 hover:scale-110 transition-transform" title="Email & CRM">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </TiltCard>

            {/* Decorative Light Backdrop Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 via-sky-100 to-teal-200 rounded-3xl blur-2xl opacity-50 -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
