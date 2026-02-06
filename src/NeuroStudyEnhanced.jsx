// ============================================================================
// NEUROSTUDY APP - ENHANCED VERSION R7+ (2025)
// Implementação dos protocolos mais avançados de neurofisiologia do aprendizado
// Baseado em: Bjork & Bjork, Dunlosky, Roediger, Buzsáki, Kandel, Walker
// ============================================================================
// REFATORADO: Componentes modularizados, performance otimizada com React.memo,
// useCallback, useMemo, e Context API para gerenciamento de tema.
// ============================================================================

import React, { useState, useCallback, useMemo, memo } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import EnhancedDashboard from './pages/EnhancedDashboard';
import EnhancedSessionView from './pages/EnhancedSessionView';
import { AdvancedLearningAlgorithms } from './utils/learningAlgorithms';

// Re-exportações para compatibilidade com código existente
export { AdvancedLearningAlgorithms } from './utils/learningAlgorithms';
export { NEURAL_CONSTANTS } from './utils/neuralConstants';
export { default as Tooltip } from './components/Tooltip';
export { default as CircadianOptimizer } from './components/CircadianOptimizer';
export { default as NeuromodulatorOptimizer } from './components/NeuromodulatorOptimizer';
export { default as ElaborationTechniques } from './components/ElaborationTechniques';

/**
 * Botão de alternância de tema - Componente memoizado
 */
const ThemeToggleButton = memo(function ThemeToggleButton() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
      )}
    </button>
  );
});

/**
 * Conteúdo principal do app - Gerencia navegação entre views
 */
const AppContent = memo(function AppContent() {
  const { darkMode } = useTheme();
  const [view, setView] = useState('dashboard');
  const [session, setSession] = useState(null);

  // Handler para iniciar nova sessão - memoizado
  const startNewSession = useCallback((config) => {
    const circadian = AdvancedLearningAlgorithms.circadianOptimization();

    const newSession = {
      id: Date.now(),
      config,
      circadian,
      startedAt: new Date().toISOString(),
      phase: 0,
      data: {},
      metrics: {
        ltpProbability: 0,
        eFactor: 2.5, // SuperMemo 2 starting value
        repetitions: 0
      }
    };

    setSession(newSession);
    setView('session');
  }, []);

  // Handler para completar sessão - memoizado
  const handleCompleteSession = useCallback(() => {
    setView('dashboard');
    setSession(null);
  }, []);

  // Handler para atualizar sessão - memoizado
  const handleUpdateSession = useCallback((updater) => {
    setSession(prev => typeof updater === 'function' ? updater(prev) : updater);
  }, []);

  // Classe de background memoizada
  const bgClass = useMemo(() =>
    darkMode
      ? 'bg-gray-900'
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    [darkMode]
  );

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <ThemeToggleButton />

      {view === 'dashboard' && (
        <EnhancedDashboard onStartNew={startNewSession} />
      )}

      {view === 'session' && session && (
        <EnhancedSessionView
          session={session}
          onUpdate={handleUpdateSession}
          onComplete={handleCompleteSession}
        />
      )}
    </div>
  );
});

/**
 * Componente principal do NeuroStudy App
 * Envolve a aplicação com providers necessários
 */
function NeuroStudyEnhanced() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default NeuroStudyEnhanced;
