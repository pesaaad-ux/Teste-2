// ============================================================================
// CONSTANTES NEUROFISIOLÓGICAS AVANÇADAS - R7+
// ============================================================================

export const NEURAL_CONSTANTS = Object.freeze({
  // Oscilações neurais com funções específicas
  OSCILLATIONS: Object.freeze({
    DELTA: { range: [0.5, 4], function: 'deep_sleep_consolidation', role: 'Systems consolidation' },
    THETA: { range: [4, 8], function: 'memory_encoding', optimal: 6, role: 'Hippocampal-cortical dialogue' },
    ALPHA: { range: [8, 12], function: 'relaxed_attention', role: 'Inhibition of irrelevant info' },
    BETA: { range: [12, 30], function: 'active_processing', role: 'Focused attention' },
    GAMMA: { range: [30, 100], function: 'binding', role: 'Feature binding & consciousness' }
  }),

  // Neuromoduladores com timing e funções
  NEUROMODULATORS: Object.freeze({
    DOPAMINE: {
      baseline: 0.5,
      learning_peak: 1.8,
      prediction_error_sensitivity: 2.5,
      half_life_minutes: 60,
      boosters: ['novelty', 'reward', 'prediction_error', 'progress'],
      optimal_window: [9, 12]
    },
    NORADRENALINE: {
      baseline: 0.6,
      attention_peak: 1.6,
      vigilance_threshold: 0.8,
      half_life_minutes: 30,
      boosters: ['arousal', 'challenge', 'cold_exposure'],
      optimal_window: [6, 10]
    },
    ACETYLCHOLINE: {
      baseline: 0.7,
      encoding_peak: 1.8,
      rem_level: 2.0,
      half_life_minutes: 45,
      boosters: ['attention', 'novelty', 'deep_encoding'],
      optimal_window: [10, 14]
    },
    SEROTONIN: {
      baseline: 0.5,
      mood_regulation: 1.0,
      half_life_minutes: 120,
      boosters: ['sunlight', 'exercise', 'positive_affect'],
      optimal_window: [14, 18]
    },
    BDNF: {
      baseline: 1.0,
      exercise_peak: 3.0,
      learning_boost: 1.5,
      half_life_minutes: 240,
      boosters: ['exercise', 'learning', 'sleep'],
      optimal_window: [8, 11]
    }
  }),

  // Janelas de consolidação com mecanismos
  CONSOLIDATION: Object.freeze({
    SYNAPTIC: {
      start: 0, end: 6, unit: 'hours',
      critical: true,
      mechanism: 'Protein synthesis, LTP stabilization, early-phase LTP → late-phase LTP',
      vulnerability: 'high',
      interventions: ['sleep', 'avoid_interference', 'glucose']
    },
    SYSTEMS: {
      start: 6, end: 24, unit: 'hours',
      critical: true,
      mechanism: 'Hippocampal replay, neocortical integration, schema assimilation',
      vulnerability: 'medium',
      interventions: ['sleep_especially_SWS', 'avoid_similar_learning']
    },
    RECONSOLIDATION: {
      start: 10, end: 360, unit: 'minutes',
      critical: false,
      mechanism: 'Memory updating window, protein synthesis dependent',
      vulnerability: 'medium',
      interventions: ['immediate_feedback', 'elaboration', 'correction']
    },
    REMOTE: {
      start: 1, end: 30, unit: 'days',
      critical: false,
      mechanism: 'Schema integration, semantic transformation, cortical independence',
      vulnerability: 'low',
      interventions: ['spaced_review', 'varied_context', 'integration']
    }
  }),

  // Carga cognitiva baseado em Sweller
  COGNITIVE_LOAD: Object.freeze({
    WORKING_MEMORY_CAPACITY: 4,
    INTRINSIC_FACTORS: ['element_interactivity', 'prior_knowledge'],
    EXTRANEOUS_FACTORS: ['split_attention', 'redundancy', 'presentation_quality'],
    GERMANE_FACTORS: ['schema_construction', 'automation'],
    OPTIMAL_LOAD: 0.7
  }),

  // Ritmos circadianos e performance cognitiva
  CIRCADIAN: Object.freeze({
    PEAK_LEARNING: [10, 12],
    PEAK_CONSOLIDATION: [22, 2],
    PEAK_CREATIVE: [18, 21],
    WORST_LEARNING: [14, 16],
    CORTISOL_PEAK: [6, 9],
    MELATONIN_ONSET: [21, 23]
  })
});
