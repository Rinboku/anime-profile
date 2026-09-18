import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Am mărit lățimea maximă la max-w-7xl pentru a se întinde mult mai mult spre margini */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

        {/* SECTIUNEA 1: Profesoara coordonator (Poza în DREAPTA, Textul în STÂNGA) */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          
          {/* Partea Stângă: Nume și Text (se întinde pe toată lățimea disponibilă) */}
          <div 
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
            className="flex-1 space-y-4 text-red-600 font-medium text-lg italic leading-relaxed text-left"
          >
            <h2 
              style={{ fontFamily: "'GrumpfhFont', sans-serif" }}
              className="text-3xl font-bold not-italic text-gray-800 tracking-wider mb-2"
            >
              ELENA STANCULESCU, PHD
            </h2>
            <p>
              Professor Elena Stănculescu, PhD, is a prominent figure in the Romanian academic landscape, serving within the Faculty of Psychology and Educational Sciences at the University of Bucharest. Marked by scientific rigor, pedagogical excellence, and strong international outreach, her career has made essential contributions to the advancement of modern psychological research in Romania.
            </p>
            <p>
              Her academic trajectory is anchored by her doctoral degree in psychology, obtained in 2001, and her habilitation degree with a thesis focused on modern perspectives in positive and educational psychology. Currently, she serves as a doctoral supervisor in psychology, guiding generations of young researchers through complex areas such as educational psychology, developmental psychology, social psychology, and positive psychology.
            </p>
            <p>
              Her scientific research centers on highly relevant topics in mental health and human adaptation, including psychological well-being, behavioral addictions, emotional regulation, stress, burnout, cyberbullying, and social cognition. She also integrates advanced psychometric analyses into her work, investigating psychosocial risk factors and the correlations between personality traits and behavioral outcomes.
            </p>
            <p>
              On the international stage, her expertise is recognized through her role as the country representative for Romania within the European Network for Positive Psychology (ENPP) and her membership in prestigious organizations like the International School Psychology Association (ISPA) and the European Association for Research on Adolescence (EARA). A major highlight of her editorial leadership is her role as Executive Editor for the International Journal of Mental Health and Addiction (published by Springer), alongside her position on the editorial board of the Romanian Academy's Journal of Psychology.
            </p>
            <p>
              In her teaching activities at the University of Bucharest, she has introduced innovative master's and undergraduate courses, such as Applied Positive Psychology in Education, Introduction to Mental Health and Well-being, Emotional Intelligence in Childhood and Adolescence, and Stress Management. Her dedication to students and teaching quality earned her the national &quot;Bologna Professor&quot; distinction awarded by the National Alliance of Student Organizations in Romania (ANOSR). Through numerous authored volumes, dozens of articles in high-impact international journals, and active engagement in research projects, Professor Elena Stănculescu remains a pillar of professionalism and a source of inspiration for the academic community.
            </p>
          </div>

          {/* Partea Dreaptă: Poză și Email sub ea */}
          <div className="flex flex-col items-center shrink-0 space-y-6 md:sticky md:top-10">
            <div className="w-56 h-56 rounded-full overflow-hidden bg-gray-100 border-4 border-red-600 flex items-center justify-center shadow-md">
              <span className="text-gray-400 text-sm font-sans"> </span>
            </div>
            <a
              href="mailto:elena.stanculescu@fpse.unibuc.ro"
              className="inline-block px-6 py-3 border-2 border-red-600 rounded-lg text-red-600 font-bold uppercase tracking-widest text-sm hover:bg-red-600 hover:text-white transition text-center shadow-sm"
            >
              elena.stanculescu@fpse.unibuc.ro
            </a>
          </div>

        </div>

        <div className="border-t border-gray-200" />

        {/* SECTIUNEA 2: Despre mine (Poza în STÂNGA, Textul în DREAPTA - alternativ, sau cum preferi) */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          
          {/* Partea Stângă: Poză și Email sub ea */}
          <div className="flex flex-col items-center shrink-0 space-y-6 md:sticky md:top-10">
            <div className="w-56 h-56 rounded-full overflow-hidden bg-gray-100 border-4 border-red-600 flex items-center justify-center shadow-md">
              <span className="text-gray-400 text-sm font-sans"></span>
            </div>
            <a
              href="mailto:mirelvalentincoca@gmail.com"
              className="inline-block px-6 py-3 border-2 border-red-600 rounded-lg text-red-600 font-bold uppercase tracking-widest text-sm hover:bg-red-600 hover:text-white transition text-center shadow-sm"
            >
              mirelvalentincoca@gmail.com
            </a>
          </div>

          {/* Partea Dreaptă: Nume și Text */}
          <div 
            style={{ fontFamily: "'Times New Roman', Times, serif" }}
            className="flex-1 space-y-4 text-red-600 font-medium text-lg italic leading-relaxed text-left"
          >
            <h2 
              style={{ fontFamily: "'GrumpfhFont', sans-serif" }}
              className="text-3xl font-bold not-italic text-gray-800 tracking-wider mb-2"
            >
              MIREL VALENTIN COCA
            </h2>
            <p>
              An interdisciplinary researcher and developer bridging the worlds of psychological science, quantitative psychometrics, and digital subcultures. Currently pursuing doctoral research at the University of Bucharest, the work centers on a multimethod approach to otaku culture, media psychology, narrative identity, and digital addictions. Passionate about mapping personality traits, emotion regulation, and psychological constructs across rich anime and manga universes to better understand how modern media shapes human behavior and connection.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}