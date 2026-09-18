export interface TestScaleConfig {
  testId: string;
  likertMin: number;
  likertMax: number;
  itemsPerSubscale: number;
  scoringNote?: string;
}

export const TEST_SCALES: Record<string, TestScaleConfig> = {
  // --- Instrumente folosite la matching (cele 71 originale) ---
  dark_tetrad:            { testId: "dark_tetrad",            likertMin: 1, likertMax: 5,   itemsPerSubscale: 7 },
  upps_p:                 { testId: "upps_p",                 likertMin: 1, likertMax: 4,   itemsPerSubscale: 4 },
  need_for_cognition:     { testId: "need_for_cognition",     likertMin: 1, likertMax: 5,   itemsPerSubscale: 18 },
  big_five:               { testId: "big_five",               likertMin: 1, likertMax: 5,   itemsPerSubscale: 6 },
  cerq:                   { testId: "cerq",                   likertMin: 1, likertMax: 5,   itemsPerSubscale: 4 },
  psyache:                { testId: "psyache",                likertMin: 1, likertMax: 5,   itemsPerSubscale: 13 },
  dass21:                 { testId: "dass21",                 likertMin: 0, likertMax: 3,   itemsPerSubscale: 7 },
  rosenberg:              { testId: "rosenberg",              likertMin: 0, likertMax: 3,   itemsPerSubscale: 10 },
  swls:                   { testId: "swls",                   likertMin: 1, likertMax: 7,   itemsPerSubscale: 5 },
  shaps:                  { testId: "shaps",                  likertMin: 0, likertMax: 3,   itemsPerSubscale: 14 },
  bpnsfs:                 { testId: "bpnsfs",                 likertMin: 1, likertMax: 5,   itemsPerSubscale: 8 },
  heartland_forgiveness:  { testId: "heartland_forgiveness",  likertMin: 1, likertMax: 7,   itemsPerSubscale: 6 },
  msbs:                   { testId: "msbs",                   likertMin: 1, likertMax: 7,   itemsPerSubscale: 29 },
  brief_cope:             { testId: "brief_cope",              likertMin: 1, likertMax: 4,   itemsPerSubscale: 2 },
  self_compassion:        { testId: "self_compassion",        likertMin: 1, likertMax: 5,   itemsPerSubscale: 5 },
  compassion_others:      { testId: "compassion_others",      likertMin: 1, likertMax: 5,   itemsPerSubscale: 4 },
  escapism:                { testId: "escapism",               likertMin: 1, likertMax: 7,   itemsPerSubscale: 5 },
  hikikomori:              { testId: "hikikomori",             likertMin: 0, likertMax: 4,   itemsPerSubscale: 8 },
  need_to_belong:          { testId: "need_to_belong",         likertMin: 1, likertMax: 5,   itemsPerSubscale: 10 },
  erq:                     { testId: "erq",                    likertMin: 1, likertMax: 7,   itemsPerSubscale: 6 },

  crt: {
    testId: "crt", likertMin: 0, likertMax: 1, itemsPerSubscale: 3,
    scoringNote: "Sum correct / total items. Already 0-1.",
  },
  maladaptive_daydreaming: {
    testId: "maladaptive_daydreaming", likertMin: 0, likertMax: 100, itemsPerSubscale: 1,
    scoringNote: "Slider 0-100%. Normalize = value / 100.",
  },
  bce: {
    testId: "bce", likertMin: 0, likertMax: 1, itemsPerSubscale: 10,
    scoringNote: "Binary Yes/No per item. Score = count(Yes) / 10.",
  },

  // --- Instrumente research-only (NU intră în matching) ---
  isi:  { testId: "isi", likertMin: 0, likertMax: 4, itemsPerSubscale: 7 },

  msbs_disengagement:   { testId: "msbs_v2", likertMin: 1, likertMax: 7, itemsPerSubscale: 6 },
  msbs_inattention:     { testId: "msbs_v2", likertMin: 1, likertMax: 7, itemsPerSubscale: 4 },
  msbs_high_arousal:    { testId: "msbs_v2", likertMin: 1, likertMax: 7, itemsPerSubscale: 4 },
  msbs_time_perception: { testId: "msbs_v2", likertMin: 1, likertMax: 7, itemsPerSubscale: 4 },
  msbs_low_arousal:     { testId: "msbs_v2", likertMin: 1, likertMax: 7, itemsPerSubscale: 4 },
  msbs_general:         { testId: "msbs_v2", likertMin: 1, likertMax: 7, itemsPerSubscale: 1 },

  bsmas: { testId: "bsmas", likertMin: 1, likertMax: 5, itemsPerSubscale: 1 },

  yas:                       { testId: "yas",                       likertMin: 1, likertMax: 5, itemsPerSubscale: 6 },
  instagram_addiction_scale: { testId: "instagram_addiction_scale", likertMin: 1, likertMax: 6, itemsPerSubscale: 15 },
  tiktok_addiction_scale:    { testId: "tiktok_addiction_scale",    likertMin: 1, likertMax: 5, itemsPerSubscale: 15 },

  rad: { testId: "rad", likertMin: 0, likertMax: 6, itemsPerSubscale: 5 },
  gas: { testId: "gas", likertMin: 1, likertMax: 5, itemsPerSubscale: 7 },

  nise_anime: { testId: "nise_anime", likertMin: 1, likertMax: 6, itemsPerSubscale: 20 },
  anime_aswe: { testId: "anime_aswe", likertMin: 1, likertMax: 7, itemsPerSubscale: 12 },

  bwaq: { testId: "bwaq", likertMin: 0, likertMax: 4, itemsPerSubscale: 1 },

  material_adequacy_scale: { testId: "material_adequacy_scale", likertMin: 1, likertMax: 5, itemsPerSubscale: 5 },
  pfs:                      { testId: "pfs",                      likertMin: 1, likertMax: 5, itemsPerSubscale: 3 },
};

export const TRAIT_TO_TEST: Record<string, string> = {
  // --- Matching (71) ---
  machiavellianism: "dark_tetrad", narcissism: "dark_tetrad",
  psychopathy: "dark_tetrad", sadism: "dark_tetrad",
  extraversion: "big_five", agreeableness: "big_five",
  conscientiousness: "big_five", neuroticism: "big_five", openness: "big_five",
  premeditation: "upps_p", urgency_negative: "upps_p",
  sensation_seeking: "upps_p", urgency_positive: "upps_p",
  need_for_cognition: "need_for_cognition",
  cognitive_reflection: "crt",
  maladaptive_daydreaming: "maladaptive_daydreaming",
  self_blame_cerq: "cerq", acceptance_cerq: "cerq", rumination: "cerq",
  positive_refocusing: "cerq", refocus_planning: "cerq", positive_reappraisal: "cerq",
  putting_into_perspective: "cerq", catastrophizing: "cerq", other_blame: "cerq",
  cognitive_reappraisal: "erq", expressive_suppression: "erq", // corectat: ERQ, nu Brief COPE
  self_distraction: "brief_cope", active_coping: "brief_cope", denial: "brief_cope",
  substance_use_coping: "brief_cope", humor_coping: "brief_cope",
  emotional_support_seeking: "brief_cope", instrumental_support_seeking: "brief_cope",
  behavioral_disengagement: "brief_cope", venting: "brief_cope",
  positive_reframing: "brief_cope", planning_coping: "brief_cope",
  acceptance_coping: "brief_cope", religion_coping: "brief_cope",
  self_blame_coping: "brief_cope",
  psychological_pain: "psyache",
  depression: "dass21", stress: "dass21", anxiety: "dass21",
  anhedonia: "shaps", self_esteem: "rosenberg", life_satisfaction: "swls",
  boredom_global: "msbs",
  autonomy: "bpnsfs", competence: "bpnsfs", relatedness: "bpnsfs",
  forgiveness_self: "heartland_forgiveness", forgiveness_others: "heartland_forgiveness",
  forgiveness_situations: "heartland_forgiveness",
  self_kindness: "self_compassion", self_judgment: "self_compassion",
  common_humanity_self: "self_compassion", isolation: "self_compassion",
  mindfulness: "self_compassion", over_identification: "self_compassion",
  compassion_coldness: "compassion_others", common_humanity_others: "compassion_others",
  compassion_in_action: "compassion_others",
  self_expansion: "escapism", self_suppression: "escapism",
  benevolent_childhood_experiences: "bce",
  social_withdrawal: "hikikomori", social_anxiety: "hikikomori", social_avoidance: "hikikomori",
  need_to_belong: "need_to_belong",

  // --- Research-only (NU intră în matching) ---
  insomnia_severity: "isi",
  msbs_disengagement: "msbs_v2", msbs_inattention: "msbs_v2",
  msbs_high_arousal: "msbs_v2", msbs_time_perception: "msbs_v2",
  msbs_low_arousal: "msbs_v2", msbs_general: "msbs_v2",
  bsmas_salience: "bsmas", bsmas_tolerance: "bsmas", bsmas_relapse: "bsmas",
  bsmas_mood_modification: "bsmas", bsmas_withdrawal: "bsmas", bsmas_conflict: "bsmas",
  youtube_addiction: "yas",
  instagram_addiction: "instagram_addiction_scale",
  tiktok_addiction: "tiktok_addiction_scale",
  rad_alcohol: "rad", rad_drug: "rad", rad_smoking: "rad",
  rad_gambling: "rad", rad_binge_eating: "rad", rad_pornography: "rad",
  gaming_addiction: "gas",
  bwaq_compulsive_loss_of_control: "bwaq", bwaq_spending_time: "bwaq",
  bwaq_physical_psychological_harm: "bwaq", bwaq_communication: "bwaq",
  nise_anime: "nise_anime",
  anime_aswe: "anime_aswe",
  material_adequacy: "material_adequacy_scale",
  perceived_financial_stress: "pfs",
};

// DOAR acestea intră în cosine similarity (character matching)
export const MATCHING_TRAIT_KEYS: string[] = [
  "machiavellianism", "narcissism", "psychopathy", "sadism",
  "extraversion", "agreeableness", "conscientiousness", "neuroticism", "openness",
  "premeditation", "urgency_negative", "sensation_seeking", "urgency_positive",
  "need_for_cognition", "cognitive_reflection", "maladaptive_daydreaming",
  "self_blame_cerq", "acceptance_cerq", "rumination", "positive_refocusing",
  "refocus_planning", "positive_reappraisal", "putting_into_perspective",
  "catastrophizing", "other_blame",
  "cognitive_reappraisal", "expressive_suppression",
  "self_distraction", "active_coping", "denial", "substance_use_coping",
  "humor_coping", "emotional_support_seeking", "instrumental_support_seeking",
  "behavioral_disengagement", "venting", "positive_reframing", "planning_coping",
  "acceptance_coping", "religion_coping", "self_blame_coping",
  "psychological_pain", "depression", "stress", "anxiety", "anhedonia",
  "self_esteem", "life_satisfaction", "boredom_global",
  "autonomy", "competence", "relatedness",
  "forgiveness_self", "forgiveness_others", "forgiveness_situations",
  "self_kindness", "self_judgment", "common_humanity_self", "isolation",
  "mindfulness", "over_identification",
  "compassion_coldness", "common_humanity_others", "compassion_in_action",
  "self_expansion", "self_suppression",
  "benevolent_childhood_experiences",
  "social_withdrawal", "social_anxiety", "social_avoidance",
  "need_to_belong",
];