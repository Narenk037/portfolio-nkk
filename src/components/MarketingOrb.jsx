import React from 'react';

export const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Soft Pastel Blue Orb */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-60 animate-blob-1"
        style={{ background: 'radial-gradient(circle, rgba(147, 197, 253, 0.45) 0%, rgba(224, 242, 254, 0.1) 70%)' }}
      />
      {/* Soft Mint Orb */}
      <div 
        className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-50 animate-blob-2"
        style={{ background: 'radial-gradient(circle, rgba(153, 246, 228, 0.4) 0%, rgba(204, 251, 241, 0.05) 70%)' }}
      />
      {/* Soft Peach Orb */}
      <div 
        className="absolute bottom-10 left-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-45 animate-blob-3"
        style={{ background: 'radial-gradient(circle, rgba(254, 215, 170, 0.4) 0%, rgba(255, 237, 213, 0.05) 70%)' }}
      />
      {/* Subtle Mesh Grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};
