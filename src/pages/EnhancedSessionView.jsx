import React, { useCallback, useMemo, memo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CircadianOptimizer from '../components/CircadianOptimizer';
import NeuromodulatorOptimizer from '../components/NeuromodulatorOptimizer';
import ElaborationTechniques from '../components/ElaborationTechniques';

/**
 * EnhancedSessionView - Vista de sessão otimizada
 */
const EnhancedSessionView = memo(function EnhancedSessionView({ session, onUpdate, onComplete }) {
  const { darkMode } = useTheme();

  // Handler para elaboração completa
  const handleElaborationComplete = useCallback(() => {
    // Aqui poderia atualizar o estado da sessão
    // Por enquanto, mostra um alerta simples
    if (onUpdate) {
      onUpdate(prev => ({
        ...prev,
        phase: (prev.phase || 0) + 1
      }));
    }
  }, [onUpdate]);

  // Classes memoizadas
  const classes = useMemo(() => ({
    container: darkMode ? 'bg-gray-800' : 'bg-white',
    title: darkMode ? 'text-white' : 'text-gray-800'
  }), [darkMode]);

  // Título da sessão
  const sessionTitle = useMemo(
    () => session?.config?.topic || 'Sessão de Estudo',
    [session?.config?.topic]
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className={`${classes.container} rounded-2xl p-8 shadow-lg`}>
        {/* Header */}
        <header className="mb-6">
          <h2 className={`text-3xl font-bold ${classes.title}`}>
            Sessão: {sessionTitle}
          </h2>
          {session?.circadian && (
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Fase circadiana: {session.circadian.phase}
            </p>
          )}
        </header>

        {/* Circadian Optimizer */}
        <section aria-label="Otimização Circadiana">
          <CircadianOptimizer />
        </section>

        {/* Neuromodulator Optimizer */}
        <section className="mb-8" aria-label="Otimização de Neuromoduladores">
          <NeuromodulatorOptimizer targetState="increase_dopamine" />
        </section>

        {/* Elaboration Techniques */}
        <section className="mb-8" aria-label="Técnicas de Elaboração">
          <ElaborationTechniques onComplete={handleElaborationComplete} />
        </section>

        {/* Complete Session Button */}
        <button
          onClick={onComplete}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Completar Sessão
        </button>

        {/* Session Metrics (if available) */}
        {session?.metrics && (
          <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className={`font-bold mb-2 ${classes.title}`}>Métricas da Sessão</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  {Math.round((session.metrics.ltpProbability || 0) * 100)}%
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Probabilidade LTP
                </p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {(session.metrics.eFactor || 2.5).toFixed(2)}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  E-Factor
                </p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  {session.metrics.repetitions || 0}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Repetições
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default EnhancedSessionView;
