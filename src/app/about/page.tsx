import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Titlul proiectului */}
        <h1 className="text-red-600 text-5xl font-['GrumpfhFont'] text-center mb-16">
          ABOUT THIS PROJECT
        </h1>

        {/* Layout: imagine stânga / text dreapta */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

          {/* STÂNGA: imaginea All Stars */}
          <div className="w-full md:w-2/5 shrink-0">
            <Image
              src="/images/All_Stars.jpg"
              alt="Anime All Stars"
              width={600}
              height={900}
              className="object-contain w-full h-auto rounded-lg"
              priority
            />
          </div>

          {/* DREAPTA: descrierea motivațională + științifică */}
          <div className="w-full md:w-3/5 space-y-6 text-red-600 font-medium text-lg italic leading-relaxed text-left">
            <p>
              This study is conducted at the University of Bucharest as part of the PhD research of Mirel Valentin Coca.
            </p>
            <p>
              The world of anime is defined by its unique aesthetics, exceptional storytelling, and unforgettable characters. As an anime fan myself, I&apos;ve always wanted to contribute to increasing the recognition of anime and highlighting its impact on the lives of its fans. Being part of this community, this project brings me a great deal of joy and excitement.
            </p>
            <p>
              The goal of this platform is to help every fan discover which character they resonate with most—measured through a scientific, psychologically grounded approach.
            </p>
            <p>
              Have fun exploring and finding your anime match! You&apos;ll discover a curated selection of 40 anime series and over 1,000 characters, so the possibilities are truly endless.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}