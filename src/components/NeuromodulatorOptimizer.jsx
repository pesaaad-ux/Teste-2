import React, { useMemo, memo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Tooltip from './Tooltip';

// Protocolos de neuromoduladores - constante fora do componente
const PROTOCOLS = Object.freeze({
  'increase_dopamine': {
    title: 'Aumentar Dopamina',
    icon: '🎯',
    colorKey: 'purple',
    colors: {
      border: '#c084fc',
      bgLight: '#faf5ff',
      bgDark: '#581c87',
      iconBg: '#f3e8ff',
      interventionBg: '#faf5ff',
      interventionBgDark: '#581c8780',
      badgeBg: '#e9d5ff',
      badgeText: '#7e22ce',
      mechanismBg: '#f3e8ff'
    },
    interventions: [
      { action: 'Novidade', time: '2 min', desc: 'Mude ambiente ou faça algo diferente' },
      { action: 'Progresso visível', time: '1 min', desc: 'Revise o que já conquistou' },
      { action: 'Música energizante', time: '3 min', desc: 'Ativa via nucleus accumbens' },
      { action: 'Cafeína 50-100mg', time: '15 min onset', desc: 'Potencializa receptores D2' }
    ],
    mechanism: 'Dopamina no VTA/substantia nigra melhora motivação, atenção e consolidação via D1/D5 receptors no hipocampo'
  },
  'increase_noradrenaline': {
    title: 'Aumentar Noradrenalina',
    icon: '⚡',
    colorKey: 'red',
    colors: {
      border: '#f87171',
      bgLight: '#fef2f2',
      bgDark: '#991b1b',
      iconBg: '#fee2e2',
      interventionBg: '#fef2f2',
      interventionBgDark: '#991b1b80',
      badgeBg: '#fecaca',
      badgeText: '#dc2626',
      mechanismBg: '#fee2e2'
    },
    interventions: [
      { action: 'Água fria no rosto', time: '30 seg', desc: '30 segundos de água fria' },
      { action: 'Respiração Wim Hof', time: '2 min', desc: '30 respirações rápidas' },
      { action: 'Jumping jacks', time: '1 min', desc: '20 repetições' },
      { action: 'Luz forte', time: '10 min', desc: '>1000 lux, olhar para cima' }
    ],
    mechanism: 'Noradrenalina do locus coeruleus aumenta vigilância, atenção e consolidação via β-adrenoreceptores'
  },
  'increase_acetylcholine': {
    title: 'Aumentar Acetilcolina',
    icon: '🧠',
    colorKey: 'blue',
    colors: {
      border: '#60a5fa',
      bgLight: '#eff6ff',
      bgDark: '#1e40af',
      iconBg: '#dbeafe',
      interventionBg: '#eff6ff',
      interventionBgDark: '#1e40af80',
      badgeBg: '#bfdbfe',
      badgeText: '#1d4ed8',
      mechanismBg: '#dbeafe'
    },
    interventions: [
      { action: 'Atenção focada', time: '5 min', desc: 'Visual focus em um ponto' },
      { action: 'Alpha-GPC 300mg', time: '30 min onset', desc: 'Precursor de ACh (opcional)' },
      { action: 'Ginástica cerebral', time: '2 min', desc: 'Cross-crawl movements' },
      { action: 'Visualização ativa', time: '3 min', desc: 'Imagine o material visualmente' }
    ],
    mechanism: 'Acetilcolina do núcleo basal de Meynert aumenta atenção, codificação e plasticidade via receptores nicotínicos e muscarínicos'
  },
  'reduce_cortisol': {
    title: 'Reduzir Cortisol',
    icon: '😌',
    colorKey: 'green',
    colors: {
      border: '#4ade80',
      bgLight: '#f0fdf4',
      bgDark: '#166534',
      iconBg: '#dcfce7',
      interventionBg: '#f0fdf4',
      interventionBgDark: '#16653480',
      badgeBg: '#bbf7d0',
      badgeText: '#16a34a',
      mechanismBg: '#dcfce7'
    },
    interventions: [
      { action: 'Respiração 4-7-8', time: '3 min', desc: '5 ciclos: inspira 4s, segura 7s, expira 8s' },
      { action: 'Alongamento suave', time: '2 min', desc: 'Pescoço, ombros, coluna' },
      { action: 'Visualização calma', time: '2 min', desc: 'Lugar seguro/relaxante' },
      { action: 'Hidratação', time: '1 min', desc: '200-300ml água' }
    ],
    mechanism: 'Cortisol elevado prejudica LTP no hipocampo via receptores glucocorticoides. Reduzir cortisol melhora consolidação'
  }
});

/**
 * NeuromodulatorOptimizer - Componente otimizado para protocolos de neuromoduladores
 */
const NeuromodulatorOptimizer = memo(function NeuromodulatorOptimizer({ targetState = 'increase_dopamine' }) {
  const { darkMode } = useTheme();

  // Seleciona o protocolo baseado no targetState
  const protocol = useMemo(
    () => PROTOCOLS[targetState] || PROTOCOLS['increase_dopamine'],
    [targetState]
  );

  // Estilos memoizados
  const styles = useMemo(() => ({
    card: {
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      borderColor: protocol.colors.border,
      borderWidth: '2px',
      borderStyle: 'solid'
    },
    iconContainer: {
      backgroundColor: darkMode ? protocol.colors.bgDark : protocol.colors.iconBg
    },
    intervention: {
      backgroundColor: darkMode ? protocol.colors.interventionBgDark : protocol.colors.interventionBg
    },
    badge: {
      backgroundColor: protocol.colors.badgeBg,
      color: protocol.colors.badgeText
    },
    mechanism: {
      backgroundColor: darkMode ? protocol.colors.interventionBgDark : protocol.colors.mechanismBg
    }
  }), [darkMode, protocol.colors]);

  // Classes memoizadas
  const classes = useMemo(() => ({
    title: darkMode ? 'text-white' : 'text-gray-800',
    subtitle: darkMode ? 'text-gray-300' : 'text-gray-600',
    actionText: darkMode ? 'text-white' : 'text-gray-800',
    descText: darkMode ? 'text-gray-300' : 'text-gray-600',
    mechanismText: darkMode ? 'text-gray-200' : 'text-gray-700'
  }), [darkMode]);

  return (
    <div className="rounded-xl p-6" style={styles.card}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          style={styles.iconContainer}
          aria-hidden="true"
        >
          {protocol.icon}
        </div>
        <div>
          <h3 className={`font-bold ${classes.title}`}>{protocol.title}</h3>
          <Tooltip content={protocol.mechanism}>
            <span className={`text-sm ${classes.subtitle}`}>Protocolo Neuroquímico</span>
          </Tooltip>
        </div>
      </div>

      {/* Interventions */}
      <div className="space-y-3">
        {protocol.interventions.map((intervention) => (
          <div
            key={intervention.action}
            className="rounded-lg p-3"
            style={styles.intervention}
          >
            <div className="flex justify-between items-start mb-1">
              <span className={`font-medium ${classes.actionText}`}>
                {intervention.action}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={styles.badge}
              >
                {intervention.time}
              </span>
            </div>
            <p className={`text-sm ${classes.descText}`}>{intervention.desc}</p>
          </div>
        ))}
      </div>

      {/* Mechanism */}
      <div className="mt-4 p-3 rounded-lg" style={styles.mechanism}>
        <p className={`text-xs ${classes.mechanismText}`}>
          <strong>Mecanismo:</strong> {protocol.mechanism}
        </p>
      </div>
    </div>
  );
});

export default NeuromodulatorOptimizer;
