import AnimeCarousel from './components/AnimeCarousel';
 
export default function Home() {
  return (
    // layout.tsx are deja <main> și <Footer />, deci aici folosim un simplu <div>
    <div className="bg-white">
 
      {/* Secțiunea de bun venit */}
      <section className="px-4 py-8 md:py-12 text-center">
        <h1 className="text-red-600 text-3xl sm:text-4xl md:text-5xl font-['GrumpfhFont'] mb-2 uppercase break-words">
          Welcome to Anime Profile!
        </h1>
        <p className="text-gray-800 text-base sm:text-lg md:text-xl font-['GrumpfhFont'] uppercase break-words">
          Come and see which anime character you are!
        </p>
      </section>
 
      <div className="w-full">
        <AnimeCarousel />
      </div>
 
    </div>
  );
}
