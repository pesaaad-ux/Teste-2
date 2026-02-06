import React, { useMemo, memo } from 'react';
import { Sun, Clock } from 'lucide-react';
import { AdvancedLearningAlgorithms } from '../utils/learningAlgorithms';
import { useTheme } from '../contexts/ThemeContext';
import Tooltip from './Tooltip';

// Mapeamento de cores para performance - evita recálculo
const PERFORMANCE_COLORS = Object.freeze({
  excellent: {
    threshold: 0.85,
    textColor: '#16a34a',
    gradientFrom: '#4ade80',
    gradientTo: '#16a34a'
  },
  good: {
    threshold: 0.65,
    textColor: '#ca8a04',
    gradientFrom: '#fbbf24',
    gradientTo: '#ca8a04'
  },
  moderate: {
    threshold: 0.45,
    textColor: '#ea580c',
    gradientFrom: '#fb923c',
    gradientTo: '#ea580c'
  },
  low: {
    threshold: 0,
    textColor: '#dc2626',
    gradientFrom: '#f87171',
    gradientTo: '#dc2626'
  }
});

/**
 * Obtém dados de cor baseado na performance
 */
const getPerformanceColorData = (performance) => {
  if (performance >= PERFORMANCE_COLORS.excellent.threshold) return PERFORMANCE_COLORS.excellent;
  if (performance >= PERFORMANCE_COLORS.good.threshold) return PERFORMANCE_COLORS.good;
  if (performance >= PERFORMANCE_COLORS.moderate.threshold) return PERFORMANCE_COLORS.moderate;
  return PERFORMANCE_COLORS.low;
};

/**
 * CircadianOptimizer - Componente otimizado para exibir otimização circadiana
 * Usa React.memo para evitar re-renders desnecessários
 */
const CircadianOptimizer = memo(function CircadianOptimizer() {
  const { darkMode } = useTheme();

  // Hora atual - calculada uma vez
  const currentHour = useMemo(() => new Date().getHours(), []);

  // Otimização circadiana memoizada
  const optimization = useMemo(
    () => AdvancedLearningAlgorithms.circadianOptimization(currentHour),
    [currentHour]
  );

  // Dados de cor baseados na performance
  const performanceColorData = useMemo(
    () => getPerformanceColorData(optimization.performance),
    [optimization.performance]
  );

  // Porcentagem formatada
  const performancePercent = useMemo(
    () => Math.round(optimization.performance * 100),
    [optimization.performance]
  );

  // Classes memoizadas
  const classes = useMemo(() => ({
    card: darkMode
      ? 'bg-gray-800 border-gray-700'
      : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200',
    text: darkMode ? 'text-white' : 'text-gray-800',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
    boxBg: darkMode ? 'bg-gray-700' : 'bg-white',
    boxBorder: darkMode ? 'border border-gray-600' : '',
    progressBg: darkMode ? 'bg-gray-700' : 'bg-white',
    tipBg: darkMode ? 'bg-indigo-900/40 border border-indigo-700' : 'bg-indigo-100',
    tipText: darkMode ? 'text-indigo-200' : 'text-indigo-900',
    iconMuted: darkMode ? 'text-gray-400' : 'text-gray-600',
  }), [darkMode]);

  // Style do indicador de progresso
  const progressStyle = useMemo(() => ({
    width: `${performancePercent}%`,
    backgroundImage: `linear-gradient(to right, ${performanceColorData.gradientFrom}, ${performanceColorData.gradientTo})`
  }), [performancePercent, performanceColorData]);

  return (
    <div className={`${classes.card} rounded-xl p-5 border-2 mb-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500" aria-hidden="true" />
          <h3 className={`font-bold ${classes.text}`}>
            Otimização Circadiana
          </h3>
          <Tooltip content="Seu cérebro tem diferentes níveis de performance ao longo do dia devido aos ritmos circadianos controlados pelo núcleo supraquiasmático. Esta seção otimiza sua sessão baseado no horário atual.">
            <span className={`text-sm ${classes.textSecondary}`}>Ritmo Circadiano</span>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${classes.iconMuted}`} aria-hidden="true" />
          <span className={`font-medium ${classes.textSecondary}`}>
            {currentHour}:00
          </span>
        </div>
      </div>

      {/* Performance meter */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className={classes.textSecondary}>Performance Cognitiva</span>
          <span className="font-bold" style={{ color: performanceColorData.textColor }}>
            {performancePercent}%
          </span>
        </div>
        <div className={`h-3 rounded-full overflow-hidden ${classes.progressBg}`}>
          <div
            className="h-full transition-all duration-300"
            style={progressStyle}
            role="progressbar"
            aria-valuenow={performancePercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Performance cognitiva"
          />
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`${classes.boxBg} rounded-lg p-3 ${classes.boxBorder}`}>
          <p className={`text-xs mb-1 ${classes.textMuted}`}>✅ RECOMENDADO</p>
          <p className={`text-sm font-medium ${classes.text}`}>
            {optimization.recommendation.activity}
          </p>
        </div>

        <div className={`${classes.boxBg} rounded-lg p-3 ${classes.boxBorder}`}>
          <p className={`text-xs mb-1 ${classes.textMuted}`}>❌ EVITAR</p>
          <p className={`text-sm font-medium ${classes.text}`}>
            {optimization.recommendation.avoid}
          </p>
        </div>
      </div>

      {/* Tip */}
      <div className={`mt-3 p-3 rounded-lg ${classes.tipBg}`}>
        <p className={`text-xs ${classes.tipText}`}>
          <strong>💡 Dica:</strong> {optimization.recommendation.optimize}
        </p>
      </div>
    </div>
  );
});

export default CircadianOptimizer;
