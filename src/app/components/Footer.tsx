export default function Footer() {
  return (
    <footer className="bg-red-600 text-white p-6 mt-auto w-full border-t-2 border-white/20">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Păstrăm DOAR secțiunea de Copyright conform imaginii image_a243aa.png */}
        <div 
          style={{ 
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "12pt" 
          }}
          className="flex flex-col items-center gap-1"
        >
          <p className="opacity-80">© 2026 Copyright</p>
          <p className="font-bold tracking-wide">Developed by Mirel Valentin Coca</p>
        </div>

      </div>
    </footer>
  );
}

