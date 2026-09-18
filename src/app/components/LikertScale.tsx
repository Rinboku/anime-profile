interface LikertScaleProps {
  question: string;
  response: number | null;
  onSelect: (val: number) => void;
  maxScale?: number; // Opțional: poți seta 5, 10, etc.
}

export const LikertScale = ({ question, response, onSelect, maxScale = 5 }: LikertScaleProps) => {
  // Generăm un array de lungimea maxScale [1, 2, ..., maxScale]
  const scale = Array.from({ length: maxScale }, (_, i) => i + 1);

  return (
    <div className="border-b border-black/10 pb-6 mb-6">
      <p className="font-bold text-lg text-black mb-4 leading-snug">{question}</p>
      
      <div className="flex justify-between gap-1">
        {scale.map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => onSelect(val)}
            className={`flex-1 py-2 text-sm md:py-3 rounded-md font-black transition-all border-2 ${
              response === val
                ? 'bg-black text-[#ff9800] border-black scale-105 shadow-lg'
                : 'bg-transparent border-black/20 text-black/40 hover:border-black hover:text-black'
            }`}
          >
            {val}
          </button>
        ))}
      </div>
      
      <div className="flex justify-between mt-2 px-1 text-[9px] uppercase font-bold opacity-50 text-black">
        <span>Dezacord Total</span>
        <span>Acord Total</span>
      </div>
    </div>
  );
};