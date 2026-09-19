"use client";
import { ProgressCrystal } from "./ProgressCrystal";

export function ArcTransitionScreen({
  completedArcTitle,
  nextArcTitle,
  percentRemaining,
  accentColor,
  onContinue,
}: {
  completedArcTitle: string;
  nextArcTitle: string;
  percentRemaining: number;
  accentColor: string;
  onContinue: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[#050505] text-white">
      <ProgressCrystal percent={100 - percentRemaining} accentColor={accentColor} />
      <h2 className="font-serif text-3xl font-black uppercase mt-8 mb-2">
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
  );
}