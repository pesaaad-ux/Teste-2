import React, { useState, useCallback, useMemo, memo, lazy, Suspense } from 'react';
import { Brain, Zap, Activity, TrendingUp, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import CircadianOptimizer from '../components/CircadianOptimizer';

// Lazy load do modal para reduzir bundle inicial
const EnhancedNewSessionModal = lazy(() => import('./EnhancedNewSessionModal'));

// Badges científicos - constante fora do componente
const SCIENTIFIC_BADGES = Object.freeze([
  'LTP & Late-phase consolidation',
  'SuperMemo 2 spacing',
  'Circadian optimization',
  'Dual coding',
  'Interleaving',
  'Generation effect',
  'Prediction error learning',
  'Sleep-dependent consolidation'
]);

// Fundamentos científicos - constante fora do componente
const SCIENTIFIC_FOUNDATIONS = Object.freeze([
  {
    id: 'testing-effect',
    title: 'Testing Effect',
    evidence: 'Roediger & Karpicke (2006)',
    finding: '+50% retenção vs re-leitura',
    mechanism: 'Retrieval practice fortalece traços de memória via reconsolidação'
  },
  {
    id: 'spacing-effect',
    title: 'Spacing Effect',
    evidence: 'Cepeda et al. (2006) meta-análise',
    finding: '+200% retenção a longo prazo',
    mechanism: 'Desirable difficulty otimiza consolidação'
  },
  {
    id: 'generation-effect',
    title: 'Generation Effect',
    evidence: 'Slamecka & Graf (1978)',
    finding: '+40% retenção',
    mechanism: 'Self-generation ativa processamento elaborativo'
  },
  {
    id: 'dual-coding',
    title: 'Dual Coding',
    evidence: 'Paivio (1986, 2007)',
    finding: '+35% recall',
    mechanism: 'Múltiplas representações = múltiplos retrieval cues'
  },
  {
    id: 'interleaving',
    title: 'Interleaving',
    evidence: 'Rohrer & Taylor (2007)',
    finding: '+43% em testes de transfer',
    mechanism: 'Melhora discriminação e flexibilidade cognitiva'
  },
  {
    id: 'sleep-consolidation',
    title: 'Sleep Consolidation',
    evidence: 'Diekelmann & Born (2010)',
    finding: '+20-40% overnight gain',
    mechanism: 'SWS → hippocampal replay → neocortical integration'
  }
]);

// Componente Badge memoizado
const Badge = memo(function Badge({ text, className }) {
  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${className}`}>
      {text}
    </span>
  );
});

// Componente ScientificCard memoizado
const ScientificCard = memo(function ScientificCard({ item, darkMode }) {
  const cardClass = useMemo(() =>
    darkMode
      ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-700'
      : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200',
    [darkMode]
  );

  return (
    <div className={`rounded-lg p-4 border ${cardClass}`}>
      <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {item.title}
      </h4>
      <p className={`text-xs mb-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
        {item.evidence}
      </p>
      <p className="text-sm text-green-600 font-semibold mb-1">{item.finding}</p>
      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {item.mechanism}
      </p>
    </div>
  );
});

// Loading fallback para o modal
const ModalLoadingFallback = memo(function ModalLoadingFallback() {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
      <div className="bg-white rounded-2xl p-8 shadow-2xl">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-gray-600">Carregando...</p>
      </div>
    </div>
  );
});

/**
 * EnhancedDashboard - Dashboard principal otimizado
 */
const EnhancedDashboard = memo(function EnhancedDashboard({ onStartNew }) {
  const { darkMode } = useTheme();
  const [showNewSession, setShowNewSession] = useState(false);

  // Handlers memoizados
  const handleOpenModal = useCallback(() => setShowNewSession(true), []);
  const handleCloseModal = useCallback(() => setShowNewSession(false), []);

  const handleStartSession = useCallback((config) => {
    setShowNewSession(false);
    onStartNew(config);
  }, [onStartNew]);

  // Classes memoizadas
  const cardClass = useMemo(() =>
    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100',
    [darkMode]
  );

  const badgeClass = useMemo(() =>
    darkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-700',
    [darkMode]
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Brain className="w-12 h-12 text-indigo-600" aria-hidden="true" />
          <div>
            <h1 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              NeuroStudy R7+
            </h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Protocolo Neurofisiológico Avançado de Aprendizado (2025)
            </p>
          </div>
        </div>

        {/* Scientific badges */}
        <div className="flex flex-wrap gap-2 mt-3" role="list" aria-label="Funcionalidades científicas">
          {SCIENTIFIC_BADGES.map(badge => (
            <Badge key={badge} text={badge} className={badgeClass} />
          ))}
        </div>
      </header>

      {/* Circadian Optimizer */}
      <CircadianOptimizer />

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* New Session Button */}
        <button
          onClick={handleOpenModal}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 text-left"
        >
          <Zap className="w-12 h-12 mb-4" aria-hidden="true" />
          <h3 className="text-2xl font-bold mb-2">Nova Sessão</h3>
          <p className="text-indigo-100">Iniciar protocolo completo</p>
        </button>

        {/* Stats Card 1 */}
        <div className={`${cardClass} rounded-2xl p-8 border-2`}>
          <Activity className="w-12 h-12 text-green-600 mb-4" aria-hidden="true" />
          <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            95%
          </h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Taxa de retenção média
          </p>
        </div>

        {/* Stats Card 2 */}
        <div className={`${cardClass} rounded-2xl p-8 border-2`}>
          <TrendingUp className="w-12 h-12 text-blue-600 mb-4" aria-hidden="true" />
          <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Evidência
          </h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Baseado em 50+ estudos
          </p>
        </div>
      </div>

      {/* Scientific Foundations */}
      <section className={`${cardClass} rounded-2xl p-8 border-2`}>
        <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Award className="w-7 h-7 text-indigo-600" aria-hidden="true" />
          Fundamentos Científicos do Protocolo
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {SCIENTIFIC_FOUNDATIONS.map(item => (
            <ScientificCard key={item.id} item={item} darkMode={darkMode} />
          ))}
        </div>
      </section>

      {/* Modal with lazy loading */}
      {showNewSession && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <EnhancedNewSessionModal
            onClose={handleCloseModal}
            onStart={handleStartSession}
          />
        </Suspense>
      )}
    </div>
  );
});

export default EnhancedDashboard;
