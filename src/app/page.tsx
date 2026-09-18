
import Footer from './components/Footer';
import AnimeCarousel from './components/AnimeCarousel';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
    

      {/* 2. Secțiunea de bun venit stilizată */}
      <div className="py-12 text-center">
        <h1 className="text-red-600 text-5xl font-['GrumpfhFont'] mb-2 uppercase">
          Welcome on Anime Profile!
        </h1>
        <p className="text-gray-800 text-xl font-['GrumpfhFont'] uppercase">
          Come and see which anime character are you!
        </p>
      </div>

      
      <div className="w-full">
        <AnimeCarousel/>
      </div>

      
     
    </main>
  );
}
