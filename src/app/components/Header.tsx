import Link from 'next/link';
import Image from 'next/image';
 
const navGroup =
  'flex flex-wrap items-center justify-center gap-x-5 gap-y-1 md:gap-8 font-bold text-gray-800 text-sm sm:text-base md:text-lg';
 
export default function Header() {
  return (
    <header className="bg-white border-b-4 border-red-600 shadow-sm">
      {/* Telefon: logo sus, linkurile dedesubt, centrate. Desktop: 3 coloane pe un rând, ca înainte. */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
 
        {/* CENTRU (primul pe telefon) */}
        <Link href="/" className="order-first md:order-none shrink-0 flex items-center">
          <Image
            src="/images/Profiles/Logo_Profiles/central-logo_edited.png"
            alt="Anime Profile"
            width={160}
            height={60}
            priority
            className="w-32 md:w-40 h-auto max-w-full"
          />
        </Link>
 
        {/* STÂNGA */}
        <div style={{ fontFamily: "'GrumpfhFont', sans-serif" }} className={`${navGroup} md:order-first`}>
          <Link href="/contact" className="hover:text-red-600 transition whitespace-nowrap">
            CONTACT US
          </Link>
          <Link href="/about" className="hover:text-red-600 transition whitespace-nowrap">
            ABOUT ANIME PROFILE
          </Link>
        </div>
 
        {/* DREAPTA */}
        <div style={{ fontFamily: "'GrumpfhFont', sans-serif" }} className={`${navGroup} md:order-last`}>
          <Link href="/disclaimer" className="hover:text-red-600 transition whitespace-nowrap">
            DISCLAIMER
          </Link>
          <Link href="/anime-trivia" className="hover:text-red-600 transition whitespace-nowrap">
            ANIME TRIVIA
          </Link>
        </div>
 
      </div>
    </header>
  );
}
