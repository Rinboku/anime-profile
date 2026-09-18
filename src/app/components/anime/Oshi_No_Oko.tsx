"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LikertScale } from "../LikertScale";
import { Need_For_Cognition_18 } from "@/app/psychometrics";


interface QuizItem {
  id: string;
  text: string;
  type?: "likert" | "text";
  likert?: LikertConfig;
}
interface Subscale {
  label: string;
  likert?: LikertConfig;
  items: QuizItem[];
}

interface LikertOption {
  value: number;
  label: string;
}

interface LikertConfig {
  min: number;
  max: number;
  step: number;
  values: LikertOption[];
  type: "buttons" | "slider";
}

interface Episode {
  title: string;
  subscales: Subscale[];
}

interface Arc {
  title: string;
  episodes: Episode[];
}
interface ThemeTokens {
  bg: string;
  text: string;
  subText: string;
  btnPrimary: string;
  btnOutline: string;
  itemBg: string;
  itemBgAnswered: string;
  ratingSelected: string;
  ratingDefault: string;
  headerBorder: string;
  footerBorder: string;
  labelColor: string;
  accentColor: string;
  fontFamily: string;
}
// ─────────────────────────────────────────────────────────────────────────
// INTEGRARE BAZĂ DE DATE (Supabase prin Prisma, via API routes)
// ─────────────────────────────────────────────────────────────────────────

const ANIME_SLUG = "oshi-no-ko";

async function startSession(
  animeSlug: string,
  demographics?: DemographicPayload
): Promise<{
  sessionId: string;
  respondentId: string;
}> {
  const storedRespondentId =
    typeof window !== "undefined"
      ? localStorage.getItem("respondentId")
      : null;

  const res = await fetch("/api/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      animeSlug,
      consentGiven: true,
      locale: "ro",
      respondentId: storedRespondentId ?? undefined,
      demographics,
    }),
  });

  const data = await res.json();

  if (typeof window !== "undefined") {
    localStorage.setItem("respondentId", data.respondentId);
  }

  return data;
}

async function finishSession(sessionId: string) {
  await fetch("/api/sessions", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  });
}

// ── NOU: cheie unică pentru state, ca să nu se mai suprascrie răspunsurile
// când același id de item (ex. "sb1", "pre1", "pr1", "es2") e refolosit
// în instrumente diferite din alte capitole. ──────────────────────────────
function getResponseKey(episodeTitle: string, itemId: string): string {
  return `${episodeTitle}__${itemId}`;
}




const THEME: ThemeTokens = {
  bg:             'bg-[#20031E]',
  text:           'text-[#F43F5E]',
  subText:        'text-[#38BDF8]',
  btnPrimary:     'bg-[#F43F5E] text-white font-bold hover:bg-[#e11d48]',
  btnOutline:     'border-[#F43F5E]/30 text-[#F43F5E] hover:bg-[#F43F5E]/10',
  itemBg:         'bg-[#F43F5E]/5 border-[#F43F5E]/10',
  itemBgAnswered: 'bg-[#38BDF8]/20 border-[#38BDF8]/40',
  ratingSelected: 'bg-[#F43F5E] text-white font-bold scale-105 shadow-lg shadow-rose-900/40',
  ratingDefault:  'bg-[#F43F5E]/10 text-[#F43F5E] hover:bg-[#F43F5E]/20',
  headerBorder:   'border-[#F43F5E]/10',
  footerBorder:   'border-[#F43F5E]/10',
  labelColor:     'text-[#F43F5E]',
  accentColor:    '#F43F5E',
  fontFamily:     '"Poppins", system-ui, sans-serif'
};


  const EPISODE_IMAGES: Record<string, string> = {
  // ARC 1
  'Introduction':                                         '/images/naruto/Naruto_Team.png',
  'Machiavellianism':                                     '/images/naruto/Naruto_Sasuke.png',
  'Narcissism':                                           '/images/naruto/Naruto_Itachi.png',
  'Psychopathy':                                          '/images/naruto/Naruto_Orochimaru.png',
  'Sadism':                                               '/images/naruto/Naruto_Pain.png',
  'BFI-2-XS: Extraversion & Agreeableness':              '/images/naruto/Naruto_Sakura.png',
  'Conscientiousness, Neuroticism & Openness':            '/images/naruto/Naruto_Kakashi.png',
  'UPPS-P Impulsivity':                                   '/images/naruto/Naruto_Rock_Lee.png',
  'Need for Cognition (NFC-18)':                          '/images/naruto/Naruto_Shikamaru.png',
  // ARC 2
  'Maladaptive Daydreaming (MDS-16)':                     '/images/naruto/Naruto_Alone.png',
  'Cognitive Emotion Regulation (CERQ)':                  '/images/naruto/Naruto_Jiraiya.png',
  'Psychological Pain Scale (PPS-13)':                    '/images/naruto/Naruto_Sad.png',
  'Depression & Stress (DASS-21)':                        '/images/naruto/Naruto_Dark.png',
  'Anxiety & Insomnia (DASS-21 + ISI)':                   '/images/naruto/Naruto_Night.png',
  'Self-Esteem & Life Satisfaction (RSES + SWLS)':        '/images/naruto/Naruto_Smile.png',
  'Anhedonia (SHAPS-14)':                                 '/images/naruto/Naruto_Memories.png',
  'Multidimensional State Boredom (MSBM)':                '/images/naruto/Naruto_Waiting.png',
  'Basic Psychological Needs (BPNS)':                     '/images/naruto/Naruto_Training.png',
  // ARC 3
  'Social Media & Smartphone Addiction (BSMAS + SAS-SV)': '/images/naruto/Naruto_Village.png',
  'Gaming Addiction & Emotion Regulation (GAS-7 + ERQ)':  '/images/naruto/Naruto_Chakra.png',
  'Anime Addiction Scale (CLC)':                          '/images/naruto/Naruto_Fan.png',
  // ARC 4
  'Heartland Forgiveness Scale (HFS)':                    '/images/naruto/Naruto_Forgive.png',
  'Self-Compassion Scale (SCS-SF)':                       '/images/naruto/Naruto_Compassion.png',
  'Compassion for Others (CS)':                           '/images/naruto/Naruto_Others.png',
  // ARC 5
  'Brief COPE (28 items)':                                '/images/naruto/Naruto_Fight.png',
  'Self-Expansion, Self-Suppression & Financial Stress':  '/images/naruto/Naruto_Grow.png',
  'Benevolent Childhood Experiences (BCE)':               '/images/naruto/Naruto_Child.png',
  'Hikikomori & Social Avoidance Scale':                  '/images/naruto/Naruto_Lonely.png',
  'Need to Belong (NTB)':                                 '/images/naruto/Naruto_Bond.png',
  // EPILOGUE
  'Anime Story World Engagement (ASWE)':                  '/images/naruto/Naruto_World.png',
  'Narrative Identity in Anime (NISE-20)':                '/images/naruto/Naruto_Legacy.png',
};

export const OSHI_NO_KO_IMAGES: Record<number, string> = {
  0: "/images/Characters/Oshi_No_Ko/abiko-samejima.png",
  1: "/images/Characters/Oshi_No_Ko/ai-hoshino.png",
  2: "/images/Characters/Oshi_No_Ko/akane-kurokawa.png",
  3: "/images/Characters/Oshi_No_Ko/aquamarine-hoshino.png",
  4: "/images/Characters/Oshi_No_Ko/frill-shiranui.png",
  5: "/images/Characters/Oshi_No_Ko/gorou-amemiya.png",
  6: "/images/Characters/Oshi_No_Ko/hiraku-kamiki.png",
  7: "/images/Characters/Oshi_No_Ko/ichigo-saito.png",
  8: "/images/Characters/Oshi_No_Ko/kaburagi-masaya.png",
  9: "/images/Characters/Oshi_No_Ko/kana-arima.png",
  10: "/images/Characters/Oshi_No_Ko/melt-narushima.png",
  11: "/images/Characters/Oshi_No_Ko/mem-cho.png",
  12: "/images/Characters/Oshi_No_Ko/minami-kotobuki.png",
  13: "/images/Characters/Oshi_No_Ko/miyako-saito.png",
  14: "/images/Characters/Oshi_No_Ko/nobuyuki-kumano.png",
  15: "/images/Characters/Oshi_No_Ko/pieyon.png",
  16: "/images/Characters/Oshi_No_Ko/ruby-hoshino.png",
  17: "/images/Characters/Oshi_No_Ko/sarina-tendouji.png",
  18: "/images/Characters/Oshi_No_Ko/taiki-himekawa.png",
  19: "/images/Characters/Oshi_No_Ko/taishi-gotanda.png",
  20: "/images/Characters/Oshi_No_Ko/yoriko-kichijouji.png",
  21: "/images/Characters/Oshi_No_Ko/yuki-sumi.png",
  22: "/images/Characters/Oshi_No_Ko/akane-kurokawa.png",
  23: "/images/Characters/Oshi_No_Ko/aquamarine-hoshino.png",
  24: "/images/Characters/Oshi_No_Ko/frill-shiranui.png",
  25: "/images/Characters/Oshi_No_Ko/gorou-amemiya.png",
  26: "/images/Characters/Oshi_No_Ko/hiraku-kamiki.png",
  27: "/images/Characters/Oshi_No_Ko/ichigo-saito.png",
  28: "/images/Characters/Oshi_No_Ko/kaburagi-masaya.png",
  29: "/images/Characters/Oshi_No_Ko/kana-arima.png",
  30: "/images/Characters/Oshi_No_Ko/melt-narushima.png",
  31: "/images/Characters/Oshi_No_Ko/mem-cho.png",
  32: "/images/Characters/Oshi_No_Ko/minami-kotobuki.png",
  33: "/images/Characters/Oshi_No_Ko/miyako-saito.png",
  34: "/images/Characters/Oshi_No_Ko/nobuyuki-kumano.png",
};


const FALLBACK_IMAGE = '/images/Naruto_Team.png';
function getEpisodeImage(title: string): string {
  const match = title.match(/\d+/);
  if (!match) return FALLBACK_IMAGE;
  const episodeNumber = Number(match[0]);
  return OSHI_NO_KO_IMAGES[episodeNumber] ?? FALLBACK_IMAGE;
}

export interface FlatQuizItem {
  id: string;
  text: string;
  likert: {
    min: number;
    max: number;
    step: number;
    type: string;
    values: { value: number; label: string }[];
  };
  arcTitle: string;
  chapterTitle: string;
  subscaleLabel: string;
}

export function getFlatQuizItems(catalog: any[]): FlatQuizItem[] {
  const flatItems: FlatQuizItem[] = [];

  catalog.forEach(arc => {
    if (!arc.episodes) return;

    arc.episodes.forEach((episode: any) => {
      if (!episode.subscales || episode.subscales.length === 0) return;

      episode.subscales.forEach((subscale: any) => {
        if (!subscale.items) return;

        subscale.items.forEach((item: any) => {
          const likertConfig = item.likert || subscale.likert;

          if (likertConfig) {
            flatItems.push({
              id: item.id,
              text: item.text,
              likert: likertConfig,
              arcTitle: arc.title,
              chapterTitle: episode.title,
              subscaleLabel: subscale.label || 'General'
            });
          }
        });
      });
    });
  });

  return flatItems;
}



// ── Likert-uri reutilizabile ─────────────────────────────────────────────
const L5_AGREE: LikertConfig = {min: 1, max: 5, step: 1, type: "buttons", values:[
  {value: 1, label:"Strongly disagree"}, {value: 2, label:"Disagree"}, {value: 3, label:"Neutral"},
  {value: 4, label:"Agree"}, {value: 5, label:"Strongly Agree"}
]};
const L4_UPPS: LikertConfig = {min:1, max:4, step: 1, type: "buttons", values:[
  {value: 1, label:"Agree Strongly"},{value:2, label:"Agree Some"}, {value:3, label:"Disagree Some"},{value:4, label:"Disagree Strongly"}
]};
const L5_NFC: LikertConfig = {min:1, max:5, step: 1, type: "buttons", values:[
  {value:1, label:"Extremely uncharacteristic of me"},{value:2, label:"Somewhat uncharacteristic of me"},
  {value:3, label:"Uncertain"},{value:4, label:"Somehat characteristic of me"},{value:5, label:"Extremely characteristic of me"}
]};
const SLIDER_100: LikertConfig = {min: 0, max: 100, step : 1, type:"slider", values: []};
const L5_CERQ: LikertConfig = {min: 1, max: 5, step:1, type:"buttons", values:[
  {value:1, label:"Almost never"},{value:2, label:"Sometimes"},{value:3, label:"Regularly"},{value:4, label:"Often"},{value:5, label:"Almost always"}
]};
const L5_PSYA: LikertConfig = {min:1, max:5, step:1, type:"buttons", values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree nor disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}
]};
const L4_DASS: LikertConfig = {min:0, max:3, step:1, type:"buttons", values:[
  {value:0, label:"Did not apply to me at all"},{value:1, label:"Applied to me to some degree, or some of the time"},
  {value:2, label:"Applied to me to a considerable degree, or a good part of the time"},{value:3, label:"Applied to me very much, or most of the time"}
]};
const L5_ISI: LikertConfig = {min:0, max:4, step:1,type:"buttons", values:[
  {value:0, label:"None"},{value:1, label:"Mild"},{value:2, label:"Moderate"},{value:3, label:"Severe"},{value:4, label:"Very severe"}
]};
const L4_RSES: LikertConfig = {min:1, max:4, step:1, type:"buttons",values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}
]};
const L7_SWLS: LikertConfig = {min:1, max:7, step:1, type:"buttons",values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Slighly disagree"},{value:4, label:"Neither agree nor disagree"},
  {value:5, label:"Slightly agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}
]};
const L4_SHAPS: LikertConfig = {min:0, max:3, step:1, type:"buttons",values:[
  {value:0, label:"Strongly disagree"},{value:1, label:"Disagree"},{value:2, label:"Agree"},{value:3, label:"Strongly agree"}
]};
const L7_MSBM: LikertConfig = {min:1, max:7, step:1, type:"buttons", values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},
  {value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}
]};
const L5_BPNSFS: LikertConfig = {min:1, max:5, step:1, type:"buttons", values:[
  {value:1, label:"Completely untrue"},{value:2, label:"Mostly untrue"},{value:3, label:"Somewhat true"},{value:4, label:"Mostly true"},{value:5, label:"Completely true"}
]};
const L5_FREQ: LikertConfig = {min:1, max:5, step:1, type:"buttons",values:[
  {value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}
]};
const L5_SMAR: LikertConfig = {min:1, max:5, step:1, type:"buttons",values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neutral"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}
]};
const L7_ERQ: LikertConfig = {min:1, max:7, step:1, type:"buttons", values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},
  {value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}
]};
const L5_CLC: LikertConfig = {min:0, max:4, step:1, type:"buttons", values:[
  {value:0, label:"Never"},{value:1, label:"Rarely"},{value:2, label:"Sometimes"},{value:3, label:"Often"},{value:4, label:"Always"}
]};
const L7_HFS: LikertConfig = {min:1, max:7, step:1, type:"buttons", values:[
  {value:1, label:"Almost always false of me"},{value:2, label:"2"},{value:3, label:"More often false of me"},{value:4, label:"4"},
  {value:5, label:"More often true of me"},{value:6, label:"6"},{value:7, label:"Almost always true of me"}
]};
const L5_SCS: LikertConfig = {min:1, max:5, step:1, type:"buttons", values:[
  {value:1, label:"Almost never"},{value:2, label:"Occasionally"},{value:3, label:"About half of the time"},{value:4, label:"Fairly"},{value:5, label:"Almost always"}
]};
const L10_CS: LikertConfig = {min:1, max:10, step:1, type:"buttons",values:[
  {value:1, label:"Never"},{value:2, label:"2"},{value:3, label:"3"},{value:4, label:"4"},{value:5, label:"5"},
  {value:6, label:"6"},{value:7, label:"7"},{value:8, label:"8"},{value:9, label:"9"},{value:10, label:"Always"}
]};
const L4_COPE: LikertConfig = {min:1, max:4, step:1, type:"buttons",values:[
  {value:1, label:"I haven`t been doing this at all"},{value:2, label:"I`ve been doing this a little bit"},
  {value:3,label:"I`ve been doing this a medium amount"},{value:4, label:"I`ve been doing this a lot"}
]};
const L7_ESC: LikertConfig = {min:1, max:7, step:1, type:"buttons",values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},
  {value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}
]};
const L5_FIN: LikertConfig = {min:1, max:5, step:1, type:"buttons", values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree or disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly disagree"}
]};
const L2_BCE: LikertConfig = {min:0, max:1, step:1, type:"buttons", values:[
  {value:0, label:"No"},{value:1, label:"Yes"}
]};
const L5_HIKI: LikertConfig = {min:0, max:4, step:1, type:"buttons",values:[
  {value:0, label:"Strongly disagree"},{value:1, label:"Disagree"},{value:2, label:"Neither agree nor disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}
]};
const L5_NTB: LikertConfig = {min:1, max:5, step:1, type:"buttons", values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Moderately disagree"},{value:3, label:"Neither agree nor disagree"},{value:4, label:"Moderately agree"},{value:5, label:"Strongly agree"}
]};
const L7_ASWE: LikertConfig = {min:1, max:7, step:1, type:"buttons", values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Slightly disagree"},{value:4, label:"Neither agree nor disagree"},
  {value:5, label:"Slightly agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}
]};
const L6_NISE: LikertConfig = {min:1, max:6, step:1, type:"buttons", values:[
  {value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Slightly disagree"},{value:4, label:"Slightly agree"},{value:5, label:"Agree"},{value:6, label:"Strongly agree"}
]};
const L5_GAS: LikertConfig = {min:1, max:5, step:1, type:"buttons",values:[
  {value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}
]};


const CATALOG: Arc[] = [
  {
    title: 'Arc 1 — Behind the Stage Lights',
    episodes: [
       {
        title: 'Episode 1',
    
        subscales: [
          {
            label: 'Things Hidden From the Public',
            likert: {min: 1, max: 5, step: 1, type: "buttons", values:[{value: 1, label:"Strongly disagree"}, {value: 2, label:"Disagree" }, {value: 3, label:"Neutral"},{value: 4, label:"Agree"},{value:5, label:"Strongly Agree"}]},
            items: [
              { id: 'mach_1', text: 'It\'s not wise to tell your secrets.' },
              { id: 'mach_2', text: 'I like to use clever manipulation to get my way.' },
              { id: 'mach_3', text: 'Whatever it takes, you must get the important people on your side.' },
              { id: 'mach_4', text: 'Avoid direct conflict with others because they may be useful in the future.' },
              { id: 'mach_5', text: 'It\'s wise to keep track of information that you can use against people later.' },
              { id: 'mach_6', text: 'You should wait for the right time to get back at people.' },
              { id: 'mach_7', text: 'There are things you should hide from other people to preserve your reputation.' },
              { id: 'mach_8', text: 'Make sure your plans benefit yourself, not others.' },
              { id: 'mach_9', text: 'Most people can be manipulated.' },
            ],
          },
        ],
      },
      {
        title: 'Episode 2',
       
        subscales: [
          {
            label: 'The Idol Everyone Adores',
            likert: {min: 1, max: 5, step: 1, type: "buttons", values:[{value: 1, label:"Strongly disagree"}, {value: 2, label:"Disagree" }, {value: 3, label:"Neutral"},{value: 4, label:"Agree"},{value:5, label:"Strongly Agree"}]},
            items: [
              { id: 'narc_1', text: 'I tend to want others to admire me.' },
              { id: 'narc_2', text: 'I tend to want others to pay attention to me.' },
              { id: 'narc_3', text: 'I tend to seek prestige or status.' },
              { id: 'narc_4', text: 'I tend to expect special favors from others.' },
              { id: 'narc_5', text: 'I tend to show off if I get the chance.' },
              { id: 'narc_6', text: 'I tend to use others for my own ends.' },
              { id: 'narc_7', text: 'I tend to think I am as special as I am important.' },
              { id: 'narc_8', text: 'I tend to think I deserve extra special treatment.' },
              { id: 'narc_9', text: 'I tend to think I am better than others.' },
            ],
          },
        ],
      },
      {
        title: 'Episode 3',
        subscales: [
          {
            label: 'Cold Eyes Behind the Smile',
            likert: {min: 1, max: 5, step: 1, type: "buttons", values:[{value: 1, label:"Strongly disagree"}, {value: 2, label:"Disagree" }, {value: 3, label:"Neutral"},{value: 4, label:"Agree"},{value:5, label:"Strongly Agree"}]},
            items: [
              { id: 'psyc_1', text: 'I tend to be callous or insensitive.' },
              { id: 'psyc_2', text: 'I tend not to feel remorseful when I do something wrong.' },
              { id: 'psyc_3', text: 'I tend to be cynical.' },
              { id: 'psyc_4', text: 'I tend not to feel much concern for others.' },
              { id: 'psyc_5', text: 'I tend to be numb or emotionally flat.' },
              { id: 'psyc_6', text: 'I tend to take risks.' },
              { id: 'psyc_7', text: 'I tend to be unpredictable.' },
              { id: 'psyc_8', text: 'I tend to do dangerous things.' },
              { id: 'psyc_9', text: 'I tend to behave erratically.' },
            ],
          },
        ],
      },
      {
        title: 'Episode 4',
    
        subscales: [
          {
            label: 'The Rumour’s Cruelty',
            likert: {min: 1, max: 5, step: 1, type: "buttons", values:[{value: 1, label:"Strongly disagree"}, {value: 2, label:"Disagree" }, {value: 3, label:"Neutral"},{value: 4, label:"Agree"},{value:5, label:"Strongly Agree"}]},
            items: [
              { id: 'sad_1', text: 'I have hurt people for my own enjoyment.' },
              { id: 'sad_2', text: 'I would enjoy hurting someone physically, sexually, or emotionally.' },
              { id: 'sad_3', text: 'I have fantasized about hurting people who have annoyed me.' },
              { id: 'sad_4', text: 'I find it funny when someone hurts themselves accidentally.' },
              { id: 'sad_5', text: 'Seeing people hurt is exciting.' },
              { id: 'sad_6', text: 'I have made fun of people so that they know I am in control.' },
              { id: 'sad_7', text: 'People would enjoy hurting others if they tried it.' },
              { id: 'sad_8', text: 'Hurting people is exciting.' },
              { id: 'sad_9', text: 'I have humiliated others to keep them in line.' },
              
            ],
          },
        ],
      },
      {
        title: 'Episode 5',
        subscales: [
          {
            label: 'People Behind the Camera',
            likert: {min: 1, max: 5, step: 1, type: "buttons", values:[{value: 1, label:"Strongly disagree"}, {value: 2, label:"Disagree" }, {value: 3, label:"Neutral"},{value: 4, label:"Agree"},{value:5, label:"Strongly Agree"}]},
            items: [
              { id: 'ex1', text: 'Is outgoing, sociable.' },
              { id: 'ex2', text: 'Has an assertive personality.' },
              { id: 'ex3', text: 'Rarely feels excited or eager.' },
              { id: 'ex4', text: 'Tends to be quiet.' },
              { id: 'ex5', text: 'Is dominant, acts as a leader.' },
              { id: 'ex6', text: 'Is less active than other people.' },
              {id: "ag1", text: "Is compassionate has a soft heart." },
              {id: "ag2", text: "Is respectful, treats others with respect. "},
              {id: "ag3", text: "Tends to find fault with others. " },
              {id: "ag4", text: "Feels little sympathy for others. " },
              {id: "ag5", text: "Starts quarrels with others." },
              {id: "ag6", text: "Has a forgiving nature. " },
            ],
          },
        ],
      },
      {
        title:"Episode 6",
        subscales: [
          {
            label:"Reading the Script",
            likert: {min: 1, max: 5, step: 1, type: "buttons", values:[{value: 1, label:"Strongly disagree"}, {value: 2, label:"Disagree" }, {value: 3, label:"Neutral"},{value: 4, label:"Agree"},{value:5, label:"Strongly Agree"}]},
            items:[
              {id: "co1", text: "Tends to be disorganized." },
        {id: "co2", text: "Tends to be lazy."},
        {id: "co3", text: "Is dependable, steady." },
        {id: "co4", text: "Keeps things nest and tidy." },
        {id: "co5", text: "Has difficulty getting started on tasks. " },
        {id: "co6", text: "Can be somewhat careless." },
        {id: "ne1", text: "Is relaxed, handles stress well." },
        {id: "ne2", text: "Stays optimistic after experiencing a setback."},
        {id: "ne3", text: "Is moody, has up and down mood swings. " },
        {id: "ne4", text: "Worries a lot. " },
        {id: "ne5", text: "Feels secure, comfortable with self. " },
        {id: "ne6", text: "Is emotionally stable, not easily upset. " },
        {id: "om1", text: "Has few artistic interests. " },
        {id: "om2", text: "Is curious about many different things. "},
        {id: "om3", text: "Is inventive, finds clever ways to do things. " },
        {id: "om4", text: "Fascinated by art music or literature. " },
        {id: "om5", text: "Avoids intellectual, philosophical discussions. " },
        {id: "om6", text: "Has little creativity. " }
 
            ]
          }
        ]
      },
      {
        title:"Episode 7",
        subscales: [
          {
            label:"A Take Without Rehearsal",
            likert:{min:1, max:4, step: 1, type: "buttons", values:[{value: 1, label:"Agree Strongly"},{value:2, label:"Agree Some"}, {value:3, label:"Disagree Some"},{value:4, label:"Disagree Strongly"}]},
            items:[
              {id: "pre1", text: "I have a reserved and cautious attitude toward life. "},
        {id: "pre2", text: "My thinking is usually careful and purposeful."},
        {id: "pre3", text: "I tent to value and follow a rational `sensible` approach to things. "},
        {id: "pre4", text: "I usually make up my mind through careful reasoning."},
        {id: "urg1", text: "I have trouble controlling my impulses."},
        {id: "urg2", text: "I have trouble resisting my cravings (for food, cigarettes, etc.)."},
        {id: "urg3", text: "When I feel bad, I will often do things I later regret in order to make myself feel better now."},
        {id: "urg4", text: "When I am upset, I often act without thinking. "},
        {id: "ses1", text: "I generally seek new and exciting experiences and sensations."},
        {id: "ses2", text: "I rather enjoy taking risks. "},
        {id: "ses3", text: "I'll try anything once."},
        {id: "ses4", text: "I like sports and games in which you have to choose your next move very quickly."},
        {id: "urp1", text: "When I am very happy, I can't seem to help but do high-risk things. "},
        {id: "urp2", text: "When I am in a great mood, I tend to get into situations that could cause me problems. "},
        {id: "urp3", text: "When I am very happy, I feel like it is okay to give in to cravings or overindulge."},
        {id: "urp4", text: "Others would say I make bad choices when I am extremely happy. "}
            ]
          }
        ]
      },
      {
        title:"Episode 8",
        subscales: [
          {
            label:"The Long Preparation",
            likert:{min:1, max:5, step: 1, type: "buttons", values:[{value:1, label:"Extremely uncharacteristic of me"},{value:2, label:"Somewhat uncharacteristic of me"},{value:3, label:"Uncertain"},{value:4, label:"Somehat characteristic of me"},{value:5, label:"Extremely characteristic of me"}]},
            items:[
              {id: "nfc1", text: "I would prefer complex to simple problems."},
        {id: "nfc2", text: "I like to have the responsibility of handling a situation that requires a lot of thinking."},
        {id: "nfc3", text: "Thinking is not my idea of fun. "},
        {id: "nfc4", text: "I would rather do something that requires little thought than something that is sure to challenge my thinking abilities."},
        {id: "nfc5", text: "I try to anticipate and avoid situations where is likely a chance I will have to think in depth about something."},
        {id: "nfc6", text: "I find satisfaction in deliberating hard and for long hours."},
        {id: "nfc7", text: "I only think as hard as I have to. "},
        {id: "nfc8", text: "I prefer to think about small, daily projects to long-term ones. "},
        {id: "nfc9", text: "I like tasks that require little thought once I've learned them."},
        {id: "nfc10", text: "The idea of relying on thought to make my way to the top appeals to me."},
        {id: "nfc11", text: "I really enjoy a task that involves coming up with new solutions to problems. "},
        {id: "nfc12", text: "Learning new ways to think doesn't excite me very much."},
        {id: "nfc13", text: "I prefer my life to be filled with puzzles that I must solve."},
        {id: "nfc14", text: "The notion of thinking abstractly is appealing to me. "},
        {id: "nfc15", text: "I would prefer a task that is intellectual, difficult, an important to one that is somewhat important but does not require much thought. "},
        {id: "nfc16", text: "I feel relief rather than satisfaction after completing a task that required a lot of mental effort. "},
        {id: "nfc17", text: "It's enough for me that something gets the job done, I don't care how or why it works."},
        {id: "nfc18", text: "I usually end up deliberating about issues even when don't affect me personally. "}
            ]
          }]
      }
    ],
  },
  {
    title:"Arc 2 — The Reality Show",
     episodes: [
  
      {
        title:"Episode 9",
        subscales: [
          {
            label:"Daydreams in the Dressing Room",
            likert:{min: 0, max: 100, step : 1, type:"slider",values: []},
            items:[
             {id: "mds1", text: "How much of your time spent daydreaming is occupied by vivid and counselor-like characters or elaborate fantasy worlds?"},
        {id: "mds2", text: "How much do you feel that need to continue a daydream when you are interrupted?"},
        {id: "mds3", text: "How much of a problem is it for you to keep your daydreaming under control?"},
        {id: "mds4", text: "How much does your daydreaming interfere with your academic/professional succes?"},
        {id: "mds5", text: "To what extent do you feel that your daydreaming interferes with your household or other daily chores?"},
        {id: "mds6", text: "How much do you feel that you daydreaming interferes with your social life or relationships?"},
        {id: "mds7", text: "How much do you value your daydreams more than your real life experiences?"},
        {id: "mds8", text: "To what extent do you prefer to daydream rather than spent time with real people?"},
        {id: "mds9", text: "How much do you feel that your daydreaming is becoming a problem to you?"},
        {id: "mds10", text: "To what extent do you find yourself making repetitive moments (e.g: pacing, rocking, hand movements) while daydreaming?"},
        {id: "mds11", text: "How much does your daydreaming cause your personal distress?"},
        {id: "mds12", text: "How often do you find yourself talking out loud or making facial expressions while daydreaming?"},
        {id: "mds13", text: "How much do you find your daydreaming to be more interesting than your actual life?"},
        {id: "mds14", text: "How much do you find it difficult to stop daydreaming once you have started?"},
        {id: "mds15", text: "How much does your daydreaming prevent you from doing things you really want to do?"},
        {id: "mds16", text: "How much do you find yourself `lost` in your daydreams for long periods of time?"},
            ]
          }
        ]
      },
    {
      title:"Episode 10",
      subscales:[
        {
          label:"When the Scene Falls Apart",
          likert:{min: 1, max: 5, step:1, type:"buttons",values:[{value:1, label:"Almost never"},{value:2, label:"Sometimes"},{value:3, label:"Regularly"},{value:4, label:"Often"},{value:5, label:"Almost always"}]},
          items:[
            {id: "sb1", text: "I feel that I am the one who is responsible for what has happened."},
            {id: "sb2", text: "I think that basically the cause must lie within myself."},
            {id:"aa1", text: "I think that I have to accept that this has happened."},
            {id:"aa2", text: "I think that I have to accept the situation."},
            {id: "ft1", text: "I often think about how I feel about what I have experienced."},
            {id: "ft2", text: "I am preoccupied with what I think and feel about what I have experienced."},
            {id: "pr1", text: "I think of pleasant things that I have nothing to do with it."},
            {id: "pr2", text: "I think of something nice instead of what has happened."},
            {id: "rp1", text: "I think about how to change the situation."},
            {id: "rp2", text: "I think about a plan of what I can do best."},
            {id: "pre1", text: "I think I can learn something from the situation."},
            {id: "pre2", text: "I think that I can become a stronger person as a result of what has happened."},
            {id: "pip1", text: "I think that it hasn`t been too bad compared the other things."},
            {id: "pip2", text: "I tell myself that there are worse things in life."},
            {id: "cat1", text: "I keep thinking about how terrible it is what I have experienced."},
            {id: "cat2", text: "I continually think how terrible the situation has been."},
            {id: "ob1", text: "I feel that others are responsible for what has happened."},
            {id: "ob2", text: "I feel that basically the cause lies with others. "}
      
          ]
        }
      ]
    },
    {
      title:"Episode 11",
      subscales:[{
        label:"An Old Wound Reopens",
        likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree nor disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]},
        items:[
      {id : "psya1", text: "I feel psychological pain."},
      {id: "psya2", text: "I am free from any emotional pain"},
      {id: "psya3", text: "I feel personal suffering."},
      {id: "psya4", text: "I feel a deep sense of hurt."},
      {id: "psya5", text: "I seem to ache inside."},
      {id: "psya6", text: "My soul feels as if it is aching."},
      {id: "psya7", text: "My psychological pain is worse than any physicalpain I`ve had."},
      {id: "psya8", text: "I feel `eaten up` from inside."},
      {id: "psya9", text: "My psychological pain is so bad I`d do almost anything to make it stop."},
      {id: "psya10", text: "I can`t take any more psychological pain."},
      {id: "psya11", text: "My emotional pain is unyielding."},
      {id: "psya12", text: "My pain is more than I can bear."},
      {id: "psya13", text: "I am in more psychological pain than I can stand."}
 
        ]
      }
      ]
    },
    {
      title:"Episode 12",
      subscales:[{
        label:"A Long Grey Season",
        likert:{min:0, max:3, step:1, type:"buttons", values:[{value:0, label:"Din not apply to me at all"},{value:1, label:"Applied to me to some degree, or some of the time"},{value:2, label:"Applied to me to a considerable degree, or a good part of the time"},{value:3, label:"Applied to me very much, or most of the time"}]},
        items:[
          {id: "dep1", text: "I couldn`t seem to experience any positive feeling at all."},
      {id: "dep2", text: "I found it difficult to work up the initiative to do things."},
      {id: "dep3", text: "I felt that I had nothing to look forward to."},
      {id: "dep4", text: "I felt down-hearted and blue."},
      {id: "dep5", text: "I was unable to become enthusiastic about anything."},
      {id: "dep6", text: "I felt I wasn`t worth much as a person."},
      {id: "dep7", text: "I felt that life was meaningless."},
      {id: "stre1", text: "I found it hard to wind down."},
      {id: "stre2", text: "I tended to over-react to situations."},
      {id: "stre3", text: "I felt that I was using a lot of nervous energy."},
      {id: "stre4", text: "I found myself getting agitated."},
      {id: "stre5", text: "I found it difficult to relax."},
      {id: "stre6", text: "I was intolerant of anything that kept me from getting on with what I was doing."},
      {id: "stre7", text: "I felt that I was rather touchy."},
      {id: "anx1", text: "I was aware of dryness of my mouth."},
        {id: "anx2", text: "I experienced breathing difficulty (e.g: excessively rapid breahting, breathelessness in the absence of physical exertion)."},
        {id: "anx3", text: "I experienced trembling (e.g: in the hands)."},
        {id: "anx4", text: "I was worried about situations in which I might panic and make a fool of myself."},
        {id: "anx5", text: "I felt I was close to panic."},
        {id: "anx6", text: "I was aware of the action of my heart in the absence of physical exertion (e.g: sense of heart rate increase, heart skipping a beat)."},
        {id: "anx7", text: "I felt scared without any good reason."},
        ]
      }]
    },
    {
      title:"Episode 13",
      subscales:[{
        label:"Nights Between Shoots",
        items:[
        {id:"ins1", text:"Difficult falling asleep.", likert:{min:0, max:4, step:1,type:"buttons", values:[{value:0, label:"None"},{value:1, label:"Mild"},{value:2, label:"Moderate"},{value:3, label:"Severe"},{value:4, label:"Very severe"}]}
         
        },
 
        {id:"ins2", text:"Difficult staying asleep.", likert:{min:0, max:4, step:1,type:"buttons", values:[{value:0, label:"None"},{value:1, label:"Mild"},{value:2, label:"Moderate"},{value:3, label:"Severe"},{value:4, label:"Very severe"}]}},
        {id:"ins3", text:"Problems waking up too early.",likert:{min:0, max:4, step:1,type:"buttons", values:[{value:0, label:"None"},{value:1, label:"Mild"},{value:2, label:"Moderate"},{value:3, label:"Severe"},{value:4, label:"Very severe"}]}},
        {id:"ins4", text:"How satisfied or dissatisfied are you with your current sleep pattern?",likert:{min:0, max:4, step:1,type:"buttons", values:[{value:0, label:"Very satisfied"},{value:1, label:"Satisfied"},{value:2, label:"Moderately satisfied"},{value:3, label:"Dissatisfied"},{value:4, label:"Very dissatisfied"}]}},
        {id:"ins5", text:"How noticeable to others do you think your sleep problem is in terms of impairing the quality of life?",likert:{min:0, max:4, step:1,type:"buttons", values:[{value:0, label:"Not at all"},{value:1, label:"A little"},{value:2, label:"Somewhat"},{value:3, label:"Much"},{value:4, label:"Very much"}]}},
        {id:"ins6", text:"How worried/distressed are you about your current sleep pattern?",likert:{min:0, max:4, step:1,type:"buttons", values:[{value:0, label:"Not at all"},{value:1, label:"A little"},{value:2, label:"Somewhat"},{value:3, label:"Much"},{value:4, label:"Very much"}]}},
        {id:"ins7", text:"To what extent do you consider your sleep problem to interfere with your daily function (e.g. daytime fatigue, mood, ability to function at work/daily chores, concentration, memory, mood, etc) currently?",likert:{min:0, max:4, step:1,type:"buttons", values:[{value:0, label:"Not at all"},{value:1, label:"A little"},{value:2, label:"Somewhat"},{value:3, label:"Much"},{value:4, label:"Very much"}]}}
 
        ]
      }]
    },
    {
      title:"Episode 14",
      subscales:[{
        label:"Watching Your Own Performance",
        items:[
          {id:"rses1", text:"On the whole, I am satisfied with myself.",likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]}},
        {id:"rses2", text:"At the times I think I am no good at all.",likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]}},
        {id:"rses3", text:"I feel that I have a number of good qualities.",likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]}},
        {id:"rses4", text:"I am able to do things as well as most other people.",likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]}},
        {id:"rses5", text:"I feel I do not have much to be proud of.",likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]}},
        {id:"rses6", text:"I certainly feel useless at times.",likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]}},
        {id:"rses7", text:"I feel that I`m a person of worth, at least on an equal plane with others.",likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]}},
        {id:"rses8", text:"I wish I could have more respect for myself.",likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]}},
        {id:"rses9", text:"All in all, I am inclined to feel that I am a failure.",likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]}},
        {id:"rses10", text:"I take a positive atitude toward myself.",likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]}},
        {id:"swls1", text:"In most ways my life is close to my ideal.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Slighly disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Slightly agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
        {id:"swls2", text:"The conditions of my life are excellent.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Slighly disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Slightly agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
        {id:"swls3", text:"I am satisfied with my life.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Slighly disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Slightly agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
        {id:"swls4", text:"So far I have gotten the important things I want in life.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Slighly disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Slightly agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
        {id:"swls5", text:"If I could live my life over, I would change almost nothing.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Slighly disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Slightly agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
        ]
      }]
    },
 
  {
    title:"Episode 15",
    subscales:[{
      label:"Small Joys Off Camera",
      likert:{min:0, max:3, step:1, type:"buttons",values:[{value:0, label:"Strongly disagree"},{value:1, label:"Disagree"},{value:2, label:"Agree"},{value:3, label:"Strongly agree"}]},
      items:[
         {id: "anh1", text:"I would enjoy favorite pastimes."},
        {id: "anh2", text:"I would enjoy being with my family or close friends."},
        {id: "anh3", text:"I would find pleasure in my hobbies."},
        {id: "anh4", text:"I would be able to enjoy my favorite meal."},
        {id: "anh5", text:"I would enjoy a warm bath or refreshing shower."},
        {id: "anh6", text:"I would find pleasure in the scent of flowers or the smell of a fresh sea breeze or freshly baked bread."},
        {id: "anh7", text:"I would enjoy seeing other people`s smiling faces."},
        {id: "anh8", text:"I would enjoy a cup of tea or coffee or my favorite drink."},
        {id: "anh9", text:"I would enjoy reading a book, magazine or newspaper."},
        {id: "anh10", text:"I would enjoy a cup of tea or coffee or favorite drink."},
        {id: "anh11", text:"I would find pleasure in small things, e.g. bright sunny day, a telephone call from a friend."},
        {id: "anh12", text:"I would enjoy seeing my family`s or close friends happiness."},
        {id: "anh13", text:"I would enjoy a beautiful landscape or view."},
        {id: "anh14", text:"I would enjoy helping others."}
      ]
    }]
  },
  {
    title: "Episode 16",
    subscales:[{
      label:"The Empty Green Room",
      likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]},
      items:[
        {id: "dis1", text: "I am stuck in a situation that I feel is irrelevant."},
        {id: "dis2", text: "I am lonely."},
        {id: "dis3", text: "I want to do something fun, but there is nothing to do."},
        {id: "dis4", text: "I feel like I am sitting around waiting for something to happen."},
        {id: "dis5", text: "I feel empty."},
        {id: "dis6", text: "I feel like I am just `going through the motions`."},
        {id: "dis7", text: "I wish I were doing something exciting."},
        {id: "ina1", text: "I am easily distracted."},
        {id: "ina2", text: "I am distracted by my own thoughts."},
        {id: "ina3", text: "It`s difficult to focus my attention."},
        {id: "ina4", text: "My mind is wandering."},
        {id: "hia1", text: "I feel restless."},
        {id: "hia2", text: "I feel like my heart is racing."},
        {id: "hia3", text: "I am agitated."},
        {id: "hia4", text: "Everything seems to be irritating me right now."},
        {id: "tip1", text: "Time is passing very slowly."},
        {id: "tip2", text: "I am constantly checking the clock."},
        {id: "tip3", text: "I feel like time is dragging."},
        {id: "tip4", text: "I feel as though I am waiting for time to pass."},
        {id: "loa1", text: "I feel lethargic."},
        {id: "loa2", text: "I feel tired. "},
        {id: "loa3", text: "I feel like I have no energy."},
        {id: "loa4", text: "I feel down."},
        {id: "gen1", text: "I am bored."}
      ]
    }]
  },
  {
    title:"Episode 17",
    subscales:[{
      label:"Bonds Behind the Scenes",
      likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Completely untrue"},{value:2, label:"Mostly untrue"},{value:3, label:"Somewhat true"},{value:4, label:"Mostly true"},{value:5, label:"Completely true"}]},
      items:[
        {id: "aut1", text: "I feel a sense of choice and freedom in the things I undertake."},
        {id: "aut2", text: "I feel that my decisions reflect what I really want."},
        {id: "aut3", text: "I feel my choices express who I really am."},
        {id: "aut4", text: "I feel I have been doing what I really interests me."},
        {id: "aut5", text: "Most of the things I do feel like `have to`s`."},
        {id: "aut6", text: "I feel forced to do many things I wouldn`t choose to do."},
        {id: "aut7", text: "I feel pressured to do too many things."},
        {id: "aut8", text: "My daily activities feel like a chain of obligations."},
        {id:"com1", text:"I feel confident that I can do things well."},
        {id:"com2", text:"I feel capable at what I do."},
        {id:"com3", text:"I feel competent to achieve my goals."},
        {id:"com4", text:"I feel I can successfully complete difficult tasks."},
        {id:"com5", text:"I have serious doubts about whether I can do things well."},
        {id:"com6", text:"I feel disappointed with many of my performance."},
        {id:"com7", text:"I feel insecure about my abilities."},
        {id:"com8", text:"I feel like a failure because of the mistakes I made."},
        {id:"rel1", text:"I feel that the people I care about also care about me."},
        {id:"rel2", text:"I feel connected with people who care for me, and for whom I care."},
        {id:"rel3", text:"I feel close and connected with other people who are important to me."},
        {id:"rel4", text:"I experience a warm feeling with the people I spend time with."},
        {id:"rel5", text:"I feel excluded from the group I want to belong to."},
        {id:"rel6", text:"I feel that people who are important to me are cold and distant towards me."},
        {id:"rel7", text:"I have the impression that people I spend time with dislike me."},
        {id:"rel8", text:"I feel the relationships I have are just superficial."}
      ]
    }]
  }
 
    ]
  },
  {
    title:"Arc 3 — The Stage Play",
     episodes: [
      {
        title:"Episode 18",
        subscales:[{
          label:"Voices in the Comments",
          items:[
           {id:"sali1", text: "You spend a lot of time thinking about social media or planning use of it.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
           {id:"tole1", text:"You feel an urge to use social media more and more.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
           {id:"moo1", text:"You use social media in order to forget about personal problems.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
           {id:"rela1", text:"You have tried to cut down on the use of social media without success.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
           {id:"with1", text:"You become restless or troubled if you are prohibited from using social media.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
           {id:"conf1", text:"You use social media so much that it has had a negative impact on your job/studies.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
           {id:"YAS1", text:"Youtube has become the most important activity in my life.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree nor disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
        {id:"YAS2", text:"I use Youtube as a way of changing my mood.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree nor disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
        {id:"YAS3", text:"Over time I have spent more and more time on Youtube.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree nor disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
        {id:"YAS4", text:"If I am unable to use Youtube, I feel irritable on restless.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree nor disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
        {id:"YAS5", text:"My Youtube use has caused conflicts with my studies/work or social life.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree nor disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
        {id:"YAS6", text:"I have tried to cut down on my Youtube use, but without success.",likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree nor disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
        {id:"INSTA1", text:"How often do you prefer the excitement of Instagram instead of being with your close friends?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA2", text:"How often do you form new relationships with fellow Instagram users?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA3", text:"How often do you become defensive or secretive when anyone asks you what you do on Instagram?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA4", text:"How often do your grades or schoolwork suffer because of the amount of time you spend on Instagram?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA5", text:"How often do you snap, yell, or act annoyed if someone bothers you while you are on Instagram?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA6", text:"How often do you try to hide how long you have been on Instagram?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA7", text:"How often do you choose to spend more time on Instagram over going out with others?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA8", text:"How often do you feel depressed, moody, or nervous when you are not on Instagram, which goes away once you are back on Instagram?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA9", text:"How often do you try to cut down the amount of time you spend on Instagram and fail?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA10", text:"How often do you check your Instagram before something else that you need to do?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA11", text:"How often do you block out disturbing thoughts about your life with soothing thoughts of Instagram?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA12", text:"How often do you find yourself anticipating when you will go on Instagram again?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA13", text:"How often do you fear that life without Instagram would be boring, empty, and joyless?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA14", text:"How often do you lose sleep due to late-night log-ins to Instagram?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}},
        {id:"INSTA15", text:"How often do you find yourself saying “just a few more minutes” when on Instagram?",likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Occasionally"},{value:4, label:"Often"},{value:5, label:"Very often"},{value:6, label:"Always"}]}}
          ]
          }
        ]
      },
      {
        title:"Episode 19",
        subscales:[{
          label:"Short Clips, Long Nights",
          items:[
            {id:"tiktok1", text:"During the last 12 months...I think about how I could reduce my work/study time to spend more time on TikTok.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok2", text:"During the last 12 months...I have TikTok in my mind even when I am not using it.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok3", text:"During the last 12 months...I feel calm when I use TikTok.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok4", text:"During the last 12 months...I use TikTok as a getaway from my problems and my thoughts.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok5", text:"During the last 12 months...I have had difficulties controlling the time I spend on TikTok.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok6", text:"During the last 12 months...I have had difficulties closing TikTok.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok7", text:"During the last 12 months...I want to use TikTok more and more.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok8", text:"During the last 12 months...I feel bad when I cannot use TikTok for some time.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok9", text:"During the last 12 months...I feel sad when I cannot use TikTok for some time.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok10", text:"During the last 12 months...I don’t get enough time to do things I want to do because I spend a lot of time on TikTok.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok11", text:"During the last 12 months...I lose sleep due to excessive use of TikTok.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok12", text:"During the last 12 months...I am not able to concentrate on my work/study due to TikTok use.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok13", text:"During the last 12 months...I use TikTok so much that it has had a negative impacton my work/study.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok14", text:"During the last 12 months...I feel depressed when I do not use TikTok, which disappears when I use it.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
            {id:"tiktok15", text:"During the last 12 months...I feel anxious when I do not use TikTok, which disappears when I use it.", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Very rarely"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}}
          ]
        }]
      },
      {
        title:"Episode 20",
        subscales:[{
          label:"Urges Hard to Control",
          likert:{min:0, max:6, step:1, type:"buttons", values:[{value:0, label:"Does not describe me at all"},{value:1, label:"1"},{value:2, label:"2"},{value:3, label:"Describe me somewhat"},{value:4, label:"4"},{value:5, label:"5"},{value:6, label:"Describes me very well"}]},
          items:[
          {id:"radalcohol1", text:"Drinking is like a slippery slope, I end up drinking more than I wanted to."},
          {id:"radalcohol2", text:"My drinking has caused a disagreement or two."},
          {id:"radalcohol3", text:"Because I was drinking, I wasn’t able to get as many things done at home, work, or school."},
          {id:"radalcohol4", text:"I probably think about drinking more than most people do."},
          {id:"radalcohol5", text:"It’s hard to cut down, even though I know drinking isn’t good for my health."},
          {id:"raddrug1", text:"I worry about my health because of my drug use."},
          {id:"raddrug2", text:"With drugs, I can get carried away and use a lot more than I wanted to."},
          {id:"raddrug3", text:"My drug use prevents me from getting too close to people."},
          {id:"raddrug4", text:"My responsibilities can fall through the cracks because of my drug use."},
          {id:"raddrug5", text:"There are times that I feel a strong urge to use drugs."},
          {id:"radsmoke1", text:"At certain times of the day, I find myself really wanting a cigarette."},
          {id:"radsmoke2", text:"Sometimes my cravings for cigarettes are powerful."},
          {id:"radsmoke3", text:"When I get stressed, I can smoke a lot more than I planned."},
          {id:"radsmoke4", text:"Sometimes I feel driven to smoke."},
          {id:"radsmoke5", text:"I still smoke even though people tell me it’s bad for my health."},
          {id:"radgambling1", text:"Time gets away from me when I am gambling."},
          {id:"radgambling2", text:"If I lose a lot of money, I can feel down for several days."},
          {id:"radgambling3", text:"I get distracted by thoughts of gambling."},
          {id:"radgambling4", text:"I may skip out on certain things so I can go gamble."},
          {id:"radgambling5", text:"Gambling has caused problems for me with my friends/family."},
          {id:"radbinge1", text:"Sometimes my cravings for certain foods are overpowering."},
          {id:"radbinge2", text:"Being unable to control my eating can cause some stress in my relationships."},
          {id:"radbinge3", text:"I think I am less happy because of my binge eating."},
          {id:"radbinge4", text:"I can feel so upset from binge eating that I don’t get to things that I said I would."},
          {id:"radbinge5", text:"I tend to lose control when I eat, despite my good intentions."},
          {id:"radporn1", text:"I can feel a strong desire to engage in sexual activity."},
          {id:"radporn2", text:"When it comes to sex/porn, I almost always want more."},
          {id:"radporn3", text:"I find myself thinking about how good it would feel to look at pornography or engage in other sexual behaviors."},
          {id:"radporn4", text:"Porn and sex can make me feel better, but it can also make me feel worse."},
          {id:"radporn5", text:"I am very preoccupied by sexual thoughts and/or desires."}
          ]
        }]
      },
      {
        title:"Episode 21",
        subscales:[{
          label:"One More Take",
          items:[
            {id:"gas1", text:"Did you think about playing a game all day long?", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
        {id:"gas2", text:"Did you spend increasing amounts of time on games?", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
        {id:"gas3", text:"Did you play games to forget about real life?", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
        {id:"gas4", text:"Were you unable to reduce your time spend on games?", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
        {id:"gas5", text:"Did you feel bad when you where unable to play?", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
        {id:"gas6", text:"Did you have fights with others (e.g. family, friends) over your time spent on games?", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
        {id:"gas7", text:"Did you neglect other important activities (e.g. school work, sports) to play games?", likert:{min:1, max:5, step:1, type:"buttons",values:[{value:1, label:"Never"},{value:2, label:"Rarely"},{value:3, label:"Sometimes"},{value:4, label:"Often"},{value:5, label:"Very often"}]}},
        {id:"cr1", text:"When I want to feel more positive emotion (such as joy or amusement), I change what I’m thinking about.", likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}]}},
        {id:"cr3", text:"When I want to feel less negative emotion (such as sadness or anger), I changewhat I’m thinking about. ",likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}]}},
        {id:"cr5", text:"When I’m faced with a stressful situation, I make myself think about it in a way that helps me stay calm. ",likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}]}},
        {id:"cr7", text:"When I want to feel more positive emotion, I change the way I’m thinking aboutthe situation. ",likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}]}},
        {id:"cr8", text:"I control my emotions by changing the way I think about the situation I’m in. ",likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}]}},
        {id:"cr10", text:"When I want to feel less negative emotion, I change the way I’m thinking about the situation. ",likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}]}},
        {id:"es2", text:"I keep my emotions to myself.",likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}]}},
        {id:"es4", text:"When I am feeling positive emotions, I am careful not to express them.",likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}]}},
        {id:"es6", text:"I control my emotions by not expressing them.",likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}]}},
        {id:"es9", text:"When I am feeling negative emotions, I make sure not to express them. ",likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7,label:"Strongly agree"}]}},
          ]
        }
       ]
      },
 
      {
        title:"Episode 22",
        subscales:[{
          label:"The World Inside the Screen",
          likert:{min:0, max:4, step:1, type:"buttons", values:[{value:0, label:"Never"},{value:1, label:"Rarely"},{value:2, label:"Sometimes"},{value:3, label:"Often"},{value:4, label:"Always"}]},
          items:[
            {id:"clc1", text:"How many times have you been watching anime series more than you would have?"},
            {id:"clc2", text:"Do you happen to neglect household chores to spend more time watching anime series?"},
            {id:"clc3", text:"Do you often read reviews and opinions about new anime series"},
            {id:"clc4", text:"How many times do you find yourself diverting your attention from negative thoughts with the consoling thought of your favorite anime series?"},
            {id:"clc5", text:"Do you happen to foretaste the moment you will watch an anime series again?"},
            {id:"clc6", text:"Do you happen to find yourself saying `one more episode and I`ll turn it off` when you watch an anime series"},
            {id:"clc7", text:"Are you interested in new releases anime series?"},
            {id:"clc8", text:"Does thinking about the moments when you watch your favorite anime series help you manage your stressful moments?"},
            {id:"spnd1", text:"Do people you hand out with complain about the amount of time you spend watching anime series?"},
            {id:"spnd2", text:"Do you happen to react abruptly, raise your voice, or rudely reply if someone disturbs you while you are watching an anime series?"},
            {id:"spnd3", text:"Do you sleep less to stay up late to watch an anime series?"},
            {id:"spnd4", text:"Do you try to minimize or hide how much time you spend watching an anime series?"},
            {id:"spnd5", text:"Do you happen to choose to spend more time watching an anime series rather than hanging out with others?"},
            {id:"pphc1", text:"Do you happen to concentrate on your thoughts on anime series and fantasize about the evolution of the plot?"},
            {id:"pphc2", text:"Do you often feel depressed,irritable or nervous when you can`t watch an anime series?"},
            {id:"pphc3", text:"Do you happen to think that people overestimate the time you spend watching anime series?"},
            {id:"cmm1", text:"Do you happen to check out the new anime series releases before doing anything else important?"},
            {id:"cmm2", text:"Do you try to minimize when someone points out time you spend watching anime series?"},
            {id:"cmm3", text:"Do you happen to think that your life without the anime series would be boring, empty and joyless"},
            {id:"cmm4", text:"Do you happen to feel good when you are able to watch an anime series again?"},
 
          ]
        }]
      }
    ]
  },
  {
   title:"Arc 4 — The Scandal",
     episodes: [
      {
       title:"Episode 23",
       subscales:[{
        label:"Letting Go of an Old Grudge",
        likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Almost always false of me"},{value:2, label:"2"},{value:3, label:"More often false of me"},{value:4, label:"4"},{value:5, label:"More often true of me"},{value:6, label:"6"},{value:7, label:"Almost always true of me"}]},
        items:[
          {id: "fos1", text: "Although I feel badly at first when I mess up, over time I can give myself some slack."},
          {id: "fos2", text: "I hold grudges against myself for negative things I've done."},
          {id: "fos3", text: "I learn from my mistakes and then I move on. "},
          {id: "fos4", text: "It is really hard for me to accept myself once I've messed up."},
          {id: "fos5", text: "With time, I am understanding of myself for mistakes I've made. "},
          {id: "fos6", text: "I don't stop criticizing myself for negative things I've felt, thought, said, or done."},
          {id: "foo1", text: "I continue to punish a person who has done something that I think is wrong. "},
          {id: "foo2", text: "With time, I am understanding of others who have hurt me. "},
          {id: "foo3", text: "If others mess up, I hold it against them for a long time.  "},
          {id: "foo4", text: "It’s really hard for me to forgive a person who has done me wrong. "},
          {id: "foo5", text: "I eventually make peace with people who have hurt me. "},
          {id: "foo6", text: "I eventually stop blaming people who treated me badly. "},
          {id: "fosi1", text: "When things go wrong for reasons that can't be helped, I get stuck in my anger."},
          {id: "fosi2", text: "With time, I can be understanding of bad circumstances in my life."},
          {id: "fosi3", text: "If I am disappointed by uncontrollable circumstances in my life, I continue to think negatively about them."},
          {id: "fosi4", text: "I eventually make peace with bad situations in my life."},
          {id: "fosi5", text: "It's really hard for me to accept negative situations in my life."},
          {id: "fosi6", text: "Eventually I let go of negative thoughts about bad circumstances that are beyond anyone's control."},
        ]
       }]
      },
      {
        title:"Episode 24",
        subscales:[{
          label:"Kindness Toward Yourself",
          likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Almost never"},{value:2, label:"Occasionally"},{value:3, label:"About half of the time"},{value:4, label:"Fairly"},{value:5, label:"Almost always"}]},
          items:[
            {id: "sk1", text: "I'm kind to myself when I'm experiencing suffering."},
            {id: "sk2", text: "When I'm going through a very hard time, I give myself the caring and tenderness I need."},
            {id: "sk3", text: "I'm tolerant of my own flaws and inadequacies. "},
            {id: "sk4", text: "I try to be understanding and patient towards those aspects of my personality I don't like. "},
            {id: "sk5", text: "I try to consume myself with feelings of care and concern when I'm having a hard time."},
            {id: "sj1", text: "I'm disapproving and judgemental about my own flows and inadequacies. "},
            {id: "sj2", text: "When times, are actually difficult, I tend to be tough on myself."},
            {id: "sj3", text: "I'm tolerant and impatient towards those aspects of my person. "},
            {id: "sj4", text: "When I see aspects of myself that I don't like, I get quite down on myself. "},
            {id: "sj5", text: "I can be a bit cold-hearted towards myself when I'm experiencing suffering. "},
            {id: "ch1", text: "When things go wrong in my life, I see the difficulties as part of life that everyone goes thought."},
            {id: "ch2", text: "When I feel inadequate in some way, I try to remind myself that feelings of inadequacy are shared by most people. "},
            {id: "ch3", text: "When I'm feeling down, I try to remind myself that there are lots of other people in world feeling like I am."},
            {id: "ch4", text: "I try to see my failings as part of the human condition. "},
            {id: "iso1", text: "When I'm feeling down, I tend to feel like most other people are probably happier than I am."},
            {id: "iso2", text: "When I'm failing at something that's important to me, I tend to feel alone in my failure.  "},
            {id: "iso3", text: "When I feel inadequate in some way, I tend to feel as if most other people probably happier than I am. "},
            {id: "iso4", text: "When I'm feeling down I tent to obsess and fixate on everything that's wrong. "},
            {id: "min1", text: "When something upsets me I try to keep my emotions in balance. "},
            {id: "min2", text: "When I'm feeling down I try to approach my feelings with curiosity and openess.  "},
            {id: "min3", text: "When something painful happens I try to take a balanced view of the situation. "},
            {id: "min4", text: "When I'm feeling down I try to keep my emotions in balance.  "},
            {id: "oi1", text: "When I'm feeling down I tend to obsess and fixate on everything that’s wrong. "},
            {id: "oi2", text: "When I fail at something important to me I become consumed by feelings of inadequacy.  "},
            {id: "oi3", text: "When something painful happens I tend to blow the incident out of proportion. "},
            {id: "oi4", text: "When I'm feeling down I tend to obsess and fixate on everything that’s wrong. "}
          ]
        }]
      },
      {
        title:"Episode 25",
        subscales:[{
          label:"Seeing the Rival’s Struggle",
          likert:{min:1, max:10, step:1, type:"slider",values:[{value:1, label:"Never"},{value:2, label:"2"},{value:3, label:"3"},{value:4, label:"4"},{value:5, label:"5"},{value:6, label:"6"},{value:7, label:"7"},{value:8, label:"8"},{value:9, label:"9"},{value:10, label:"Always"}]},
          items:[
            {id:"tfc9", text:"When someone fails, I think they are stupid."},
            {id:"tfc10", text:"When someone makes a mistake, I feel mad at them."},
            {id:"tfc11", text:"I feel angry at others when they struggle."},
            {id:"tfc12", text:"I feel annoyed at others when they don't understand things quickly. "},
            {id:"tfc14", text:"When someone has a hard time, I think it is their mistake."},
            {id:"tfc15", text:"I feel irritated by the shortcomings of others."},
            {id:"tfc16", text:"I am very critical of other people’s flaws and inadequacies."},
            {id:"tfc17", text:"I judge others harshly when they make a mistake. "},
            {id:"tfc18", text:"When someone fails, I think they deserve it. "},
            {id:"cwo2", text:"My suffering helps me connect with other people’s suffering."},
            {id:"cwo6", text:"My difficulties make it easier to understand other people's difficulties."},
            {id:"cwo7", text:"My struggles allow me to understand the struggles of others."},
            {id:"cwo8", text:"I notice the commonalities between my suffering and the suffering of others. "},
            {id:"iac1", text:"When someone is feeling bad, I do whatever I can to make them feel better."},
            {id:"iac3", text:"When someone is feeling bad, I try to soothe them."},
            {id:"iac4", text:"I try to comfort others when they are suffering."},
            {id:"iac5", text:"I take care of others when they are in need. "},
            {id:"iac13", text:"I help others when they have a tough time. "}
          ]
        }]
      }
    ]
  },
  {
   title:"Arc 5 — Mentor and Idol",
     episodes: [
      {
        title:"Episode 26",
        subscales:[{
          label:"Getting Through the Production",
          likert:{min:1, max:4, step:1, type:"buttons",values:[{value:1, label:"I haven`t been doing this at all"},{value:2, label:"I`ve been doing this a little bit"},{value:3,label:"I`ve been doing this a medium amount"},{value:4, label:"I`ve been doing this a lot"}]},
          items:[
            {id: "sd1", text: "I've been turning to work or other activities to take my mind off things. "},
            {id: "sd2", text: "I've been doing something to think about it less, such as going to movies, watching TV, reading, daydreaming, sleeping, or shopping."},
            {id: "ac1", text: "I've been concentrating my efforts on doing something about the situation I'm in.  "},
            {id: "ac2", text: "I've been taking action to try to make the situation better."},
            {id: "de1", text: "I've been saying to myself `this isn't real`. "},
            {id: "de2", text: "I've been refusing to believe that it has happened. "},
            {id: "su1", text: "I've been using alcohol or other drugs to help me get through it. "},
            {id: "su2", text: "I've been making fun of the situation. "},
            {id: "essup1", text: "I've been getting emotional support from others. "},
            {id: "essup2", text: "I've been getting comfort and understanding from someone."},
            {id: "is1", text: "I've been getting help and advice from other people."},
            {id: "is2", text: "I've been trying to get advice or help from other people about what to do."},
            {id: "bd1", text: "I've giving up trying to deal with it. "},
            {id: "bd2", text: "I've been giving up the attempt to cope. "},
            {id: "ve1", text: "I've been saying things to let my unpleasant feelings escape. "},
            {id: "ve2", text: "I've been expressing my negative feelings. "},
            {id: "pr1", text: "I've been trying to see it in a different light, to make it seem more positive."},
            {id: "pr2", text: "I've been looking for something good in what is happening. "},
            {id: "pl1", text: "I've been trying to come up with a strategy about what to do.  "},
            {id: "pl2", text: "I've been thinking hard about what steps to take.  "},
            {id: "hu1", text: "I've been making fun of the situation. "},
            {id: "hu2", text: "I've been making jokes about it.  "},
            {id: "apt1", text: "I've been accepting the reality of the fact that it has happened.  "},
            {id: "apt2", text: "I've been learning to live with it.  "},
            {id: "re1", text: "I've been trying to find comfort in my religion or spiritual beliefs. "},
            {id: "re2", text: "I've been praying or meditating.  "},
            {id: "sb1", text: "I've been criticizing myself.   "},
            {id: "sb2", text: "I've been blaming myself for things that happened."}
        
        
      
          ]
        }]
      },
      {
        title:"Episode 27",
        subscales:[{
          label:"Fees and Expenses",
          items:[
            {id:"sele1", text:"I open up for positive experiences.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"sele2", text:"I get to experience new things about myself.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"sele3", text:"I learn more about myself.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"sele4", text:"I get to learn new things.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"sele5", text:"My life is enriched.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"sele6", text:"I feel that I am developing myself.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"sesu1", text:"I try to suppress my problems.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"sesu2", text:"I try to get way from myself.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"sesu3", text:"I try to suppress my negative thoughts.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"sesu4", text:"I try to shut out everything that is difficult.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"sesu5", text:"I try to forgot the things that are unpleasant in my life.",likert:{min:1, max:7, step:1, type:"buttons",values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3,label:"Somewhat disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Somewhat agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]}},
            {id:"maa1", text:"I have enough money to afford the kind of food we should eat.",likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree or disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
            {id:"maa2", text:"I have enough money to afford the kind of clothing we should have.",likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree or disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
            {id:"maa3", text:"I have enough money to afford the kind of medical care that we should have.",likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree or disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
            {id:"maa4", text:"I have enough money to afford the kind of housing we should have.",likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree or disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
            {id:"maa5", text:"I have money left over at the end of the month.",likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree or disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
            {id:"pfs1", text:"I worry about my monthly financial obligations.",likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree or disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
            {id:"pfs2", text:"I have difficulty paying my bills each month.",likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree or disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}},
            {id:"pfs3", text:"I feel that my financial situation is beyond my control.",likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Neither agree or disagree"},{value:4, label:"Agree"},{value:5, label:"Strongly agree"}]}}
          ]
        }]
      },
      {
        title:"Episode 28",
        subscales:[{
          label:"The Home You Came From",
          likert:{min:0, max:1, step:1, type:"buttons", values:[{value:0, label:"No"},{value:1, label:"Yes"}]},
          items:[
            { id: "bce1",  text: "Did you have at least one caregiver with whom you felt safe?" },
            { id: "bce2",  text: "Did you have at least one good friend?" },
            { id: "bce3",  text: "Did you have beliefs that gave you comfort?" },
            { id: "bce4",  text: "Did you like school?" },
            { id: "bce5",  text: "Did you have at least one teacher who cared about you?" },
            { id: "bce6",  text: "Did you have good neighbors?" },
            { id: "bce7",  text: "Was there an adult (not a parent/caregiver) who could provide you with support or advice?" },
            { id: "bce8",  text: "Did you have opportunities to have a good time?" },
            { id: "bce9",  text: "Did you like yourself or feel comfortable with yourself?" },
            { id: "bce10", text: "Did you have a predictable home routine, like regular meals and a regular bedtime?" },
            { id: "bce11", text: "Did you feel accepted for who you were? ?" },
            { id: "bce12", text: "Was there at least one adult who cared about your progress and achievements in school?" },
            { id: "bce13", text: "Were you usually able to get a good night’s sleep?" },
            { id: "bce14", text: "Did you have access to food that was healthy and nutritious?" },
            { id: "bce15", text: "Did you have access to adequate medical care when you needed it?" },
            { id: "bce16", text: "Did you feel that you were treated fairly (e.g. in your family and community)?" },
            { id: "bce17", text: "Did you have adequate law enforcement in your community that made you feel safe?" },
            { id: "bce18", text: "Did you have at least one person to teach you to say 'No' to negative influences?" },
            { id: "bce19", text: "Did you regularly spend time outside in the sunshine or around nature?" },
            { id: "bce20", text: "Did you have something that you felt you were good at or that made you proud?" },
          ]
        }]
      },
      {
        title:"Episode 29",
        subscales:[{
          label:"The Star Who Stays Inside",
          likert:{min:0, max:4, step:1, type:"buttons",values:[{value:0, label:"Strongly disagree"},{value:1, label:"Disagree"},{value:2, label:"Neither agree nor disagree"},{value:3, label:"Agree"},{value:4, label:"Strongly agree"}]},
          items:[
            {id: "si1", text: "I stay at home most of the day."},
            {id: "si2", text: "I do not leave my house. "},
            {id: "si3", text: "I lack interest in going outside. "},
            {id: "si4", text: "I feel that I do not have a place where I belong in society. "},
            {id: "si5", text: "I feel that I am not being helpful to anyone. "},
            {id: "si6", text: "I feel like there is a wall between me and the rest of the world. "},
            {id: "si7", text: "I feel that I am not a person of value. "},
            {id: "si8", text: "I feel that nobody cares about me.  "},
            {id: "si9", text: "I feel that it is not worth talking to anyone. "},
            {id: "si10", text: "I do not have anyone with whom I can discuss important matters. "},
            {id: "ec1", text: "I find it difficult to talk to people. "},
            {id: "ec2", text: "I feel that people look down on me. "},
            {id: "ec3", text: "I feel nervous when I see people I know.  "},
            {id: "ec4", text: "I feel uncomfortable when I see people I know.  "},
            {id: "ec5", text: "I am worried about what others think of me.  "},
            {id: "ec6", text: "I worry about how others will look at me. "},
            {id: "ec7", text: "I find it difficult to be with other people."},
            {id: "ec8", text: "I avoid social situations."},
            {id: "sa1", text: "I avoid talking to people as much as possible. "},
            {id: "sa2", text: "I am not interested in being with other people. "},
            {id: "sa3", text: "I do not have any friends. "},
            {id: "sa4", text: "I do not have any close friends. "},
            {id: "sa5", text: "I feel lonely. "},
            {id: "sa6", text: "I feel that I am all alone. "},
            {id: "sa7", text: "I find it difficult to maintain friendships. "},
          ]
        }]
      },
      {
        title:"Episode 30",
        subscales:[{
          label:"A Place in the Group",
          likert:{min:1, max:5, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Moderately disagree"},{value:3, label:"Neither agree nor disagree"},{value:4, label:"Moderately agree"},{value:5, label:"Strongly agree"}]},
          items:[
            {id: "nb1", text: "If other people do not seem to accept me, I do not let it bother me. "},
            {id: "nb2", text: "I try to avoid doing things that might cause others to learn negative things about me."},
            {id: "nb3", text: "I seldom worry about whether other people care about me. "},
            {id: "nb4", text: "I need to feel that there are people I can turn to in times of need."},
            {id: "nb5", text: "I want other people to accept me. "},
            {id: "nb6", text: "I do not like being alone."},
            {id: "nb7", text: "Being apart from my friends for long periods of time does not bother me. "},
            {id: "nb8", text: "I have a strong need to belong."},
            {id: "nb9", text: "My feelings are easily hurt when I feel that others do not accept me. "},
            {id: "nb10", text: "I rarely worry about my social popularity."},
          ]
        }]
      }
    ] 
  },
  {
    title:"Arc 6 — The Final Curtain",
    episodes:[
      
      {
        title:"Episode 31",
        subscales:[{
          label:"Riddles of the Producer",
          items:[
            {id: 'crt_1', text: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost? _____ cents',type:"text"},
            {id: 'crt_2', text: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets? _____ minutes', type:"text"},
            {id: 'crt_3', text: 'In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake? _____ days', type:"text"},
            {id: 'bnt_1', text: 'Out of 1,000 people in a small town, 500 are members of a choir. Out of these 500 members, 100 are men. Out of the 500 inhabitants that are not in the choir, 300 are men. What is the probability that a randomly drawn man is a member of the choir? Please indicate the probability in percent. _____ %', type:"text"},
            {id: 'bnt_2', text: 'Imagine we are throwing a five-sided die 50 times. On average, out of these 50 throws, how many times would this five-sided die show an odd number (1, 3 or 5)? _____ out of 50 throws',type:"text"},
            {id: 'bnt_3', text: 'In a forest, 20% of mushrooms are red, 50% are brown, and 30% are white. A red mushroom is poisonous with a probability of 20%. A mushroom that is not red is poisonous with a probability of 5%. What is the probability that a poisonous mushroom in the forest is red? _____ %', type:"text"},
            {id: 'crt2_1', text: "If you're running a race and you pass the person in second place, what place are you in?", type:"text" },
            {id: 'crt2_2', text: 'A farmer had 15 sheep and all but 8 died. How many are left?', type:"text"},
            {id: 'crt2_3', text: "Emily's father has three daughters. The first two are named April and May. What is the third daughter's name?", type:"text"},
            {id: 'crt2_4', text: "How many cubic feet of dirt are there in a hole that is 3' deep x 3' wide x 3' long?",type:"text"}
          ]
        }]
      }
    ]
  },
  {
    title:"Epilogue — After the Credits",
     episodes: [
      {
        title:"Episode 32",
        subscales:[{
          label:"Pulled Into the Story",
          likert:{min:1, max:7, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Slightly disagree"},{value:4, label:"Neither agree nor disagree"},{value:5, label:"Slightly agree"},{value:6, label:"Agree"},{value:7, label:"Strongly agree"}]},
          items:[
            {id:"aswe1", text:"I am often impatient to find our how an anime story ends."},
            {id:"aswe2", text:"I am often glued to an anime, yearning to see how everything plays out."},
            {id:"aswe3", text:"Anime series arouse my curiosity easily."},
            {id:"aswe4", text:"It is easy for me to get involved with the feelings of the charactersin an anime."},
            {id:"aswe5", text:"I am often affected emotionally by anime series."},
            {id:"aswe6", text:"I often feel happy when a character succeeds and I feel sad when they suffer in some way."},
            {id:"aswe7", text:"I often become very involved in an anime that I would otherwise consider unrealistic just for the fun of it."},
            {id:"aswe8", text:"I am easily immerse even in unrealistic anime stories."},
            {id:"aswe9", text:"I often feel myself accepting anime story events that I might have otherwise considered unrealistic."},
            {id:"aswe10", text:"While watching an anime series, the story world is often closer to me than the real world."},
            {id:"aswe11", text:"I often feel that an anime series creates a new world, and then that world suddenly disappears when the anime series ends."},
            {id:"aswe12", text:"When I watch an anime series, I often feel that my body is in the room, but my mind is inside the world created by the anime story."}
          ]
        }]
      },
      {
        title:"Episode 33",
        subscales:[{
          label:"After the Final Credits",
          likert:{min:1, max:6, step:1, type:"buttons", values:[{value:1, label:"Strongly disagree"},{value:2, label:"Disagree"},{value:3, label:"Slightly disagree"},{value:4, label:"Slightly agree"},{value:5, label:"Agree"},{value:6, label:"Strongly agree"}]},
          items:[
            {id:"nise1", text:"Thinking about anime story and characters help me know who I am as a person."},
            {id:"nise2", text:"I am curious to understand how anime story and characters have changed me as a person."},
            {id:"nise3", text:"I think a lot about connections between anime  story and characters experiences and my life experiences I have had (e.g.  How one anime experiences caused a better understanding of a later life experience"},
            {id:"nise4", text:"I have learned lessons and gained insights from thinking about anime story and characters. "},
            {id:"nise5", text:"As time passes, I notice that I increasingly learn and grow from anime story and characters. "},
            {id:"nise6", text:"I want to get the facts right when I think about what anime story and characters and their impact for my life. "},
            {id:"nise7", text:"In anime story and characters , I think it's important to know where and when things have happened. "},
            {id:"nise8", text:"Anime story and characters usually have a clear beginning, middle and end."},
            {id:"nise9", text:"It matters to me to have a coherent anime story and relatable characters. "},
            {id:"nise10", text:"I want to get the timeline of anime story and characters correct as much as possible."},
            {id:"nise11", text:"Looking back on my life story, I recognize a sense of belongingness with anime story and characters.  "},
            {id:"nise12", text:"Most bad things that happened in anime story and with characters have eventually resolved in a positive way."},
            {id:"nise13", text:"Overall I would consider my life story to be more positive than negative when I am thinking on anime story and characters."},
            {id:"nise14", text:"The anime story and characters made me to think that the story of my life is a highly  optimistic one. "},
            {id:"nise15", text:"In my life story, anime story and characters have largely been the driving force, rather than external world. "},
            {id:"nise16", text:"When I am immersing in anime story and characters, I end up feeling confused about who I am as a person. "},
            {id:"nise17", text:"When I immerse into anime story and characters, I believed that I have had no control over what has happened in the story of my life. "},
            {id:"nise18", text:"In anime story and characters, I envisioned myself as a protagonist able to love and to be loved by others. "},
            {id:"nise19", text:"In anime story and characters plot, I notice a pattern of how bad events, even the most grievous ones eventually turned good in the end."},
            {id:"nise20", text:"When I immerse myself in anime story, my life story doesn't feels like a puzzle and everything is falling into place as it should."},
 
          ]
        }]
      }
    ]
  }];
 


  interface DemographicPayload {
  age?: number;
  gender?: string;
  country?: string;
  citizenship?: string;
  ethnicity?: string;
  education?: string;
  occupation?: string;
  incomeSource?: string;
  financeFeel?: string;
  relationshipStatus?: string;
  living?: string;
  dailyIndoorHours?: string;
  religion?: string;
  hasCondition?: boolean;
  conditionType?: string;
  dailyAnimeEpisodes?: number;
  watchesInNativeLanguage?: boolean;
  watchLanguage?: string;
  languageLevel?: string;
  firstAnimeAgeRange?: string;
}

  interface OshiNoKoQuizProps {
  onFinish: (sessionId:string) => void;
  onBack: () => void;
  demographics?:DemographicPayload
}
 
export default function OshiNoKoQuiz({ onFinish, onBack, demographics }: OshiNoKoQuizProps) {
   const [arcIdx,  setArcIdx]  = useState(0);
    const [epIdx,   setEpIdx]   = useState(0);
    const [subIdx,  setSubIdx]  = useState(0);
  
    // ── MODIFICAT: acceptă și string, pentru itemii de tip "text" ──────────
    const [responses, setResponses] = useState<Record<string, number | string>>({});
  
    const [sessionId, setSessionId] = useState<string | null>(null);
  
    useEffect(() => {
      let cancelled = false;
  
      startSession(ANIME_SLUG, demographics).then((data) => {
        if (!cancelled) {
          setSessionId(data.sessionId);
        }
      });
  
      return () => {
        cancelled = true;
      };
    }, []);
  
    const t = THEME;
    const currentArc = CATALOG[arcIdx];
    const currentEp  = currentArc?.episodes[epIdx];
    const hasSubscales = (currentEp?.subscales?.length ?? 0) > 0;
    const currentSub   = hasSubscales ? currentEp.subscales[subIdx] : null;
    const episodeImage = getEpisodeImage(currentEp?.title ?? '');
  
    if (!currentArc || !currentEp) {
      return (
        <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 ${t.bg}`}>
          <p className={`text-2xl font-bold mb-6 ${t.text}`}>All sections complete!</p>
          <button onClick={() => onFinish(sessionId!)} className={`px-8 py-3.5 font-bold uppercase tracking-widest text-[10px] rounded-md border ${t.btnOutline}`}>
            See Results
          </button>
        </div>
      );
    }
  
    // ── MODIFICAT: folosește chei compuse (episode.title + item.id), ca să
    // nu se mai suprascrie răspunsurile la id-uri duplicate între instrumente
    // diferite. Trimite spre API tot itemId-ul original, neschimbat. ────────
    const handleNext = async () => {
      if (hasSubscales && currentSub && sessionId) {
        const payload = currentSub.items
          .map((item) => {
            const raw = responses[getResponseKey(currentEp.title, item.id)];
            const isText = typeof raw === "string";
            return {
              itemId: item.id,
              episodeTitle: currentEp.title,
              value: isText ? undefined : (raw as number | undefined),
              textValue: isText ? (raw as string) : undefined,
            };
          })
          .filter((r) => r.value !== undefined || r.textValue !== undefined);
  
        if (payload.length > 0) {
          await fetch("/api/responses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, responses: payload }),
          });
        }
      }
      if (hasSubscales && subIdx < currentEp.subscales.length - 1) {
        setSubIdx(p => p + 1);
      } else if (epIdx < currentArc.episodes.length - 1) {
        setEpIdx(p => p + 1); setSubIdx(0);
      } else if (arcIdx < CATALOG.length - 1) {
        setArcIdx(p => p + 1); setEpIdx(0); setSubIdx(0);
      } else {
        if (sessionId) {
          await finishSession(sessionId);
        }
        onFinish(sessionId!);
      }
    };
  
    const isLastPage =
      arcIdx === CATALOG.length - 1 &&
      epIdx  === currentArc.episodes.length - 1 &&
      (!hasSubscales || subIdx === currentEp.subscales.length - 1);
  
    // ── INTRO PAGE (episod fara subscale) ────────────────────────────────
     if (!hasSubscales) {
      return (
        <div
          className={`w-full h-full flex flex-col md:flex-row overflow-hidden ${t.bg}`}
          style={{ fontFamily: t.fontFamily }}
        >
          <div className="relative w-full md:w-2/5 h-48 md:h-full flex items-end justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B1218]/60 z-10 hidden md:block" />
            <div className="relative w-full h-[95%] max-w-sm">
              <Image
                src={episodeImage}
                alt={currentEp.title}
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
  
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <span className={`font-bold uppercase tracking-[0.3em] text-[10px] opacity-50 block mb-3 ${t.labelColor}`}>
              {currentArc.title}
            </span>
            <div className="w-16 h-0.5 mb-6" style={{ backgroundColor: t.accentColor }} />
            <h1 className={`text-3xl md:text-4xl font-black uppercase mb-6 ${t.text}`}>
              {currentEp.title}
            </h1>
            <p className={`max-w-md text-base leading-relaxed font-serif italic mb-2 ${t.subText}`}>
              This section covers the <strong>{currentArc.title}</strong> instruments.
            </p>
            <p className={`text-sm opacity-50 mb-10 ${t.subText}`}>
              Answer each item honestly — there are no right or wrong answers.
            </p>
            <div className="flex gap-4">
              <button onClick={onBack}
                className={`px-8 py-3 font-bold uppercase tracking-widest text-[11px] border-2 rounded-lg transition-all ${t.btnOutline}`}>
                Back
              </button>
              <button onClick={handleNext}
                className={`px-10 py-3.5 font-bold uppercase tracking-widest text-[11px] rounded-lg shadow-xl transition-all transform hover:-translate-y-0.5 ${t.btnPrimary}`}>
                Begin Arc →
              </button>
            </div>
          </div>
        </div>
      );
    }
  
    // ── ITEMS PAGE ────────────────────────────────────────────────────────
    if (hasSubscales && currentSub) {
      // ── MODIFICAT: chei compuse peste tot ──────────────────────────────
      const allAnswered = currentSub.items.every(
        (item) => responses[getResponseKey(currentEp.title, item.id)] !== undefined
      );
  
      const answeredCount = currentSub.items.filter(
        (item) => responses[getResponseKey(currentEp.title, item.id)] !== undefined
      ).length;
  
      const progress = (answeredCount / currentSub.items.length) * 100;
  
          return (
        <div
          className={`w-full h-full flex md:flex-row overflow-hidden ${t.bg}`}
          style={{ fontFamily: t.fontFamily }}
        >
          <div className="relative hidden md:block md:w-2/5 overflow-hidden">
            <Image
              src={episodeImage}
              alt={currentEp.title}
              fill
              className="object-contain object-bottom p-6"
              priority
            />
          </div>
  
          <div className="flex-1 flex flex-col overflow-hidden">
  
            <div className={`shrink-0 px-6 pt-4 pb-3 border-b ${t.headerBorder}`}>
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-bold uppercase tracking-widest opacity-40 block ${t.labelColor}`}>
                    {currentArc.title}
                  </span>
                  <h2 className={`text-sm font-black uppercase truncate ${t.text}`}>
                    {currentSub.label}
                  </h2>
                </div>
                <span className={`text-xs font-bold shrink-0 ${t.subText}`}>
                  {answeredCount}/{currentSub.items.length}
                </span>
              </div>
  
              <div className="mt-3 h-1 rounded-full overflow-hidden bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%`, backgroundColor: t.accentColor }}
                />
              </div>
            </div>
  
            {/* ITEMS */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-3">
              {currentSub.items.map((item, idx) => {
                const responseKey = getResponseKey(currentEp.title, item.id);
                const currentValue = responses[responseKey];
  
                // ── NOU: itemi de tip "text" (ex: Chapter 31 — CRT/BNT) ──
                if (item.type === "text") {
                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl p-4 border transition-all duration-200 ${
                        currentValue !== undefined ? t.itemBgAnswered : t.itemBg
                      }`}
                    >
                      <p className={`text-[12px] font-medium mb-3 leading-snug ${t.text}`}>
                        <span className="opacity-30 mr-2 font-black text-xs">{idx + 1}.</span>
                        {item.text}
                      </p>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={(currentValue as string) ?? ""}
                        onChange={(e) =>
                          setResponses((prev) => ({
                            ...prev,
                            [responseKey]: e.target.value,
                          }))
                        }
                        placeholder="Răspunsul tău..."
                        className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none"
                        style={{ borderColor: currentValue !== undefined ? t.accentColor : undefined }}
                      />
                    </div>
                  );
                }
  
                // ── itemi likert (buttons/slider) — cod original, doar cu
                // referințele la id înlocuite cu responseKey ──────────────
                const likert = item.likert ?? currentSub.likert;
                if (!likert) return null;
  
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl p-4 border transition-all duration-200 ${
                      currentValue !== undefined ? t.itemBgAnswered : t.itemBg
                    }`}
                  >
                    <p className={`text-[11px] md:text-xs font-medium mb-3 leading-tight ${t.text}`}>
                      <span className="opacity-30 mr-2 font-black text-xs">{idx + 1}.</span>
                      {item.text}
                    </p>
  
                    {likert.type === "slider" ? (() => {
                      const sliderValue = (currentValue as number) ?? likert.min;
                      const pct =
                        ((sliderValue - likert.min) / (likert.max - likert.min)) * 100;
  
                      return (
                        <div className="px-1 pt-6">
                          <div className="relative h-6">
                            <span
                              className="absolute -translate-x-1/2 text-xs font-black px-3 py-1 rounded-full whitespace-nowrap"
                              style={{
                                left: `${pct}%`,
                                backgroundColor: t.accentColor,
                                color: "#fff",
                              }}
                            >
                              {sliderValue}
                            </span>
                          </div>
  
                          <div className="relative flex items-center h-6">
                            <div className="absolute left-0 right-0 h-2 rounded-full bg-white/15" />
                            <div
                              className="absolute left-0 h-2 rounded-full"
                              style={{ width: `${pct}%`, backgroundColor: t.accentColor }}
                            />
                            <input
                              type="range"
                              min={likert.min}
                              max={likert.max}
                              step={likert.step}
                              value={sliderValue}
                              onChange={(e) =>
                                setResponses((prev) => ({
                                  ...prev,
                                  [responseKey]: Number(e.target.value),
                                }))
                              }
                              className="relative w-full h-2 appearance-none bg-transparent cursor-pointer"
                              style={{ accentColor: t.accentColor }}
                            />
                          </div>
  
                          <div className="flex justify-between items-center mt-1">
                            <span className={`text-[10px] font-semibold opacity-60 ${t.subText}`}>
                              {likert.min}
                            </span>
                            <span className={`text-[10px] font-semibold opacity-60 ${t.subText}`}>
                              {likert.max}
                            </span>
                          </div>
                        </div>
                      );
                    })() : (
                      <div className="flex flex-wrap gap-2">
                        {likert.values.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setResponses((prev) => ({
                                ...prev,
                                [responseKey]: option.value,
                              }))
                            }
                            className={`flex-1 min-w-[80px] py-2 rounded-lg transition-all duration-150 ${
                              currentValue === option.value ? t.ratingSelected : t.ratingDefault
                            }`}
                          >
                            <span className="text-[12px] font-semibold leading-tight">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
  
            {/* FOOTER */}
            <div className={`shrink-0 px-6 py-4 border-t ${t.footerBorder}`}>
              <button
                type="button"
                onClick={handleNext}
                disabled={!allAnswered}
                className={`w-full py-3.5 font-black uppercase tracking-widest text-[11px] rounded-xl transition-all ${
                  allAnswered ? `${t.btnPrimary} shadow-lg` : "opacity-25 cursor-not-allowed bg-white/10 text-white"
                }`}
              >
                {isLastPage ? "Finish & See Results ✓" : "Next →"}
              </button>
  
              {!allAnswered && (
                <p className={`text-center text-[10px] mt-2 opacity-30 ${t.labelColor}`}>
                  {currentSub.items.length - answeredCount} item
                  {currentSub.items.length - answeredCount !== 1 ? "s" : ""} remaining
                </p>
              )}
            </div>
  
          </div>
        </div>
      );
    }
  
    return null;
  }