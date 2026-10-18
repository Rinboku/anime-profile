export default function Footer() {
  return (
    <footer className="bg-red-600 text-white px-4 pt-6 pb-28 md:p-6 mt-auto w-full border-t-2 border-white/20">
      <div className="max-w-5xl mx-auto text-center">
        <div
          style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "12pt" }}
          className="flex flex-col items-center gap-1 break-words"
        >
          <p className="opacity-80">© 2026 Copyright</p>
          <p className="font-bold tracking-wide">Developed by Mirel Valentin Coca</p>
        </div>
      </div>
    </footer>
  );
}
