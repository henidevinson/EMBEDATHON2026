import React, { useMemo } from 'react';

export const EmbersBackground: React.FC = () => {
  // Generate random static particles on mount
  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const left = Math.random() * 100;
      const bottom = Math.random() * -100;
      const size = Math.random() * 4 + 2; // 2px to 6px
      const duration = Math.random() * 12 + 8; // 8s to 20s
      const delay = Math.random() * 10;
      const isMarigold = i % 2 === 0;
      const color = isMarigold ? '#FDB515' : '#FF4A12';
      const blur = size > 4 ? '1px' : '0px';

      return {
        id: i,
        style: {
          left: `${left}%`,
          bottom: `${bottom}px`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          boxShadow: `0 0 ${size * 2}px ${color}`,
          filter: `blur(${blur})`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        },
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Obsidian gradient vignettes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,74,18,0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(253,181,21,0.06),transparent_60%)]" />
      
      {/* Subtle retro tech grid lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, #FDB515 1px, transparent 1px), linear-gradient(to bottom, #FDB515 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Floating ember particles */}
      {particles.map((p) => (
        <span key={p.id} className="ember-particle" style={p.style} />
      ))}
    </div>
  );
};
