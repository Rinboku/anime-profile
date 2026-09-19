"use client";

export function ProgressCrystal({ percent, accentColor }: { percent: number; accentColor: string }) {
  const glow = Math.min(percent / 100, 1);
  return (
    <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          opacity: 0.15 + glow * 0.6,
          filter: `blur(${4 + glow * 6}px)`,
          transform: `scale(${0.8 + glow * 0.4})`,
        }}
      />
      <div
        className="relative w-7 h-7 rotate-45 rounded-sm border-2 transition-all duration-500"
        style={{
          borderColor: accentColor,
          backgroundColor: `${accentColor}${Math.round(20 + glow * 60).toString(16)}`,
          boxShadow: `0 0 ${6 + glow * 14}px ${accentColor}`,
        }}
      />
    </div>
  );
}