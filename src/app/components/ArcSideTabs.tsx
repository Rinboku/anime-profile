"use client";

export function ArcSideTabs({ tabs, accentColor }: { tabs: { title: string; percent: number; isCurrent: boolean }[]; accentColor: string }) {
  return (
    <div className="hidden md:flex flex-col gap-3 z-20 shrink-0">
      {tabs.map((tab, i) => {
        const filled = tab.percent >= 100;
        return (
          <div
            key={i}
            className="w-[130px] h-10 flex items-center justify-center text-[10px] font-bold uppercase tracking-wide rounded-lg border-2 transition-all duration-500 relative overflow-hidden shadow-lg"
            style={{ borderColor: accentColor, color: filled ? "#000" : "#fff" }}
          >
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{ backgroundColor: accentColor, width: `${tab.percent}%`, opacity: filled ? 1 : 0.9 }}
            />
            <span className="relative z-10 px-2 text-center leading-tight truncate">{tab.title}</span>
            {tab.isCurrent && (
              <div className="absolute inset-0 border-2 rounded-lg pointer-events-none animate-pulse" style={{ borderColor: accentColor }} />
            )}
          </div>
        );
      })}
    </div>
  );
}