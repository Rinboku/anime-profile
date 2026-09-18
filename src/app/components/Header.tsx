import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white border-b-4 border-red-600 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        
        {/* STÂNGA */}
        <div
          style={{ fontFamily: "'GrumpfhFont', sans-serif" }}
          className="flex items-center gap-8 font-bold text-gray-800 text-lg"
        >
          <Link href="/contact" className="hover:text-red-600 transition">
            CONTACT US
          </Link>
          <Link href="/about" className="hover:text-red-600 transition px-2 py-1">
            ABOUT ANIME PROFILE
          </Link>
        </div>

        {/* CENTRU */}
        <Link href="/" className="shrink-0 flex items-center">
          <Image
            src="/images/Profiles/Logo_Profiles/central-logo_edited.png"
            alt="Anime Profile"
            width={160}
            height={60}
            priority
          />
        </Link>

        {/* DREAPTA */}
        <div
          style={{ fontFamily: "'GrumpfhFont', sans-serif" }}
          className="flex items-center gap-8 font-bold text-gray-800 text-lg"
        >
          <Link href="/disclaimer" className="hover:text-red-600 transition">
            DISCLAIMER
          </Link>
          <Link href="/anime-trivia" className="hover:text-red-600 transition">
            ANIME TRIVIA
          </Link>
        </div>

      </div>
    </header>
  );
}