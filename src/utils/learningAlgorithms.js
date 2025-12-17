// ============================================================================
// ALGORITMOS AVANÇADOS DE APRENDIZADO - Otimizado com memoização
// ============================================================================

import { NEURAL_CONSTANTS } from './neuralConstants';

// Cache para memoização de cálculos frequentes
const circadianCache = new Map();
const CACHE_TTL = 60000; // 1 minuto

/**
 * Limpa entradas expiradas do cache
 */
const cleanExpiredCache = (cache) => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      cache.delete(key);
    }
  }
};

export class AdvancedLearningAlgorithms {

  /**
   * SuperMemo 2 Algorithm - Spaced Repetition otimizado
   */
  static calculateSM2Interval(n, efactor, previousInterval = 0) {
    let interval;
    if (n === 1) {
      interval = 1;
    } else if (n === 2) {
      interval = 6;
    } else {
      interval = Math.round(previousInterval * efactor);
    }

    return {
      interval,
      nextReviewDate: new Date(Date.now() + interval * 24 * 60 * 60 * 1000)
    };
  }

  /**
   * Calcula novo E-Factor baseado na performance
   */
  static updateEFactor(currentEF, quality) {
    const newEF = currentEF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    return Math.max(1.3, Math.min(2.5, newEF));
  }

  /**
   * LTP avançado com metaplasticidade e homeostase sináptica
   */
  static calculateAdvancedLTP(history) {
    const { repetitions = 0, interval_hours = 0, intensity = 0.5, prior_ltp = 0 } = history;

    const calciumAccumulation = 1 - Math.exp(-repetitions * intensity);

    const thetaM = 0.5 + prior_ltp * 0.3;
    const metaplasticity = intensity > thetaM ?
      (intensity - thetaM) / (1 - thetaM) :
      0.3;

    const homeostasis = Math.exp(-prior_ltp * 0.5);

    const earlyLTP = calciumAccumulation * metaplasticity * homeostasis;
    const lateLTP = repetitions >= 3 ?
      earlyLTP * (1 + Math.log(repetitions)) * 0.5 :
      0;

    const proteinSynthesis = interval_hours < 6 ? 1.0 : 0.6;

    return {
      probability: Math.min(0.95, earlyLTP + lateLTP * proteinSynthesis),
      phase: lateLTP > 0 ? 'late' : 'early',
      persistence_hours: lateLTP > 0 ? 720 : 12,
      strength: earlyLTP + lateLTP,
      consolidationNeeded: interval_hours < 6
    };
  }

  /**
   * Curva de esquecimento de Ebbinghaus personalizada
   */
  static forgettingCurve(t_days, strength, retrievals) {
    const S = strength * Math.pow(2.5, retrievals);
    return Math.exp(-t_days / S);
  }

  /**
   * Desirable Difficulty - Bjork & Bjork
   */
  static calculateDesirableDifficulty(retrievalStrength, storageStrength) {
    const difficulty = 1 - retrievalStrength;
    const learningGain = difficulty * storageStrength;

    return {
      difficulty,
      learningGain,
      optimal: difficulty >= 0.3 && difficulty <= 0.7,
      tooEasy: difficulty < 0.3,
      tooHard: difficulty > 0.7,
      recommendation: difficulty < 0.3 ? 'increase_interval' :
                      difficulty > 0.7 ? 'decrease_interval' :
                      'maintain'
    };
  }

  /**
   * Generation Effect - self-testing vs re-reading
   */
  static generationEffectBonus(generationType) {
    const bonuses = {
      'free_recall': 0.40,
      'cued_recall': 0.30,
      'recognition': 0.15,
      'elaboration': 0.50,
      'teaching': 0.60,
      'application': 0.55
    };
    return bonuses[generationType] || 0;
  }

  /**
   * Chunking otimizado (Miller 1956 atualizado por Cowan 2001)
   */
  static optimizeChunking(items, priorKnowledge = 0) {
    const baseCapacity = 4;
    const expandedCapacity = baseCapacity + Math.floor(priorKnowledge * 3);

    const chunkSize = Math.ceil(items.length / expandedCapacity);
    const chunks = [];

    for (let i = 0; i < items.length; i += chunkSize) {
      chunks.push(items.slice(i, i + chunkSize));
    }

    return {
      chunks,
      chunkSize,
      numChunks: chunks.length,
      overload: chunks.length > expandedCapacity
    };
  }

  /**
   * Interleaving vs Blocking - quando usar cada um
   */
  static interleavingBenefit(itemSimilarity, priorKnowledge) {
    if (priorKnowledge < 0.3) {
      return {
        strategy: 'blocking',
        reason: 'Low prior knowledge - need to build foundation first',
        benefit: 0.2
      };
    } else if (itemSimilarity > 0.7) {
      return {
        strategy: 'interleaving',
        reason: 'High similarity - interleaving improves discrimination',
        benefit: 0.35
      };
    } else {
      return {
        strategy: 'mixed',
        reason: 'Balanced approach - block initially, then interleave',
        benefit: 0.25
      };
    }
  }

  /**
   * Otimização circadiana - Com memoização para evitar recálculos
   */
  static circadianOptimization(currentHour) {
    const hour = currentHour ?? new Date().getHours();

    // Verificar cache
    const cacheKey = hour;
    const cached = circadianCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.value;
    }

    // Limpar cache periodicamente
    if (circadianCache.size > 24) {
      cleanExpiredCache(circadianCache);
    }

    let phase, performance, recommendation;

    if (hour >= 6 && hour < 9) {
      phase = 'morning_cortisol_peak';
      performance = 0.75;
      recommendation = {
        activity: 'Review & consolidation check',
        avoid: 'New difficult material',
        optimize: 'Light exercise, sunlight exposure first',
        neuromodulator: 'noradrenaline_rising'
      };
    } else if (hour >= 9 && hour < 12) {
      phase = 'peak_learning_window';
      performance = 1.0;
      recommendation = {
        activity: 'NEW material encoding - OPTIMAL TIME',
        avoid: 'Routine/easy tasks',
        optimize: 'Maximum cognitive load, complex material',
        neuromodulator: 'dopamine_acetylcholine_optimal'
      };
    } else if (hour >= 12 && hour < 14) {
      phase = 'post_lunch_maintenance';
      performance = 0.65;
      recommendation = {
        activity: 'Practice problems, application',
        avoid: 'New encoding',
        optimize: 'Light lunch, avoid carb crash',
        neuromodulator: 'serotonin_rising'
      };
    } else if (hour >= 14 && hour < 16) {
      phase = 'afternoon_dip';
      performance = 0.55;
      recommendation = {
        activity: 'NAP (10-20min) or light review',
        avoid: 'Important learning',
        optimize: '20min power nap can boost performance 34%',
        neuromodulator: 'adenosine_peak'
      };
    } else if (hour >= 16 && hour < 19) {
      phase = 'second_peak_window';
      performance = 0.85;
      recommendation = {
        activity: 'Retrieval practice, problem solving',
        avoid: 'Passive review',
        optimize: 'Active recall, practice testing',
        neuromodulator: 'noradrenaline_dopamine_good'
      };
    } else if (hour >= 19 && hour < 22) {
      phase = 'consolidation_preparation';
      performance = 0.60;
      recommendation = {
        activity: 'Light review, synthesis, connections',
        avoid: 'New encoding, intense focus',
        optimize: 'Prepare for sleep consolidation',
        neuromodulator: 'melatonin_rising'
      };
    } else {
      phase = 'sleep_consolidation';
      performance = 0.0;
      recommendation = {
        activity: 'SLEEP - Critical for consolidation',
        avoid: 'All study',
        optimize: '7-9h, cool room (65-68F), dark, quiet',
        neuromodulator: 'acetylcholine_rem_sws_alternation'
      };
    }

    const result = {
      phase,
      performance,
      recommendation,
      multiplier: performance
    };

    // Armazenar no cache
    circadianCache.set(cacheKey, { value: result, timestamp: Date.now() });

    return result;
  }

  /**
   * Prediction Error para aprendizado dopaminérgico
   */
  static calculatePredictionError(expected, actual) {
    const error = actual - expected;
    const magnitude = Math.abs(error);

    let dopamineSignal, learningRate;

    if (error > 0) {
      dopamineSignal = 1.0 + magnitude * 1.5;
      learningRate = magnitude * 0.8;
    } else {
      dopamineSignal = 1.0 - magnitude * 0.5;
      learningRate = magnitude * 1.2;
    }

    return {
      error,
      magnitude,
      dopamineSignal,
      learningRate,
      type: error > 0 ? 'positive' : 'negative',
      explanation: error > 0 ?
        'Performance exceeded expectation - strong learning signal!' :
        'Performance below expectation - opportunity for correction'
    };
  }

  /**
   * Cognitive Load Calculator (Sweller's CLT)
   */
  static calculateCognitiveLoad(task) {
    const {
      element_interactivity = 5,
      prior_knowledge = 0.5,
      presentation_quality = 0.8,
      split_attention = 0.2,
      redundancy = 0.1
    } = task;

    const intrinsicLoad = element_interactivity * (1 - prior_knowledge * 0.5);
    const extraneousLoad = split_attention + redundancy + (1 - presentation_quality);
    const availableCapacity = NEURAL_CONSTANTS.COGNITIVE_LOAD.WORKING_MEMORY_CAPACITY;
    const germaneLoad = Math.max(0, availableCapacity - intrinsicLoad - extraneousLoad);

    const totalLoad = intrinsicLoad + extraneousLoad;
    const efficiency = germaneLoad / availableCapacity;

    return {
      intrinsic: intrinsicLoad,
      extraneous: extraneousLoad,
      germane: germaneLoad,
      total: totalLoad,
      capacity: availableCapacity,
      available: Math.max(0, availableCapacity - totalLoad),
      overload: totalLoad > availableCapacity,
      efficiency,
      optimization: {
        reduce_extraneous: extraneousLoad > 1.0,
        segment_content: intrinsicLoad > availableCapacity * 0.7,
        add_prior_knowledge: prior_knowledge < 0.3
      }
    };
  }

  /**
   * Limpa o cache manualmente (útil para testes)
   */
  static clearCache() {
    circadianCache.clear();
  }
}
