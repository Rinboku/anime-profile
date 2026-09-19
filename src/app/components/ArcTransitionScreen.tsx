"use client";

export function ArcTransitionScreen({
  completedArcTitle,
  nextArcTitle,
  percentRemaining,
  globalPercent,
  accentColor,
  onContinue,
}: {
  completedArcTitle: string;
  nextArcTitle: string;
  percentRemaining: number;
  globalPercent: number;
  accentColor: string;
  onContinue: () => void;
}) {
  const clarity = Math.min(globalPercent / 100, 1); // 0 = complet neclar, 1 = aproape clar

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#050505] text-white overflow-hidden">
      {/* STÂNGA — siluetă mister */}
      <div className="relative w-full md:w-2/5 h-48 md:h-full flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 200 300"
          className="w-2/3 md:w-3/5"
          style={{ filter: `brightness(${0.15 + clarity * 0.85}) contrast(${1 + clarity * 0.3})` }}
        >
          <path
            d="M100 40 a35 35 0 1 1 0 70 a35 35 0 1 1 0 -70 M50 280 q0 -110 50 -110 q50 0 50 110 z"
            fill={accentColor}
            opacity={0.25 + clarity * 0.55}
          />
        </svg>
        {/* overlay de static/zgomot, dispare pe măsură ce clarity crește */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: 1 - clarity,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, transparent 1px, transparent 2px, rgba(255,255,255,0.04) 3px)",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* DREAPTA — text și buton */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h2 className="font-serif text-2xl md:text-3xl font-black uppercase mb-2">
          {completedArcTitle} — Complete
        </h2>
        <p className="text-gray-400 text-sm mb-1">Next up:</p>
        <p className="font-bold text-lg mb-6">{nextArcTitle}</p>
        <p className="text-sm opacity-60 mb-10">
          {percentRemaining.toFixed(0)}% of the journey remains
        </p>
        <button
          onClick={onContinue}
          className="px-10 py-3.5 font-bold uppercase tracking-widest text-[11px] rounded-lg shadow-xl"
          style={{ backgroundColor: accentColor }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}