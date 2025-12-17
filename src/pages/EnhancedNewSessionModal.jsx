import React, { useState, useCallback, useMemo, memo } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// Tipos de material - constante fora do componente
const MATERIAL_TYPES = Object.freeze([
  { value: 'textbook', label: 'Livro/Apostila', icon: '📚' },
  { value: 'paper', label: 'Artigo', icon: '📄' },
  { value: 'notes', label: 'Anotações', icon: '📝' }
]);

// Níveis de complexidade
const COMPLEXITY_LEVELS = Object.freeze([
  {
    value: 'easy',
    label: 'Fácil',
    desc: 'Conceitos simples',
    colors: { active: '#22c55e', bg: { light: '#f0fdf4', dark: '#166534' } }
  },
  {
    value: 'medium',
    label: 'Médio',
    desc: 'Moderadamente complexo',
    colors: { active: '#ca8a04', bg: { light: '#fef9c3', dark: '#854d0e' } }
  },
  {
    value: 'hard',
    label: 'Difícil',
    desc: 'Altamente técnico',
    colors: { active: '#dc2626', bg: { light: '#fee2e2', dark: '#991b1b' } }
  }
]);

// Tiers do protocolo
const PROTOCOL_TIERS = Object.freeze([
  {
    value: 'essential',
    label: 'ESSENCIAL',
    badge: 'Tier 1',
    desc: 'Core techniques: Spacing + Testing + Elaboration',
    result: '~85% resultado máximo',
    time: '60-90 min'
  },
  {
    value: 'optimized',
    label: 'OTIMIZADO',
    badge: 'Tier 1+2',
    desc: '+ Dual coding + Interleaving + Circadian timing',
    result: '~95% resultado máximo',
    time: '90-120 min'
  },
  {
    value: 'full',
    label: 'COMPLETO',
    badge: 'Tier 1+2+3',
    desc: '+ Neuromoduladores + Chunking + Prediction error',
    result: '~99% resultado máximo',
    time: '120-150 min'
  }
]);

// Estado inicial do config
const INITIAL_CONFIG = Object.freeze({
  topic: '',
  materialType: 'textbook',
  pages: 3,
  complexity: 'medium',
  priorKnowledge: 0.5,
  tier: 'full'
});

// Componente para botão de tipo de material
const MaterialTypeButton = memo(function MaterialTypeButton({ opt, selected, onSelect, darkMode }) {
  const handleClick = useCallback(() => onSelect(opt.value), [opt.value, onSelect]);

  const buttonClass = useMemo(() => {
    if (selected) return 'border-indigo-500 bg-indigo-50';
    if (darkMode) return 'border-gray-600 bg-gray-700 hover:border-gray-500';
    return 'border-gray-200 bg-white hover:border-gray-300';
  }, [selected, darkMode]);

  return (
    <button
      onClick={handleClick}
      className={`p-4 rounded-xl border-2 transition-all ${buttonClass}`}
    >
      <div className="text-3xl mb-2">{opt.icon}</div>
      <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {opt.label}
      </div>
    </button>
  );
});

// Componente para botão de complexidade
const ComplexityButton = memo(function ComplexityButton({ opt, selected, onSelect, darkMode }) {
  const handleClick = useCallback(() => onSelect(opt.value), [opt.value, onSelect]);

  const buttonStyle = useMemo(() => ({
    borderColor: selected ? opt.colors.active : (darkMode ? '#4b5563' : '#e5e7eb'),
    backgroundColor: selected
      ? (darkMode ? opt.colors.bg.dark : opt.colors.bg.light)
      : (darkMode ? '#374151' : '#ffffff')
  }), [selected, darkMode, opt.colors]);

  return (
    <button
      onClick={handleClick}
      className={`p-4 rounded-xl border-2 transition-all text-left ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
      style={buttonStyle}
    >
      <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {opt.label}
      </div>
      <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {opt.desc}
      </div>
    </button>
  );
});

// Componente para botão de tier
const TierButton = memo(function TierButton({ opt, selected, onSelect, darkMode }) {
  const handleClick = useCallback(() => onSelect(opt.value), [opt.value, onSelect]);

  const buttonClass = useMemo(() => {
    if (selected) return 'border-indigo-500 bg-indigo-50';
    if (darkMode) return 'border-gray-600 bg-gray-700 hover:border-gray-500';
    return 'border-gray-200 bg-white hover:border-gray-300';
  }, [selected, darkMode]);

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${buttonClass}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {opt.label}
        </span>
        <span className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-full font-bold">
          {opt.badge}
        </span>
      </div>
      <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {opt.desc}
      </p>
      <div className="flex justify-between text-xs">
        <span className="text-green-600 font-semibold">{opt.result}</span>
        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{opt.time}</span>
      </div>
    </button>
  );
});

/**
 * EnhancedNewSessionModal - Modal otimizado para nova sessão
 */
const EnhancedNewSessionModal = memo(function EnhancedNewSessionModal({ onClose, onStart }) {
  const { darkMode } = useTheme();
  const [config, setConfig] = useState(INITIAL_CONFIG);

  // Handlers memoizados
  const handleTopicChange = useCallback((e) => {
    const value = e.target.value;
    setConfig(prev => ({ ...prev, topic: value }));
  }, []);

  const handleMaterialTypeChange = useCallback((value) => {
    setConfig(prev => ({ ...prev, materialType: value }));
  }, []);

  const handlePagesChange = useCallback((e) => {
    const value = parseInt(e.target.value, 10);
    setConfig(prev => ({ ...prev, pages: value }));
  }, []);

  const handleComplexityChange = useCallback((value) => {
    setConfig(prev => ({ ...prev, complexity: value }));
  }, []);

  const handlePriorKnowledgeChange = useCallback((e) => {
    const value = parseFloat(e.target.value);
    setConfig(prev => ({ ...prev, priorKnowledge: value }));
  }, []);

  const handleTierChange = useCallback((value) => {
    setConfig(prev => ({ ...prev, tier: value }));
  }, []);

  const handleStart = useCallback(() => {
    const sessionConfig = {
      ...config,
      topic: config.topic.trim() || 'Sessão de Estudo'
    };
    onStart(sessionConfig);
  }, [config, onStart]);

  // Classes memoizadas
  const classes = useMemo(() => ({
    bg: darkMode ? 'bg-gray-800' : 'bg-white',
    text: darkMode ? 'text-white' : 'text-gray-800',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
    inputBg: darkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900',
    closeButton: darkMode
      ? 'text-gray-400 hover:text-gray-200'
      : 'text-gray-400 hover:text-gray-600',
    cancelButton: darkMode
      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
      : 'border-gray-300 text-gray-700 hover:bg-gray-50',
    tipBg: darkMode
      ? 'bg-indigo-900/30 border-indigo-700'
      : 'bg-blue-50 border-blue-200',
    tipText: darkMode ? 'text-indigo-200' : 'text-blue-900'
  }), [darkMode]);

  // Porcentagem de conhecimento prévio formatada
  const priorKnowledgePercent = useMemo(
    () => Math.round(config.priorKnowledge * 100),
    [config.priorKnowledge]
  );

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`${classes.bg} rounded-2xl max-w-2xl w-full my-8 shadow-2xl`}>
        <div className="max-h-[85vh] overflow-y-auto p-8">
          {/* Header */}
          <div className={`flex items-center justify-between mb-6 ${classes.text}`}>
            <h2 id="modal-title" className="text-3xl font-bold">
              Configurar Sessão de Estudo
            </h2>
            <button
              onClick={onClose}
              className={`${classes.closeButton} transition-colors`}
              aria-label="Fechar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Topic */}
            <div>
              <label
                htmlFor="topic-input"
                className={`block text-sm font-bold mb-2 ${classes.textSecondary}`}
              >
                Tópico ou Capítulo
              </label>
              <input
                id="topic-input"
                type="text"
                value={config.topic}
                onChange={handleTopicChange}
                placeholder="Ex: Potenciação de Longo Prazo (LTP)"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none text-lg transition-colors ${classes.inputBg}`}
              />
            </div>

            {/* Material Type */}
            <div>
              <label className={`block text-sm font-bold mb-2 ${classes.textSecondary}`}>
                Tipo de Material
              </label>
              <div className="grid grid-cols-3 gap-3">
                {MATERIAL_TYPES.map(opt => (
                  <MaterialTypeButton
                    key={opt.value}
                    opt={opt}
                    selected={config.materialType === opt.value}
                    onSelect={handleMaterialTypeChange}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </div>

            {/* Pages */}
            <div>
              <label
                htmlFor="pages-range"
                className={`block text-sm font-bold mb-2 ${classes.textSecondary}`}
              >
                Número de Páginas: <span className={classes.text}>{config.pages}</span>
              </label>
              <input
                id="pages-range"
                type="range"
                min="1"
                max="10"
                value={config.pages}
                onChange={handlePagesChange}
                className="w-full"
              />
              <div className={`flex justify-between text-xs mt-1 ${classes.textMuted}`}>
                <span>1 página</span>
                <span>10+ páginas</span>
              </div>
            </div>

            {/* Complexity */}
            <div>
              <label className={`block text-sm font-bold mb-2 ${classes.textSecondary}`}>
                Complexidade do Material
              </label>
              <div className="grid grid-cols-3 gap-3">
                {COMPLEXITY_LEVELS.map(opt => (
                  <ComplexityButton
                    key={opt.value}
                    opt={opt}
                    selected={config.complexity === opt.value}
                    onSelect={handleComplexityChange}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </div>

            {/* Prior Knowledge */}
            <div>
              <label
                htmlFor="knowledge-range"
                className={`block text-sm font-bold mb-2 ${classes.textSecondary}`}
              >
                Conhecimento Prévio: <span className={classes.text}>{priorKnowledgePercent}%</span>
              </label>
              <input
                id="knowledge-range"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.priorKnowledge}
                onChange={handlePriorKnowledgeChange}
                className="w-full"
              />
              <div className={`flex justify-between text-xs mt-1 ${classes.textMuted}`}>
                <span>Nunca vi</span>
                <span>Já domino</span>
              </div>
            </div>

            {/* Protocol Tier */}
            <div>
              <label className={`block text-sm font-bold mb-2 ${classes.textSecondary}`}>
                Nível do Protocolo
              </label>
              <div className="space-y-3">
                {PROTOCOL_TIERS.map(opt => (
                  <TierButton
                    key={opt.value}
                    opt={opt}
                    selected={config.tier === opt.value}
                    onSelect={handleTierChange}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={onClose}
              className={`flex-1 px-6 py-4 border-2 rounded-xl font-bold transition-colors ${classes.cancelButton}`}
            >
              Cancelar
            </button>
            <button
              onClick={handleStart}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Iniciar Sessão R7+ →
            </button>
          </div>

          {/* Tip */}
          <div className={`mt-4 p-4 rounded-xl border ${classes.tipBg}`}>
            <p className={`text-sm ${classes.tipText}`}>
              <strong>💡 Protocolo R7+:</strong> Implementa os avanços mais recentes em neurociência do aprendizado,
              incluindo SuperMemo 2, otimização circadiana, dual coding, e protocolos de neuromoduladores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EnhancedNewSessionModal;
