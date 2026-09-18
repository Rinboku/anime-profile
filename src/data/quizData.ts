import { BIG_FIVE, DARK_TETRAD, UPPS_P, Need_For_Cognition_18, Heartland_Forgiveness_Scale, Self_Compassion_Scale, 
The_Compassion_Scale, Brief_Cope, Hikikomori_Questionnaire_25, Need_To_Belong, FAMILY_SATISFACTION, CERQ_SF,
Psych_Ache, DASS_21, Maladaptative_Daydreaming_16, Ryff_Psychological_Wellbeing, Multidimensional_State_Boredom_Scale,
SHAPS, Basic_Psychological_Needs, Insomnia_Severity_Index, Leisure_Motivation_Scale, BSMAS, SAS_SV, GAS, BWANIME, Relationship_Scales_Questionnaire,
Benevolent_Childhood_Experiences, FINANCIAL_STRAIN_INDEX, The_Escapism_Scale, Anime_Story_World_Engagement_Scale, NISE, RAD,
RSES, SWLS
} from '../app/psychometrics';

// ─────────────────────────────────────────────────────────────────────────
// INTERFEȚE
// ─────────────────────────────────────────────────────────────────────────

export interface LikertOption {
  value: number;
  label: string;
}

export interface LikertConfig {
  min: number;
  max: number;
  step: number;
  values: LikertOption[];
  type: "buttons" | "slider";
}

export interface QuizItem {
  id: string;
  text: string;
  type?: "likert" | "text";
  likert?: LikertConfig;
}

export interface Subscale {
  label: string;
  likert?: LikertConfig;
  items: QuizItem[];
}

export interface Episode {
  id: string;
  title: string;
  subscales: Subscale[];
}

export interface CatalogItem {
  id: string;
  title: string;
  episodes: Episode[];
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

// ─────────────────────────────────────────────────────────────────────────
// MASTER CATALOG
// ─────────────────────────────────────────────────────────────────────────

export const MASTER_CATALOG: CatalogItem[] = [
  { 
    id: "Arc 1",
    title: "Reflection in the water",
    episodes: [
      {
        id: "Episode 1",
        title: "First One",
        subscales: [...BIG_FIVE.subscales]
      },
      {
        id: "Episode 2",
        title: "Shadow and Light",
        subscales: [...DARK_TETRAD.subscales]
      },
      {
        id: "Episode 3",
        title: "Weakness",
        subscales: [...UPPS_P.subscales]
      },
      {
        id: "Episode 4",
        title: "Inquisitive Mind",
        subscales: [...Need_For_Cognition_18.subscales]
      }
    ]
  },
  {
    id: "Arc 2",
    title: "Scars and Wounds",
    episodes: [
      {
        id: "Episode 5",
        title: "Dreams",
        subscales: [...Maladaptative_Daydreaming_16.subscales]
      },
      {
        id: "Episode 6",
        title: "Working through pain",
        subscales: [...Psych_Ache.subscales, ...CERQ_SF.subscales]
      },
      {
        id: "Episode 7",
        title: "Fighting the demons",
        subscales: [...DASS_21.subscales, ...Insomnia_Severity_Index.subscales]
      },
      {
        id: "Episode 8",
        title: "Emerging victorious",
        subscales: [...Ryff_Psychological_Wellbeing.subscales]
      },
      {
        id: "Episode 9",
        title: "Who you are?",
        subscales: [...SHAPS.subscales, ...RSES.subscales]
      },
      {
        id: "Episode 10",
        title: "Dangerous... Yawn",
        subscales: [...Multidimensional_State_Boredom_Scale.subscales]
      },
      {
        id: "Episode 11",
        title: "Preparing nevertheless...",
        subscales: [...Basic_Psychological_Needs.subscales]
      }
    ]
  },
  {
    id: "Arc 3",
    title: "Demons inside",
    episodes: [
      {
        id: "Episode 12",
        title: "Copycat",
        subscales: [...BSMAS.subscales, ...SAS_SV.subscales]
      },
      {
        id: "Episode 13",
        title: "No Game No Life",
        subscales: [...GAS.subscales]
      },
      {
        id: "Episode 14",
        title: "The Screen",
        subscales: [...BWANIME.subscales]
      },
      {
        id: "Episode 15",
        title: "Confronting your demons",
        subscales: [...RAD.subscales]
      }
    ]
  },
  {
    id: "Arc 4",
    title: "Demons from the past...",
    episodes: [
      {
        id: "Episode 16",
        title: "Meeting with pain...",
        subscales: [...Brief_Cope.subscales, ...FINANCIAL_STRAIN_INDEX.subscales]
      },
      {
        id: "Episode 17",
        title: "Sorrowness among the winds...",
        subscales: [...The_Escapism_Scale.subscales, ...Benevolent_Childhood_Experiences.subscales]
      },
      {
        id: "Episode 18",
        title: "Nowhere to go...",
        subscales: [...Hikikomori_Questionnaire_25.subscales, ...Need_To_Belong.subscales, ...FAMILY_SATISFACTION.subscales]
      },
      {
        id: "Episode 19",
        title: "Bonds without ends",
        subscales: [...Relationship_Scales_Questionnaire.subscales]
      },
      {
        id: "Episode 20",
        title: "Story goes on...",
        subscales: [...Anime_Story_World_Engagement_Scale.subscales, ...NISE.subscales]
      }
    ]
  },
  {
    id: "Arc 5",
    title: "Our decisions...",
    episodes: [
      {
        id: "Episode 21",
        title: "Becoming strong",
        subscales: [...Heartland_Forgiveness_Scale.subscales]
      },
      {
        id: "Episode 22",
        title: "Gentle stone",
        subscales: [...Self_Compassion_Scale.subscales]
      },
      {
        id: "Episode 23",
        title: "Inner strength",
        subscales: [...The_Compassion_Scale.subscales]
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────
// FUNCȚIE DE APLATIZARE (Utilă pentru iterarea globală prin itemi)
// ─────────────────────────────────────────────────────────────────────────

export function getFlatQuizItems(catalog: CatalogItem[]): FlatQuizItem[] {
  const flatItems: FlatQuizItem[] = [];

  catalog.forEach(arc => {
    if (!arc.episodes) return;

    arc.episodes.forEach(episode => {
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