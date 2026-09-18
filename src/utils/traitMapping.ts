export interface ItemPrefixTraitMap {
  prefix: string;
  traitKey: string;
  reverseIds?: string[];
  episodeTitle?: string;
}

// ─────────────────────────────────────────────────────────────────
// GLOBAL — funcționează identic pe toate cele 40 de anime-uri,
// pentru că id-urile itemilor sunt identice peste tot.
// Prefixele fără episodeTitle se aplică oriunde apar.
// Prefixele CU episodeTitle rezolvă coliziunile (același prefix,
// instrumente diferite, în capitole diferite).
// ─────────────────────────────────────────────────────────────────
export const GLOBAL_ITEM_TRAIT_MAP: ItemPrefixTraitMap[] = [
  // Dark Tetrad + Big Five
  { prefix: "mach", traitKey: "machiavellianism" },
  { prefix: "narc", traitKey: "narcissism" },
  { prefix: "psyc", traitKey: "psychopathy" },
  { prefix: "sad",  traitKey: "sadism" },
  { prefix: "ex",   traitKey: "extraversion",      reverseIds: ["ex3","ex4","ex6"] },
  { prefix: "ag",   traitKey: "agreeableness",     reverseIds: ["ag3","ag4","ag5"] },
  { prefix: "co",   traitKey: "conscientiousness", reverseIds: ["co1","co2","co5","co6"] },
  { prefix: "ne",   traitKey: "neuroticism",       reverseIds: ["ne1","ne2","ne5","ne6"] },
  { prefix: "om",   traitKey: "openness",          reverseIds: ["om1","om5","om6"] },

  // UPPS-P (Episode 7) — "pre" aici = premeditation
  { prefix: "pre", traitKey: "premeditation", episodeTitle: "Episode 7" },
  { prefix: "urg", traitKey: "urgency_negative" },
  { prefix: "ses", traitKey: "sensation_seeking" },
  { prefix: "urp", traitKey: "urgency_positive" },

  // NFC + CRT/BNT
  { prefix: "nfc",  traitKey: "need_for_cognition" },
  { prefix: "crt",  traitKey: "cognitive_reflection" },
  { prefix: "crt2", traitKey: "cognitive_reflection" },
  { prefix: "bnt",  traitKey: "cognitive_reflection" },

  // MDS-16
  { prefix: "mds", traitKey: "maladaptive_daydreaming" },

  // CERQ (Chapter 10) — "sb"/"pr" aici au sensul CERQ
  { prefix: "sb",  traitKey: "self_blame_cerq",       episodeTitle: "Chapter 10" },
  { prefix: "aa",  traitKey: "acceptance_cerq" },
  { prefix: "ft",  traitKey: "rumination" },
  { prefix: "pr",  traitKey: "positive_refocusing",   episodeTitle: "Chapter 10" },
  { prefix: "rp",  traitKey: "refocus_planning" },
  { prefix: "pip", traitKey: "putting_into_perspective" },
  { prefix: "cat", traitKey: "catastrophizing" },
  { prefix: "ob",  traitKey: "other_blame" },

  // PPS-13
  { prefix: "psya", traitKey: "psychological_pain" },

  // DASS-21
  { prefix: "dep",  traitKey: "depression" },
  { prefix: "stre", traitKey: "stress" },
  { prefix: "anx",  traitKey: "anxiety" },

  // RSES + SWLS
  { prefix: "rses", traitKey: "self_esteem",      reverseIds: ["rses2","rses5","rses6","rses8","rses9"] },
  { prefix: "swls", traitKey: "life_satisfaction" },

  // SHAPS-14
  { prefix: "anh", traitKey: "anhedonia" },

  // MSBM — boredom_global (folosim doar subscala globală "gen"/"dis" ca proxy)
  { prefix: "dis", traitKey: "boredom_global" },

  // BPNS
  { prefix: "aut", traitKey: "autonomy",   reverseIds: ["aut5","aut6","aut7","aut8"] },
  { prefix: "com", traitKey: "competence", reverseIds: ["com5","com6","com7","com8"] },
  { prefix: "rel", traitKey: "relatedness",reverseIds: ["rel5","rel6","rel7","rel8"] },

  // ERQ (Chapter 21) — "es" aici = expressive_suppression
  { prefix: "cr", traitKey: "cognitive_reappraisal" },
  { prefix: "es", traitKey: "expressive_suppression", episodeTitle: "Chapter 21" },

  // Heartland Forgiveness Scale
  { prefix: "fos",  traitKey: "forgiveness_self",       reverseIds: ["fos2","fos4","fos6"] },
  { prefix: "foo",  traitKey: "forgiveness_others",     reverseIds: ["foo1","foo3","foo4"] },
  { prefix: "fosi", traitKey: "forgiveness_situations", reverseIds: ["fosi1","fosi3","fosi5"] },

  // Self-Compassion Scale
  { prefix: "sk",  traitKey: "self_kindness" },
  { prefix: "sj",  traitKey: "self_judgment" },
  { prefix: "ch",  traitKey: "common_humanity_self" },
  { prefix: "iso", traitKey: "isolation" },
  { prefix: "min", traitKey: "mindfulness" },
  { prefix: "oi",  traitKey: "over_identification" },

  // Compassion for Others
  { prefix: "tfc", traitKey: "compassion_coldness" },
  { prefix: "cwo", traitKey: "common_humanity_others" },
  { prefix: "iac", traitKey: "compassion_in_action" },

  // Brief COPE (Chapter 26) — "sb"/"pr"/"es" aici au sens diferit de CERQ/ERQ
  { prefix: "sd",  traitKey: "self_distraction" },
  { prefix: "ac",  traitKey: "active_coping" },
  { prefix: "de",  traitKey: "denial" },
  { prefix: "su",  traitKey: "substance_use_coping" },
  { prefix: "es",  traitKey: "emotional_support_seeking",  episodeTitle: "Chapter 26" },
  { prefix: "is",  traitKey: "instrumental_support_seeking" },
  { prefix: "bd",  traitKey: "behavioral_disengagement" },
  { prefix: "ve",  traitKey: "venting" },
  { prefix: "pr",  traitKey: "positive_reframing",         episodeTitle: "Chapter 26" },
  { prefix: "pl",  traitKey: "planning_coping" },
  { prefix: "hu",  traitKey: "humor_coping" },
  { prefix: "apt", traitKey: "acceptance_coping" },
  { prefix: "re",  traitKey: "religion_coping" },
  { prefix: "sb",  traitKey: "self_blame_coping",           episodeTitle: "Chapter 26" },

  // Self-Expansion / Self-Suppression
  { prefix: "sele", traitKey: "self_expansion" },
  { prefix: "sesu", traitKey: "self_suppression" },

  // BCE
  { prefix: "bce", traitKey: "benevolent_childhood_experiences" },

  // Hikikomori & Social Avoidance
  { prefix: "si", traitKey: "social_withdrawal" },
  { prefix: "ec", traitKey: "social_anxiety" },
  { prefix: "sa", traitKey: "social_avoidance" },

  // Need to Belong
  { prefix: "nb", traitKey: "need_to_belong", reverseIds: ["nb1","nb3","nb7","nb10"] },

  // ── Itemi INTENȚIONAT excluși din scoring de trăsături (conform notei
  // din characters.json — addiction digitală/financiar/clinic nu au
  // corespondent în trait_keys, deci findTraitMapping îi ignoră automat):
  // ins* (insomnie), sali/tole/moo/rela/with/conf (social media addiction),
  // YAS*, INSTA*, tiktok*, radalcohol*, raddrug*, radsmoke*, radgambling*,
  // radbinge*, radporn* (RAD-scales), gas* (gaming addiction),
  // clc/spnd/pphc/cmm (anime addiction CLC), maa*/pfs* (financiar)
  // Nu au nevoie de mapping — funcția de scoring le skip-uiește automat
  // (findTraitMapping returnează undefined pentru ele).
];

export function findTraitMapping(
  itemId: string,
  episodeTitle?: string,
  maps: ItemPrefixTraitMap[] = GLOBAL_ITEM_TRAIT_MAP
) {
  const cleanId = itemId.toLowerCase();

  const sortedMaps = [...maps].sort((a, b) => b.prefix.length - a.prefix.length);

  const exactMatch = sortedMaps.find(m => {
    return cleanId.startsWith(m.prefix.toLowerCase()) && m.episodeTitle === episodeTitle;
  });

  if (exactMatch) return exactMatch;

  return sortedMaps.find(m => {
    return cleanId.startsWith(m.prefix.toLowerCase()) && !m.episodeTitle;
  });
}