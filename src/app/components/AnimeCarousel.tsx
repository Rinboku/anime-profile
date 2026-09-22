'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
 
//---------Anime Quiz--------------------------//
import AttackOnTitanQuiz, { AoT_IMAGES } from './anime/Attack_On_Titan';
import BlackCloverQuiz, { Black_Clover_IMAGES } from './anime/Black_Clover';
import BleachQuiz, { BLEACH_IMAGES } from './anime/Bleach';
import BlueExorcistQuiz, { Blue_Exorcist_IMAGES } from './anime/Blue_Exorcist';
import ChainSawManQuiz, { ChainSaw_IMAGES } from './anime/ChainSaw_Man';
import CodeGeassQuiz, { Code_Geass_IMAGES } from './anime/Code_Geass';
import DeathNoteQuiz, { Death_Note_IMAGES } from './anime/Death_Note';
import DemonSlayerQuiz, { Demon_Slayer_IMAGES } from './anime/Demon_Slayer';
import DrStoneQuiz, { Dr_Stone_IMAGES } from './anime/Dr_Stone';
import DragonBallSuperQuiz, { DRAGON_BALL_IMAGES } from './anime/DragonBall_Super';
import FairyTailQuiz, { Fairy_Tail_IMAGES } from './anime/Fairy_Tail';
import FoodWarsQuiz, { Food_Wars_IMAGES } from './anime/Food_Wars';
import FreirenQuiz, { Freiren_Beyond_IMAGES } from './anime/Freiren_Beyond_Journey_End';
import FullmetalQuiz, { Fullmetal_Alchemist_IMAGES } from './anime/Fullmetal_Alchemist_Brotherhood';
import HaikyuuQuiz, { HAIKYUU_IMAGES } from './anime/Haikyuuu';
import HunterXHunterQuiz, { HUNTER_X_HUNTER_IMAGES } from './anime/Hunter_X_Hunter';
import InuyashaQuiz, { INUYASHA_IMAGES } from './anime/Inuyashs';
import JojoQuiz, { JOJO_IMAGES } from './anime/Jojo_Bizzare_Adventure';
import JujutsuKaisenQuiz, { JUJUTSU_KAISEN_IMAGES } from './anime/Jujutsu_Kaisen';
import KurokoNoBasketQuiz, { KUROKO_NO_BASKET_IMAGES } from './anime/Kuroko_No_Basket';
import MobPsychoQuiz, { MOB_PSYCHO_IMAGES } from './anime/Mob_Psycho_100';
import MonsterQuiz, { Monster_IMAGES } from './anime/Monster';
import MushokuTenseiQuiz, { Mushoku_Tensei_IMAGES } from './anime/Mushoku_Tensei';
import MyHeroAcademiaQuiz, { My_Hero_Academia_IMAGES } from './anime/My_Hero_Academia';
import NarutoQuiz, { Naruto_Shippuden_IMAGES } from './anime/Naruto_Shippuden';
import OnePieceQuiz, { ONE_PIECE_IMAGES } from './anime/One_Piece';
import OnePunchManQuiz, { ONE_PUNCH_MAN_IMAGES } from './anime/One_Punch_Man';
import OshiNoKoQuiz, { OSHI_NO_KO_IMAGES } from './anime/Oshi_No_Oko';
import ParasyteTheMaximQuiz, { PARASYTE_IMAGES } from './anime/Parasyte_The_Maxim';
import PsychoPassQuiz, { PSYCHOPASS_IMAGES } from './anime/Psycho_Pass';
import ReZeroQuiz, { Re_Zero_IMAGES } from './anime/Re_Zero';
import SoloLevelingQuiz, { SOLO_LEVELLING_IMAGES } from './anime/Solo_Levelling';
import SpyXFamilyQuiz, { SPY_X_FAMILY_IMAGES } from './anime/Spy_X_Family';
import SteinsGateQuiz, { STEINS_GATE_IMAGES } from './anime/Steins_Gate';
import SwordArtOnlineQuiz, { SWORD_ART_ONLINE_IMAGES } from './anime/Sword_Art_Online';
import TheApothecaryDiariesQuiz, { APOTHECARY_DIARIES_IMAGES } from './anime/The_Apothecary_Diaries';
import ThePromisedNeverlandQuiz, { PROMISED_IMAGES } from './anime/The_Promised_Neverland';
import TheSevenDeadlySinsQuiz, { SEVEN_DEADLY_IMAGES } from './anime/The_Seven_Deadly_Sins';
import TokyoGhoulQuiz, { TOKYO_IMAGES } from './anime/Tokyo_Ghoul';
import VinlandSagaQuiz, { VINLAND_IMAGES } from './anime/Vinland_Saga';
import { useCharacterMatch } from '@/hooks/useCharacterMatch';
import { CharacterMatchModal } from './CharacterMatchModal';
 
const ALL_DEMO_IMAGES: Record<string, Record<number, string>> = {
  'Attack on Titan':               AoT_IMAGES,
  'Black Clover':                  Black_Clover_IMAGES,
  'BLEACH':                        BLEACH_IMAGES,
  'Blue Exorcist':                 Blue_Exorcist_IMAGES,
  'Chainsaw Man':                  ChainSaw_IMAGES,
  'Code Geass':                    Code_Geass_IMAGES,
  'Death Note':                    Death_Note_IMAGES,
  'Demon Slayer':                  Demon_Slayer_IMAGES,
  'Dr.STONE':                      Dr_Stone_IMAGES,
  'Dragon Ball Super':             DRAGON_BALL_IMAGES,
  'Fairy Tail':                    Fairy_Tail_IMAGES,
  'Food Wars!':                    Food_Wars_IMAGES,
  "Frieren: Beyond Journey's End": Freiren_Beyond_IMAGES,
  'Fullmetal Alchemist':           Fullmetal_Alchemist_IMAGES,
  'Haikyuu!':                      HAIKYUU_IMAGES,
  'Hunter X Hunter':               HUNTER_X_HUNTER_IMAGES,
  'Inuyasha':                      INUYASHA_IMAGES,
  'Jojo Bizarre Adventure':        JOJO_IMAGES,
  'Jujutsu Kaisen':                JUJUTSU_KAISEN_IMAGES,
  'Kuroko no Basket':              KUROKO_NO_BASKET_IMAGES,
  'Mob Psycho 100':                MOB_PSYCHO_IMAGES,
  'Monster':                       Monster_IMAGES,
  'Mushoku Tensei':                Mushoku_Tensei_IMAGES,
  'My Hero Academia':              My_Hero_Academia_IMAGES,
  'Naruto Shippuden':              Naruto_Shippuden_IMAGES,
  'One Piece':                     ONE_PIECE_IMAGES,
  'One Punch Man':                 ONE_PUNCH_MAN_IMAGES,
  'Oshi No Ko':                    OSHI_NO_KO_IMAGES,
  'Parasyte The Maxim':            PARASYTE_IMAGES,
  'Psycho Pass':                   PSYCHOPASS_IMAGES,
  'Re:Zero':                       Re_Zero_IMAGES,
  'Solo Leveling':                 SOLO_LEVELLING_IMAGES,
  'Spy X Family':                  SPY_X_FAMILY_IMAGES,
  'Steins;Gate':                   STEINS_GATE_IMAGES,
  'Sword Art Online':              SWORD_ART_ONLINE_IMAGES,
  'The Apothecary Diaries':        APOTHECARY_DIARIES_IMAGES,
  'The Promised Neverland':        PROMISED_IMAGES,
  'The Seven Deadly Sins':         SEVEN_DEADLY_IMAGES,
  'Tokyo Ghoul':                   TOKYO_IMAGES,
  'Vinland Saga':                  VINLAND_IMAGES,
};
 
const slides = [
  { id: 1,  title: "Naruto Shippuden",             description: "Follow Naruto Uzumaki's transformative journey upon his return to the Hidden Leaf Village.",                                                                image: "/images/Naruto_Imagine_Site.png",                  bgColor: "bg-[#0B1218]",  textColor: "text-white",     descColor: "text-gray-300"   },
  { id: 2,  title: "Demon Slayer",                  description: "It is the Taisho Period in Japan. Tanjiro finds his family slaughtered by a demon.",                                                                       image: "/images/Demon_Slayer_Intro.jpg",                   bgColor: "bg-[#081412]",  textColor: "text-white",     descColor: "text-gray-300"   },
  { id: 3,  title: "One Piece",                     description: "Monkey D. Luffy refuses to let anyone stand in the way of his quest to become king of all pirates.",                                                       image: "/images/One_Piece_Site.jpg",                       bgColor: "bg-[#1A110D]",  textColor: "text-white",     descColor: "text-gray-300"   },
  { id: 4,  title: "Kuroko no Basket",              description: "Tetsuya Kuroko, the phantom sixth member of the Generation of Miracles, joins Seirin High.",                                                               image: "/images/Kuroko_Basket_Intro.jpg",                  bgColor: "bg-[#1C0F0B]",  textColor: "text-white",     descColor: "text-gray-300"   },
  { id: 5,  title: "Fairy Tail",                    description: "The story follows a teenage girl named Lucy Heartfilla who is determined to join the Fairy Tail Guild.",                                                    image: "/images/Fairy_Tail_Site.png",                      bgColor: "bg-[#0E0B1A]",  textColor: "text-white",     descColor: "text-gray-300"   },
  { id: 6,  title: "Attack on Titan",               description: "After a Colossal Titan destroys his home, Eren Jaeger joins the Scout Regiment.",                                                                          image: "/images/Attack_On_Titan.jpg",                      bgColor: "bg-[#0F172A]",  textColor: "text-white",     descColor: "text-gray-300"   },
  { id: 7,  title: "Jujutsu Kaisen",                description: "Although born with tremendous power, Itadori Yuji lives a completely ordinary life.",                                                                      image: "/images/Jujutsu_Kaisen_Site.jpg",                  bgColor: "bg-[#F5E6C4]",  textColor: "text-black",     descColor: "text-[#1E293B]"  },
  { id: 8,  title: "BLEACH",                        description: "BLEACH follows the story of Ichigo Kurosaki. When Ichigo meets Rukia he finds his life is changed forever.",                                               image: "/images/Bleach_Site.jpg",                          bgColor: "bg-[#0A0E14]",  textColor: "text-white",     descColor: "text-[#CBD5E1]"  },
  { id: 9,  title: "My Hero Academia",              description: "Izuku has dreamt of being a hero all his life in a world where eighty percent of the population has a quirk.",                                             image: "/images/My_Hero_Academia_Site.jpg",                bgColor: "bg-[#FFD700]",  textColor: "text-black",     descColor: "text-slate-800"  },
  { id: 10, title: "Death Note",                    description: "Light Yagami is an ace student who finds the Death Note, a notebook dropped by a rogue Shinigami death god.",                                              image: "/images/Death_Note_Site.jpg",                      bgColor: "bg-[#0D0D0D]",  textColor: "text-white",     descColor: "text-[#CBD5E1]"  },
  { id: 11, title: "Fullmetal Alchemist",           description: "Disregard for alchemy's laws ripped half of Ed Elric's limbs from his body. The brothers seek the Philosopher's Stone.",                                  image: "/images/Fullmetal_Alchemist_Brotherhood_Site.jpg", bgColor: "bg-[#2C241B]",  textColor: "text-[#E2E8F0]", descColor: "text-[#E2E8F0]"  },
  { id: 12, title: "Monster",                       description: "Tenma, a brilliant neurosurgeon, risks his career to save a young boy. The boy reappears 9 years later in the midst of serial murders.",                  image: "/images/Monster_Site.jpg",                         bgColor: "bg-[#0F0F12]",  textColor: "text-[#E2E8F0]", descColor: "text-[#94A3B8]"  },
  { id: 13, title: "Dragon Ball Super",             description: "After 18 years, we have the newest Dragon Ball story. With Majin Buu defeated, Goku has taken a completely new role as a radish farmer.",                 image: "/images/Dragon_Ball_Super_Image.jpg",              bgColor: "bg-[#15305B]",  textColor: "text-[#F1F5F9]", descColor: "text-[#FFE0B2]"  },
  { id: 14, title: "Hunter X Hunter",               description: "Gon, a young boy who lives on Whale Island, dreams of becoming a Hunter like his father.",                                                                 image: "/images/Hunter_X_Hunter.jpg",                      bgColor: "bg-[#D7C3A4]",  textColor: "text-[#BE2328]", descColor: "text-[#076C39]"  },
  { id: 15, title: "Solo Leveling",                 description: "They say whatever doesn't kill you makes you stronger. Sung Jinwoo came back with the System after being brutally slaughtered.",                           image: "/images/Solo_Levelling.jpg",                       bgColor: "bg-[#0B0914]",  textColor: "text-[#22D3EE]", descColor: "text-[#D8B4FE]"  },
  { id: 16, title: "Sword Art Online",              description: "In the near future, a VRMMORPG called Sword Art Online has been released where players control their avatars with their bodies.",                          image: "/images/Sword_Art_Online.jpg",                     bgColor: "bg-[#1A2E40]",  textColor: "text-[#E2EFFE]", descColor: "text-[#F3B05C]"  },
  { id: 17, title: "Tokyo Ghoul",                   description: "Haise Sasaki has been tasked with teaching Qs Squad how to be outstanding investigators.",                                                                 image: "/images/Tokyo_Ghoul.jpg",                          bgColor: "bg-[#0D1F22]",  textColor: "text-[#FFFFFF]", descColor: "text-[#BA262B]"  },
  { id: 18, title: "Chainsaw Man",                  description: "Denji is a young boy who works as a Devil Hunter with the Chainsaw Devil Pochita.",                                                                        image: "/images/Chainsaw_Man.jpg",                         bgColor: "bg-[#1C242C]",  textColor: "text-[#F8FAFC]", descColor: "text-[#9E1B1B]"  },
  { id: 19, title: "Spy X Family",                  description: "World peace is at stake and secret agent Twilight must pretend to be a family man.",                                                                       image: "/images/Spy_X_Family.jpg",                         bgColor: "bg-[#2F433A]",  textColor: "text-[#D4A34F]", descColor: "text-[#A83232]"  },
  { id: 20, title: "Black Clover",                  description: "The series focuses on Asta, a young orphan born without magic in a world where everyone has it.",                                                          image: "/images/Black_Clover.jpg",                         bgColor: "bg-[#15161A]",  textColor: "text-[#E5C158]", descColor: "text-[#D2C4B1]"  },
  { id: 21, title: "One Punch Man",                 description: "Saitama is the strongest hero you've never heard of. After three years of training, he can defeat enemies with one punch.",                                image: "/images/One_Punch_Man.jpg",                        bgColor: "bg-[#2E0B0B]",  textColor: "text-[#FFCC00]", descColor: "text-[#E2E8F0]"  },
  { id: 22, title: "Frieren: Beyond Journey's End", description: "After the party of heroes defeated the Demon King, the elven mage Frieren comes face to face with humanity's mortality.",                                  image: "/images/Frieren.jpg",                              bgColor: "bg-[#0B1E28]",  textColor: "text-[#E0F2FE]", descColor: "text-[#E3C185]"  },
  { id: 23, title: "The Seven Deadly Sins",         description: "The Seven Deadly Sins are a band of knights in the land of Britannia who had disbanded ten years earlier.",                                                image: "/images/Seven_Deadly_Sins.jpg",                    bgColor: "bg-[#140C1F]",  textColor: "text-[#D92323]", descColor: "text-[#F6C753]"  },
  { id: 24, title: "Vinland Saga",                  description: "Around the end of the millennium, Thorfinn, the son of the greatest warrior, lived his childhood in the battlefield.",                                     image: "/images/Vinland_Saga.jpg",                         bgColor: "bg-[#110D0D]",  textColor: "text-[#9E1616]", descColor: "text-[#D1C2A5]"  },
  { id: 25, title: "Jojo Bizarre Adventure",        description: "In 1983 Dio, the vampiric enemy of Jonathan Joestar, emerges from the Atlantic Ocean. Dio develops a Stand.",                                             image: "/images/Jojo.jpg",                                 bgColor: "bg-[#0F0F13]",  textColor: "text-[#F43F93]", descColor: "text-[#EAB308]"  },
  { id: 26, title: "Steins;Gate",                   description: "Steins;Gate follows an eclectic group who have the ability to send text messages to the past.",                                                            image: "/images/Steins_Gate.jpg",                          bgColor: "bg-[#0E1927]",  textColor: "text-[#38BDF8]", descColor: "text-[#FDE047]"  },
  { id: 27, title: "Code Geass",                    description: "Lelouch Lamperouge, an exiled Britannian prince, encounters a strange girl known as C.C.",                                                                 image: "/images/Code_Geass.jpg",                           bgColor: "bg-[#1E1C1A]",  textColor: "text-[#E6C687]", descColor: "text-[#A1B98B]"  },
  { id: 28, title: "Re:Zero",                       description: "Subaru, lost in a new world, meets a silver-haired girl who saves him.",                                                                                   image: "/images/RE_ZERO.jpg",                              bgColor: "bg-[#2A1B35]",  textColor: "text-[#A855F7]", descColor: "text-[#FBCFE8]"  },
  { id: 29, title: "Haikyuu!",                      description: "Hinata is inspired to create a volleyball team in his last year of middle school.",                                                                        image: "/images/Haikyuu.jpg",                              bgColor: "bg-[#0B1E36]",  textColor: "text-[#F97316]", descColor: "text-[#38BDF8]"  },
  { id: 30, title: "Mob Psycho 100",                description: "Kageyama Shigeo is a powerful esper determined to live a normal life with his ESP suppressed.",                                                            image: "/images/Mob_Psycho.jpg",                           bgColor: "bg-[#110D24]",  textColor: "text-[#EC4899]", descColor: "text-[#4ADE80]"  },
  { id: 31, title: "Inuyasha",                      description: "Kagome Higurashi gets pulled into an ancient well by a demon, bringing her 500 years in the past.",                                                        image: "/images/Inuyasha.jpg",                             bgColor: "bg-[#1E1311]",  textColor: "text-[#DC2626]", descColor: "text-[#FCD34D]"  },
  { id: 32, title: "Dr.STONE",                      description: "Modern society is lost when a mysterious light turns humanity to stone. Senku and Taiju awaken in an overgrown world.",                                    image: "/images/Dr_Stone.jpg",                             bgColor: "bg-[#1E0A05]",  textColor: "text-[#F97316]", descColor: "text-[#22D3EE]"  },
  { id: 33, title: "Blue Exorcist",                 description: "Assiah, the realm of humans, and Gehenna, the realm of demons. Rin Okumura discovers he is the son of Satan.",                                            image: "/images/Blue_Exorcist.jpg",                        bgColor: "bg-[#0B172A]",  textColor: "text-[#38BDF8]", descColor: "text-[#FBCFE8]"  },
  { id: 34, title: "Oshi No Ko",                    description: "Dr. Gorou Amamiya is shocked when a pregnant star appears at his countryside clinic.",                                                                     image: "/images/Oshi_No_Ko.jpg",                           bgColor: "bg-[#20031E]",  textColor: "text-[#F43F5E]", descColor: "text-[#38BDF8]"  },
  { id: 35, title: "Mushoku Tensei",                description: "When a 34-year-old underachiever gets run over by a truck, he is reincarnated in a new world as an infant.",                                              image: "/images/Mushoku_Tensei.jpg",                       bgColor: "bg-[#151118]",  textColor: "text-[#F59E0B]", descColor: "text-[#38BDF8]"  },
  { id: 36, title: "The Promised Neverland",        description: "The one adored as the mother is not the real parent. The Gracefield House is where orphaned children live.",                                               image: "/images/The Promised Neverland.jpg",               bgColor: "bg-[#0A0907]",  textColor: "text-[#FACC15]", descColor: "text-[#D97706]"  },
  { id: 37, title: "Parasyte The Maxim",            description: "They arrived in silence and darkness. Parasites must invade and take control of a human host to survive.",                                                 image: "/images/Parasyte_The Maxim.jpg",                   bgColor: "bg-[#0B1320]",  textColor: "text-[#EF4444]", descColor: "text-[#93C5FD]"  },
  { id: 38, title: "Psycho Pass",                   description: "In the future, thinking about a crime makes you guilty. Detectives work in teams made up of Enforcers and Inspectors.",                                   image: "/images/Psycho_Pass.jpg",                          bgColor: "bg-[#040D0A]",  textColor: "text-[#F8FAFC]", descColor: "text-[#10B981]"  },
  { id: 39, title: "Food Wars!",                    description: "Shokugeki no Soma centers on Yukihira Soma, determined to surpass his father's culinary skills.",                                                          image: "/images/Food_Wars.jpg",                            bgColor: "bg-[#161920]",  textColor: "text-[#DC2626]", descColor: "text-[#FBBF24]"  },
  { id: 40, title: "The Apothecary Diaries",        description: "At the heart of the story is Maomao, a clever young woman obsessed with medicine and poisons.",                                                            image: "/images/The_Apothecary_Diaries.jpg",               bgColor: "bg-[#0E132B]",  textColor: "text-[#10B981]", descColor: "text-[#FBBF24]"  },
];
 
interface QuizItem { id: string; text: string; }
interface Subscale { label: string; imageUrl?: string; scaleStart?: number; scaleEnd?: number; labels?: string[]; items: QuizItem[]; }
interface Episode { title: string; imageUrl?: string; subscales: Subscale[]; }
interface Arc { title: string; episodes: Episode[]; }
 
// ─────────────────────────────────────────────
// Reusable split-screen wrapper for all modal steps
// Left = image (40% desktop), Right = scrollable content (60% desktop)
// ─────────────────────────────────────────────
function ModalSplit({
  imageSrc,
  imageAlt,
  children,
  imageClass = "object-contain object-center",
}: {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  imageClass?: string;
}) {
  return (
    <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">
      {/* LEFT — imagine */}
      <div className="relative w-full md:w-1/2 h-48 md:h-full shrink-0 overflow-hidden bg-[#0b1016]">

        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={imageClass}
          priority
        />
      </div>

      {/* RIGHT — conținut */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
export default function AnimeCarousel() {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);

  const {
    isOpen: isMatchOpen,
    status: matchStatus,
    result: matchResult,
    errorMessage: matchError,
    runMatch,
    close: closeMatch,
  } = useCharacterMatch();
 
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [education, setEducation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [incomeSource, setIncomeSource] = useState('');
  const [financeFeel, setFinanceFeel] = useState('');
  const [isSingle, setIsSingle] = useState('');
  const [living, setLiving] = useState('');
  const [daily, setDaily] = useState('');
  const [religion, setReligion] = useState('');
  const [hasAffection, setHasAffection] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [averatewatchedepisodes, setWatchedEpisodes] = useState(1);
  const [watchNative, setWatchNative] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [gap, setGap] = useState('');
 
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
 
  useEffect(() => {
    if (!isModalOpen) {
      const timer = setInterval(nextSlide, 15000);
      return () => clearInterval(timer);
    }
  }, [isModalOpen]);
 
  const handleCloseModal = () => { setIsModalOpen(false); setQuizStep(0); };
 
  const activeSlide = slides[current];
  const DEMO_IMAGES: Record<number, string> = ALL_DEMO_IMAGES[activeSlide.title] ?? {};
  const isLight = activeSlide.textColor === 'text-black';
 
  const t = {
    bg:             activeSlide.bgColor,
    text:           activeSlide.textColor,
    subText:        activeSlide.descColor,
    btnPrimary:     isLight ? 'bg-zinc-950 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200',
    btnOutline:     isLight ? 'border-black/20 text-black hover:bg-black/5' : 'border-white/20 text-white hover:bg-white/5',
    headerBorder:   isLight ? 'border-black/10' : 'border-white/10',
    inputStyle:     isLight ? 'bg-black/10 border-2 border-black/20 text-black' : 'bg-white/10 border-2 border-white/20 text-white',
    closeBtn:       isLight ? 'bg-black text-white hover:bg-zinc-800 border-black' : 'bg-black/50 text-white hover:bg-red-600 border-white/10',
    demoBtnPrimary: isLight ? 'bg-black text-white font-black uppercase rounded-lg hover:scale-105 transition-transform' : 'bg-white text-black font-black uppercase rounded-lg hover:scale-105 transition-transform',
    demoBtnActive:  isLight ? 'bg-black text-white' : 'bg-white text-black',
    demoBtnInactive:isLight ? 'bg-black/10 text-black' : 'bg-white/10 text-white',
    fontFamily:     '"Poppins", system-ui, sans-serif',
    sliderAccent:   '#be123c'
  };
 
  // Shorthand pentru opțiunile de select — negru pe alb indiferent de temă
  const OPT = { color: '#000000', backgroundColor: '#ffffff' } as const;
 
const ANIME_QUIZ_MAP: Record<string, React.ComponentType<{ onFinish: (sessionId: string) => void; onBack: () => void; demographics?: Record<string, unknown> }>> = {
    'Naruto Shippuden':              NarutoQuiz,
    'Demon Slayer':                  DemonSlayerQuiz,
    'One Piece':                     OnePieceQuiz,
    'Kuroko no Basket':              KurokoNoBasketQuiz,
    'Fairy Tail':                    FairyTailQuiz,
    'Attack on Titan':               AttackOnTitanQuiz,
    'Jujutsu Kaisen':                JujutsuKaisenQuiz,
    'BLEACH':                        BleachQuiz,
    'My Hero Academia':              MyHeroAcademiaQuiz,
    'Death Note':                    DeathNoteQuiz,
    'Fullmetal Alchemist':           FullmetalQuiz,
    'Monster':                       MonsterQuiz,
    'Dragon Ball Super':             DragonBallSuperQuiz,
    'Hunter X Hunter':               HunterXHunterQuiz,
    'Solo Leveling':                 SoloLevelingQuiz,
    'Sword Art Online':              SwordArtOnlineQuiz,
    'Tokyo Ghoul':                   TokyoGhoulQuiz,
    'Chainsaw Man':                  ChainSawManQuiz,
    'Spy X Family':                  SpyXFamilyQuiz,
    'Black Clover':                  BlackCloverQuiz,
    'One Punch Man':                 OnePunchManQuiz,
    "Frieren: Beyond Journey's End": FreirenQuiz,
    'The Seven Deadly Sins':         TheSevenDeadlySinsQuiz,
    'Vinland Saga':                  VinlandSagaQuiz,
    'Jojo Bizarre Adventure':        JojoQuiz,
    'Steins;Gate':                   SteinsGateQuiz,
    'Code Geass':                    CodeGeassQuiz,
    'Re:Zero':                       ReZeroQuiz,
    'Haikyuu!':                      HaikyuuQuiz,
    'Mob Psycho 100':                MobPsychoQuiz,
    'Inuyasha':                      InuyashaQuiz,
    'Dr.STONE':                      DrStoneQuiz,
    'Blue Exorcist':                 BlueExorcistQuiz,
    'Oshi No Ko':                    OshiNoKoQuiz,
    'Mushoku Tensei':                MushokuTenseiQuiz,
    'The Promised Neverland':        ThePromisedNeverlandQuiz,
    'Parasyte The Maxim':            ParasyteTheMaximQuiz,
    'Psycho Pass':                   PsychoPassQuiz,
    'Food Wars!':                    FoodWarsQuiz,
    'The Apothecary Diaries':        TheApothecaryDiariesQuiz,
  };
 
  return (
    <div className={`relative w-full h-[600px] ${activeSlide.bgColor} transition-colors duration-1000 overflow-hidden group`}>
 
      {/* ── Arrows ── */}
      <button onClick={(e) => { e.preventDefault(); prevSlide(); }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full border border-red-600 bg-transparent text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 cursor-pointer"
        aria-label="Previous slide">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button onClick={(e) => { e.preventDefault(); nextSlide(); }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full border border-red-600 bg-transparent text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 cursor-pointer"
        aria-label="Next slide">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
 
      {/* ── Carousel body ── */}
      <div className="flex h-full w-full flex-col md:flex-row">
        <div className="flex flex-1 flex-col justify-start pt-20 px-12 md:px-24 z-20">
          <h2 className={`text-3xl md:text-5xl font-serif ${activeSlide.textColor} mb-4 tracking-tight leading-tight transition-colors duration-500`}>
            {activeSlide.title}
          </h2>
          <p className={`max-w-md text-base md:text-lg font-serif italic ${activeSlide.descColor} mb-8 leading-relaxed line-clamp-6 transition-colors duration-500`}>
            &quot;{activeSlide.description}&quot;
          </p>
          <button onClick={() => setIsModalOpen(true)}
            className="w-fit bg-red-600 hover:bg-red-700 text-white px-10 py-3.5 font-bold uppercase tracking-widest text-[10px] transition-all hover:scale-105 shadow-xl">
            Take a Quiz
          </button>
        </div>
        <div className="relative flex-1 h-full bg-[#141414] flex justify-center items-center overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent z-10 hidden md:block" />
          <div className="relative w-full h-[90%] p-6 transition-transform duration-700 group-hover:scale-105">
            <Image src={activeSlide.image} alt={activeSlide.title} fill className="object-contain" priority sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </div>
 
      {/* ══════════════════════ MODAL ══════════════════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={handleCloseModal} />
 
          <div
  className={`relative w-full max-w-7xl h-[88vh] rounded-2xl overflow-hidden ${t.bg} border ${isLight ? 'border-black/20' : 'border-white/10'}`}
  style={{ fontFamily: t.fontFamily }}
>
 
            {/* Close */}
            <button onClick={handleCloseModal}
              className={`absolute top-5 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-colors border ${t.closeBtn}`}>
              ✕
            </button>
 
            {/* ── STEP 0: Informed Consent ── */}
            {quizStep === 0 && (
              <ModalSplit imageSrc={DEMO_IMAGES[0] ?? activeSlide.image} imageAlt={activeSlide.title} imageClass="object-contain object-center">
                <div className="p-8 md:p-12 flex flex-col justify-between h-full">
                  <div>
                    <span className={`font-bold uppercase tracking-widest text-[10px] ${t.subText}`}>Research Protocol</span>
                    <h3 className={`font-serif text-3xl font-black mt-1 uppercase ${t.text}`}>Informed Consent</h3>
                    <div className={`w-12 h-1 mt-4 ${isLight ? 'bg-zinc-900' : 'bg-white/40'}`} />
                    <div className={`space-y-4 font-serif text-lg mt-6 ${t.subText}`}>
                      <p>This academic research aims to evaluate interaction and psychological impact among the digital culture enthusiast community. Your participation involves completing structured anonymous questionnaires.</p>
                      <p>All collected information is confidential, secure, and used strictly for scientific and statistical purposes. You may withdraw from the study at any time.</p>
                    </div>
                  </div>
                  <div className={`mt-8 p-6 rounded-xl border-2 ${isLight ? 'bg-black/5 border-dashed border-black' : 'bg-white/5 border-white/10'}`}>
                    <h4 className={`text-xl font-bold mb-4 ${t.text}`}>Are you at least 18 years old?</h4>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={() => setQuizStep(1)} className={`flex-1 py-3.5 px-6 font-bold uppercase tracking-widest text-[11px] rounded-md ${t.btnPrimary}`}>Yes, I am 18 years old</button>
                      <button onClick={() => setQuizStep(99)} className={`flex-1 py-3.5 px-6 font-bold uppercase tracking-widest text-[11px] rounded-md border-2 ${t.btnOutline}`}>No, I am not 18 years old.</button>
                    </div>
                  </div>
                </div>
              </ModalSplit>
            )}
 
            {/* ── STEP 1: Immersion Intro ── */}
            {quizStep === 1 && (
              <ModalSplit imageSrc={DEMO_IMAGES[1] ?? activeSlide.image} imageAlt={activeSlide.title}>
                <div className={`p-8 md:p-12 flex flex-col justify-between h-full ${t.text}`}>
                  <div>
                    <div className="text-center mb-10 mt-4">
                      <span className="font-bold uppercase tracking-[0.3em] text-[10px] opacity-60 block mb-2">Chapter 1</span>
                      <h3 className="font-serif text-3xl font-black uppercase tracking-widest">- RECKONING -</h3>
                    </div>
                    <div className="space-y-6 max-w-xl mx-auto font-serif text-lg leading-relaxed text-center">
                      <p className="font-medium opacity-90">Welcome to the psychological deep-dive of <strong>{activeSlide.title}</strong>. Before you proceed to the undergo your journey in order to know which character are, take a moment to sync with the weight of your experiences inside this specific narrative.</p>
                      <p className="italic opacity-80 pt-2">Every choice, bond, and existential question explored in this universe has shaped your journey.</p>
                    </div>
                  </div>
                  <div className={`flex justify-between items-center mt-12 pt-8 border-t max-w-xl mx-auto w-full ${t.headerBorder}`}>
                    <button onClick={() => setQuizStep(0)} className={`px-8 py-3 font-bold uppercase tracking-widest text-[11px] border-2 rounded-lg transition-all ${t.btnOutline}`}>Back</button>
                    <button onClick={() => setQuizStep(2)} className="bg-[#be123c] hover:bg-[#9f1239] text-white px-10 py-4 font-bold uppercase tracking-widest text-[11px] rounded-lg shadow-xl transition-all transform hover:-translate-y-0.5">Begin Journey</button>
                  </div>
                </div>
              </ModalSplit>
            )}
 
            {/* ── STEP 2: Identification Tag ── */}
            {quizStep === 2 && (
              <ModalSplit imageSrc={DEMO_IMAGES[2] ?? activeSlide.image} imageAlt={activeSlide.title}>
                <div className="p-8 md:p-12">
                  <h2 className={`text-2xl font-black uppercase mb-8 ${t.text}`}>Chapter 2: Identification Tag</h2>
                  <div className="space-y-6">
                    <div>
                      <label className={`block font-bold text-xs mb-2 ${t.text}`}>What is your age? ({age})</label>
                      <input
  type="range"
  min="18"
  max="100"
  value={age}
  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
  style={{
    background: `linear-gradient(to right, ${t.sliderAccent} 0%, ${t.sliderAccent} ${((age - 18) / (100 - 18)) * 100}%, ${isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'} ${((age - 18) / (100 - 18)) * 100}%, ${isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'} 100%)`,
    accentColor: t.sliderAccent,
  }}
  onChange={(e) => setAge(parseInt(e.target.value))}
/>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>What is your gender?</label>
                      <select onChange={(e) => setGender(e.target.value)} value={gender} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select gender...</option>
                        <option style={OPT}>Male</option><option style={OPT}>Female</option><option style={OPT}>Other</option><option style={OPT}>Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>What is your country of residence?</label>
                      <select onChange={(e) => setCountry(e.target.value)} value={country} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select country...</option>
                        {['Romania','United States','Albania','Andorra','Austria','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Cyprus','Czechia','Denmark','Estonia','Finland','France','Germany','Hungary','Iceland','Ireland','Italy','Kosovo','Latvia','Lithuania','Luxembourg','Malta','Moldova','Montenegro','Netherlands','North Macedonia','Norway','Poland','Portugal','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Ukraine','United Kingdom','Japan','South Korea','China','India','Brazil','Mexico','Argentina','Canada','Australia','Other'].map(c => <option key={c} style={OPT}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>What is your current citizenship status?</label>
                      <select onChange={(e) => setCitizenship(e.target.value)} value={citizenship} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select status...</option>
                        <option style={OPT}>Permanent resident</option><option style={OPT}>International Student</option><option style={OPT}>Expat/Visa</option><option style={OPT}>Refugee</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>What is your ethnicity?</label>
                      <select onChange={(e) => setEthnicity(e.target.value)} value={ethnicity} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select ethnicity...</option>
                        {['Middle Eastern','East-Asian','South-Asian','South-East Asian','Black','Hispanic','White/Caucasian/European','Indigenous/Aboriginal','Mixed','Other','Prefer not to say'].map(e => <option key={e} style={OPT}>{e}</option>)}
                      </select>
                    </div>
                    <button type="button" onClick={() => { if (!gender || !country || !citizenship || !ethnicity) { alert('Please complete all fields before continuing!'); return; } setQuizStep(3); }} className={`w-full py-4 ${t.demoBtnPrimary}`}>Next</button>
                  </div>
                </div>
              </ModalSplit>
            )}
 
            {/* ── STEP 3: Team Assignment ── */}
            {quizStep === 3 && (
              <ModalSplit imageSrc={DEMO_IMAGES[3] ?? activeSlide.image} imageAlt={activeSlide.title}>
                <div className="p-8 md:p-12">
                  <h2 className={`text-2xl font-black uppercase mb-8 ${t.text}`}>Chapter 02: Team Assignment</h2>
                  <div className="space-y-6">
                    <div>
                      <label className={`block font-bold text-xs mb-2 ${t.text}`}>What is your last education level attained?</label>
                      <select onChange={(e) => setEducation(e.target.value)} value={education} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select education...</option>
                        {['Middle School/Gymnasium','High School','Vocational training',"Bachelor's degree","Master's degree",'Doctoral degree'].map(e => <option key={e} style={OPT}>{e}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>What is your current occupation?</label>
                      <select onChange={(e) => setOccupation(e.target.value)} value={occupation} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select occupation...</option>
                        {['Full-time employed','Part-time employed','Self-employed/Freelancer','Student','Unemployed','Not in education, employment or training'].map(o => <option key={o} style={OPT}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>What is your main source of income?</label>
                      <select onChange={(e) => setIncomeSource(e.target.value)} value={incomeSource} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select income source...</option>
                        {['Personal income','Financial support from family','Scholarship','Government social assistance/Welfare benefits','Pension/Retirement income','Other'].map(i => <option key={i} style={OPT}>{i}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>What is your current financial situation?</label>
                      <select onChange={(e) => setFinanceFeel(e.target.value)} value={financeFeel} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select financial situation...</option>
                        {['Low','Low-middle','Middle','Upper-middle','High'].map(f => <option key={f} style={OPT}>{f}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>What is your current relationship status?</label>
                      <select onChange={(e) => setIsSingle(e.target.value)} value={isSingle} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select...</option>
                        {['Single','In a relationship','Married','Divorced','Widowed'].map(s => <option key={s} style={OPT}>{s}</option>)}
                      </select>
                    </div>
                    <button type="button" onClick={() => { if (!education || !occupation || !incomeSource || !financeFeel || !isSingle) { alert('Please complete all fields before continuing!'); return; } setQuizStep(4); }} className={`w-full py-4 ${t.demoBtnPrimary}`}>Next</button>
                  </div>
                </div>
              </ModalSplit>
            )}
 
            {/* ── STEP 4: Lifestyle ── */}
            {quizStep === 4 && (
              <ModalSplit imageSrc={DEMO_IMAGES[4] ?? activeSlide.image} imageAlt={activeSlide.title}>
                <div className="p-8 md:p-12">
                  <h2 className={`text-2xl font-black uppercase mb-8 ${t.text}`}>Cap.03: Lifestyle</h2>
                  <div className="space-y-6">
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>What is your current living arrangement?</label>
                      <select onChange={(e) => setLiving(e.target.value)} value={living} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select option...</option>
                        {['Living alone','Living with parents','Living with partner','Living with roommates/housemates','Other living'].map(l => <option key={l} style={OPT}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>Your daily time spent indoors?</label>
                      <select onChange={(e) => setDaily(e.target.value)} value={daily} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select option...</option>
                        {['0-4 hours','5-8 hours','9-12 hours','13-16 hours','17-20 hours','More than 20 hours'].map(d => <option key={d} style={OPT}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>What is your religion?</label>
                      <select onChange={(e) => setReligion(e.target.value)} value={religion} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select option...</option>
                        {['Atheist','Agnostic','Buddhist','Christian','Hindu','Jewish','Muslim','Sikh','Spiritual but not religious','Other','Prefer not to say'].map(r => <option key={r} style={OPT}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>Medical affection, disability or chronic disease?</label>
                      <div className="flex gap-4 mb-4">
                        <button type="button" onClick={() => setHasAffection('Yes')} className={`flex-1 py-2 rounded-lg font-bold ${hasAffection === 'Yes' ? t.demoBtnActive : t.demoBtnInactive}`}>Yes</button>
                        <button type="button" onClick={() => setHasAffection('No')} className={`flex-1 py-2 rounded-lg font-bold ${hasAffection === 'No' ? t.demoBtnActive : t.demoBtnInactive}`}>No</button>
                      </div>
                      {hasAffection === 'Yes' && (
                        <select value={selectedDisease} onChange={(e) => setSelectedDisease(e.target.value)} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                          <option value="" disabled style={OPT}>Select the condition...</option>
                          {['Cardiovascular disease','Diabetes mellitus','Respiratory disease','Gastrointestinal disease','Neurological disease','Autoimmune disease','Endocrine disorder','Chronic pain conditions','Musculoskeletal disease','Chronic liver disease','Cancer or malignant disease','Immunological disease','Dermatological disease','Sleep disorder','Other chronic illness','Prefer not to say'].map(d => <option key={d} style={OPT}>{d}</option>)}
                        </select>
                      )}
                    </div>
                    <div>
                      <label className={`block font-bold text-xs mb-2 ${t.text}`}>How many anime episodes do you watch daily? ({averatewatchedepisodes})</label>
                      <input
  type="range"
  min="1"
  max="100"
  value={averatewatchedepisodes}
  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
  style={{
    background: `linear-gradient(to right, ${t.sliderAccent} 0%, ${t.sliderAccent} ${((averatewatchedepisodes - 1) / (100 - 1)) * 100}%, ${isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'} ${((averatewatchedepisodes - 1) / (100 - 1)) * 100}%, ${isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'} 100%)`,
    accentColor: t.sliderAccent,
  }}
  onChange={(e) => setWatchedEpisodes(parseInt(e.target.value))}
/>
                    </div>
                    <button onClick={() => setQuizStep(5)} className={`w-full py-4 ${t.demoBtnPrimary}`}>Next</button>
                  </div>
                </div>
              </ModalSplit>
            )}
 
            {/* ── STEP 5: Anime Profile ── */}
            {quizStep === 5 && (
              <ModalSplit imageSrc={DEMO_IMAGES[5] ?? activeSlide.image} imageAlt={activeSlide.title}>
                <div className="p-8 md:p-12">
                  <h2 className={`text-2xl font-black uppercase mb-8 ${t.text}`}>Chapter 04:Immersion</h2>
                  <div className="space-y-6">
                    <div>
                      <label className={`block font-bold text-xs mb-2 ${t.text}`}>Do you watch anime series in your native language?</label>
                      <div className="flex gap-4">
                        <button type="button" onClick={() => setWatchNative('Yes')} className={`flex-1 py-3 rounded-lg font-bold ${watchNative === 'Yes' ? t.demoBtnActive : t.demoBtnInactive}`}>Yes</button>
                        <button type="button" onClick={() => setWatchNative('No')} className={`flex-1 py-3 rounded-lg font-bold ${watchNative === 'No' ? t.demoBtnActive : t.demoBtnInactive}`}>No</button>
                      </div>
                    </div>
                    {watchNative === 'No' && (
                      <div className="space-y-6 animate-in fade-in duration-500">
                        <div>
                          <label className={`block font-bold text-xs mb-2 ${t.text}`}>In what language do you watch anime series?</label>
                          <select onChange={(e) => setLanguage(e.target.value)} value={language} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                            <option value="" disabled style={OPT}>Select language...</option>
                            {['English','Japanese','Spanish','French','Other'].map(l => <option key={l} style={OPT}>{l}</option>)}
                          </select>
                        </div>
                        {language !== '' && (
                          <div className="animate-in fade-in duration-500">
                            <label className={`block font-bold text-xs mb-2 ${t.text}`}>Which level of proficiency do you have in {language}?</label>
                            <select onChange={(e) => setLevel(e.target.value)} value={level} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                              <option value="" disabled style={OPT}>Select level...</option>
                              {['Beginner (A1-A2)','Intermediate (B1-B2)','Advanced (C1-C2)','Native/Fluent'].map(l => <option key={l} style={OPT}>{l}</option>)}
                            </select>
                          </div>
                        )}
                      </div>
                    )}
                    <div>
                      <label className={`block font-bold text-xs mb-1 ${t.text}`}>Can you remember when you watched anime for the first time?</label>
                      <select onChange={(e) => setGap(e.target.value)} value={gap} className={`w-full p-3 ${t.inputStyle} rounded-lg font-bold`}>
                        <option value="" disabled style={OPT}>Select option...</option>
                        {['Infancy (0-2 years)','Early Childhood (3-5 years)','Middle Childhood (6-11 years)','Early Adolescence (12-14 years)','Middle to Late Adolescence (15-17 years)','Emerging Adulthood (18-25 years)','Young Adulthood (26-39 years)','Middle Adulthood (40-59 years)','Late Adulthood (60 years or older)','I do not remember well enough'].map(g => <option key={g} style={OPT}>{g}</option>)}
                      </select>
                    </div>
                    <button type="button" onClick={() => setQuizStep(6)} className={`w-full py-4 mt-6 ${t.demoBtnPrimary}`}>Submit &amp; Continue</button>
                  </div>
                </div>
              </ModalSplit>
            )}
 
            {/* ── STEP 6: Story Arc 2 Intro ── */}
            {quizStep === 6 && (
              <ModalSplit imageSrc={DEMO_IMAGES[6] ?? activeSlide.image} imageAlt={activeSlide.title}>
                <div className={`p-8 md:p-12 flex flex-col justify-between h-full ${t.text}`}>
                  <div>
                    <div className="text-center mb-10 mt-4">
                      <span className="font-bold uppercase tracking-[0.3em] text-[10px] opacity-60 block mb-2">Story Begins!</span>
                      <h3 className="font-serif text-3xl font-black uppercase tracking-widest">- Hello Traveler! Welcome and hope at the end you will find you you are! -</h3>
                    </div>
                    <div className="space-y-6 max-w-xl mx-auto font-serif text-lg leading-relaxed text-center">
                      <p className="font-medium opacity-90">Congratulations for coming this far into the <strong>{activeSlide.title}</strong> universe. Now we need to know a little more about you.</p>
                      <p className="italic opacity-80 pt-2">Respond as you see fit, and remember — there are no wrong or right answers.</p>
                    </div>
                  </div>
                  <div className={`flex justify-end items-center mt-12 pt-8 border-t max-w-xl mx-auto w-full ${t.headerBorder}`}>
                    <button onClick={() => setQuizStep(7)} className="bg-[#be123c] hover:bg-[#9f1239] text-white px-10 py-4 font-bold uppercase tracking-widest text-[11px] rounded-lg shadow-xl transition-all transform hover:-translate-y-0.5">Begin Journey</button>
                  </div>
                </div>
              </ModalSplit>
            )}
 
                     {/* ── STEP 7: Quiz ── */}
            {quizStep === 7 && (() => {
              const QuizComponent = ANIME_QUIZ_MAP[activeSlide.title];
              if (!QuizComponent) return (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-[#050505]">
                  <p className="text-white/40 text-sm mb-4">Quiz coming soon for {activeSlide.title}.</p>
                  <button onClick={() => setQuizStep(6)} className="px-6 py-2 border border-white/20 text-white text-xs rounded-lg">Back</button>
                </div>
              );
              return (
                <QuizComponent
                  demographics={{
                    age, gender, country, citizenship, ethnicity,
                    education, occupation, incomeSource, financeFeel,
                    relationshipStatus: isSingle,
                    living, dailyIndoorHours: daily, religion,
                    hasCondition: hasAffection === "Yes",
                    conditionType: selectedDisease || undefined,
                    dailyAnimeEpisodes: averatewatchedepisodes,
                    watchesInNativeLanguage: watchNative === "Yes",
                    watchLanguage: language || undefined,
                    languageLevel: level || undefined,
                    firstAnimeAgeRange: gap,
                  }}
                  onFinish={(sessionId) => {
                    setQuizStep(8);
                    runMatch(sessionId, activeSlide.title);
                  }}
                  onBack={() => setQuizStep(6)}
                />
              );
            })()}
 
            {/* ── STEP 8: Thank You ── */}
            {quizStep === 8 && (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 md:p-12 text-white bg-[#050505]">
                <div className="w-20 h-20 bg-green-600/10 border border-green-600/30 text-green-400 rounded-full flex items-center justify-center mb-6 text-3xl">✓</div>
                <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">Thank you for participating!</h2>
                <p className="text-gray-400 font-serif italic text-lg max-w-xl leading-relaxed">Your responses have been recorded. This research contributes to the scientific understanding of anime audiences and personality psychology.</p>
                <button onClick={handleCloseModal} className="mt-10 px-8 py-3.5 border border-white/20 hover:border-white text-white font-bold uppercase tracking-widest text-[10px] transition-all rounded-md">Back to the main menu</button>
              </div>
            )}
 
                        {/* ── STEP 99: Under 18 ── */}
            {quizStep === 99 && (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 md:p-12 text-white bg-[#050505]">
                <div className="w-20 h-20 bg-red-600/10 border border-red-600/30 text-red-500 rounded-full flex items-center justify-center mb-6 text-3xl animate-pulse">🍃</div>
                <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">We are thankful for your support!</h2>
                <p className="text-gray-400 font-serif italic text-lg max-w-xl leading-relaxed">The participation for this current research requires participants to be 18 years or older. We are grateful for your support.</p>
                <button onClick={handleCloseModal} className="mt-10 px-8 py-3.5 border border-white/20 hover:border-white text-white font-bold uppercase tracking-widest text-[10px] transition-all rounded-md">Back to the main menu</button>
              </div>
            )}

          </div>
        </div>
      )}

      <CharacterMatchModal
        isOpen={isMatchOpen}
        status={matchStatus}
        result={matchResult}
        errorMessage={matchError}
        onClose={() => { closeMatch(); handleCloseModal(); }}
        onRetry={() => {
          // notă: pentru retry ar avea nevoie de sessionId păstrat separat;
          // pentru moment doar închide, participantul poate relua chestionarul
          closeMatch();
        }}
      />
    </div>
  );
}
 


