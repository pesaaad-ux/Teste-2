import React, { useState, useCallback, useMemo, memo } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// Técnicas de elaboração - constante imutável fora do componente
const TECHNIQUES = Object.freeze({
  'feynman': {
    name: 'Técnica Feynman',
    icon: '🎓',
    colorKey: 'blue',
    colors: {
      border: '#60a5fa',
      bgLight: '#eff6ff',
      bgDark: '#1e40af',
      bgHoverLight: '#dbeafe',
      progressBg: '#3b82f6',
      buttonFrom: '#2563eb',
      buttonTo: '#1d4ed8',
      stepBg: '#3b82f6'
    },
    effectiveness: 0.60,
    steps: [
      'Escolha um conceito do parágrafo que acabou de ler',
      'Explique em voz alta como se ensinasse uma criança de 12 anos',
      'Identifique gaps no seu entendimento (onde você travou)',
      'Volte ao material APENAS para preencher os gaps',
      'Simplifique sua explicação usando analogias',
      'Repita a explicação completa agora'
    ],
    neuroscience: 'Ativa: PFC dorsolateral (organização), áreas motoras da fala (generation effect), e força retrieval ativo. Identificação de gaps gera prediction error.',
    time: '5-7 min'
  },
  'dual_coding': {
    name: 'Dual Coding Visual',
    icon: '🎨',
    colorKey: 'purple',
    colors: {
      border: '#c084fc',
      bgLight: '#faf5ff',
      bgDark: '#581c87',
      bgHoverLight: '#f3e8ff',
      progressBg: '#a855f7',
      buttonFrom: '#9333ea',
      buttonTo: '#7e22ce',
      stepBg: '#a855f7'
    },
    effectiveness: 0.50,
    steps: [
      'Identifique o conceito central',
      'Desenhe um diagrama, fluxograma ou mapa conceitual',
      'Use cores diferentes para categorias',
      'Adicione setas mostrando relações causais',
      'Inclua exemplos visuais específicos',
      'Explique o desenho em voz alta'
    ],
    neuroscience: 'Dual coding theory (Paivio): memória verbal + visual = traços duplos. Ativa córtex visual + áreas verbais simultaneamente.',
    time: '5-6 min'
  },
  'analogia': {
    name: 'Analogia Forçada',
    icon: '🔗',
    colorKey: 'green',
    colors: {
      border: '#4ade80',
      bgLight: '#f0fdf4',
      bgDark: '#166534',
      bgHoverLight: '#dcfce7',
      progressBg: '#22c55e',
      buttonFrom: '#16a34a',
      buttonTo: '#15803d',
      stepBg: '#22c55e'
    },
    effectiveness: 0.55,
    steps: [
      'Identifique a estrutura/processo do conceito',
      'Pense em algo COMPLETAMENTE diferente mas com estrutura similar',
      'Exemplo: "Neurônio é como..." (escolha algo familiar)',
      'Mapeie cada elemento do conceito para a analogia',
      'Identifique onde a analogia falha (limites)',
      'Refine a analogia'
    ],
    neuroscience: 'Ativa retrieval de conhecimento prévio, força mapeamento estrutural (PFC), e cria múltiplos cues de retrieval. Facilita transfer.',
    time: '4-5 min'
  },
  'self_explanation': {
    name: 'Auto-explicação Elaborativa',
    icon: '💭',
    colorKey: 'amber',
    colors: {
      border: '#fbbf24',
      bgLight: '#fffbeb',
      bgDark: '#92400e',
      bgHoverLight: '#fef3c7',
      progressBg: '#f59e0b',
      buttonFrom: '#d97706',
      buttonTo: '#b45309',
      stepBg: '#f59e0b'
    },
    effectiveness: 0.45,
    steps: [
      'Leia uma frase do material',
      'Pause e pergunte: "Por que isso faz sentido?"',
      'Conecte com conhecimento prévio: "Isso se relaciona com..."',
      'Gere exemplos: "Um caso onde isso ocorre é..."',
      'Questione: "O que aconteceria se X mudasse?"',
      'Integre: "Isso explica por que..."'
    ],
    neuroscience: 'Self-explanation promove deep processing, integração com schemas existentes, e ativa germane cognitive load.',
    time: '6-8 min'
  },
  'concrete_examples': {
    name: 'Exemplos Concretos',
    icon: '📍',
    colorKey: 'red',
    colors: {
      border: '#f87171',
      bgLight: '#fef2f2',
      bgDark: '#991b1b',
      bgHoverLight: '#fee2e2',
      progressBg: '#ef4444',
      buttonFrom: '#dc2626',
      buttonTo: '#b91c1c',
      stepBg: '#ef4444'
    },
    effectiveness: 0.50,
    steps: [
      'Identifique conceito abstrato',
      'Gere 3 exemplos concretos DIFERENTES',
      'Pelo menos 1 exemplo deve ser pessoal/vivido',
      'Para cada exemplo, explique COMO demonstra o conceito',
      'Identifique o que é comum aos 3 exemplos (abstração)',
      'Teste: gere um 4º exemplo novo'
    ],
    neuroscience: 'Concretude facilita encoding (contexto episódico rico), múltiplos cues de retrieval, e permite inductive learning.',
    time: '5-6 min'
  },
  'questioning': {
    name: 'Interrogação Elaborativa',
    icon: '❓',
    colorKey: 'indigo',
    colors: {
      border: '#818cf8',
      bgLight: '#eef2ff',
      bgDark: '#3730a3',
      bgHoverLight: '#e0e7ff',
      progressBg: '#6366f1',
      buttonFrom: '#4f46e5',
      buttonTo: '#4338ca',
      stepBg: '#6366f1'
    },
    effectiveness: 0.48,
    steps: [
      'Para cada afirmação importante, pergunte: "POR QUÊ isso é verdade?"',
      'Gere explicação causal profunda',
      'Pergunte: "QUANDO isso se aplica?" (condições)',
      'Pergunte: "COMO isso funciona?" (mecanismo)',
      'Pergunte: "O QUE acontece se..." (consequências)',
      'Responda cada pergunta antes de avançar'
    ],
    neuroscience: 'Why-questions forçam integração causal e deep processing. Ativa redes semânticas mais amplas.',
    time: '5-7 min'
  }
});

// Componente para o botão de seleção de técnica
const TechniqueButton = memo(function TechniqueButton({ techKey, tech, onSelect, darkMode }) {
  const handleClick = useCallback(() => onSelect(techKey), [techKey, onSelect]);

  const buttonStyle = useMemo(() => ({
    borderColor: tech.colors.border,
    backgroundColor: darkMode ? `${tech.colors.bgDark}40` : tech.colors.bgLight
  }), [tech.colors, darkMode]);

  const progressStyle = useMemo(() => ({
    width: `${tech.effectiveness * 100}%`,
    backgroundColor: tech.colors.progressBg
  }), [tech.effectiveness, tech.colors.progressBg]);

  return (
    <button
      onClick={handleClick}
      className="text-left p-4 rounded-xl border-2 transition-all hover:shadow-md"
      style={buttonStyle}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl" aria-hidden="true">{tech.icon}</span>
        <div className="flex-1">
          <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {tech.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
              <div className="h-full" style={progressStyle} />
            </div>
            <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              +{Math.round(tech.effectiveness * 100)}%
            </span>
          </div>
        </div>
      </div>
      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tech.time}</p>
    </button>
  );
});

// Componente para o grid de seleção de técnicas
const TechniqueGrid = memo(function TechniqueGrid({ onSelect, darkMode }) {
  const techniqueEntries = useMemo(() => Object.entries(TECHNIQUES), []);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Escolha uma Técnica de Elaboração
        </h3>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Todas baseadas em evidência científica sólida
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {techniqueEntries.map(([key, tech]) => (
          <TechniqueButton
            key={key}
            techKey={key}
            tech={tech}
            onSelect={onSelect}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
});

// Componente para exibir a técnica selecionada
const TechniqueDetail = memo(function TechniqueDetail({ techniqueKey, onBack, onComplete, completed, onMarkComplete, darkMode }) {
  const technique = TECHNIQUES[techniqueKey];

  const techniqueStyles = useMemo(() => ({
    card: {
      backgroundColor: darkMode ? '#1f2937' : '#ffffff'
    },
    neuroscienceBox: {
      borderColor: technique.colors.border,
      backgroundColor: darkMode ? `${technique.colors.bgDark}40` : technique.colors.bgLight
    },
    completeButton: {
      backgroundImage: `linear-gradient(to right, ${technique.colors.buttonFrom}, ${technique.colors.buttonTo})`
    },
    stepCircle: {
      backgroundColor: technique.colors.stepBg
    }
  }), [darkMode, technique.colors]);

  return (
    <div className="rounded-xl p-6" style={techniqueStyles.card}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">{technique.icon}</span>
          <div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {technique.name}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Efetividade: <span className="font-bold text-green-600">+{Math.round(technique.effectiveness * 100)}%</span> vs re-leitura
            </p>
          </div>
        </div>
        <button
          onClick={onBack}
          className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
          aria-label="Voltar para lista de técnicas"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Neuroscience box */}
      <div
        className="p-4 rounded-lg border mb-6"
        style={techniqueStyles.neuroscienceBox}
      >
        <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          <strong>Base Neurocientífica:</strong> {technique.neuroscience}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Passo a passo:
        </h4>
        {technique.steps.map((step, idx) => (
          <div key={step} className="flex gap-3">
            <div
              className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold flex-shrink-0"
              style={techniqueStyles.stepCircle}
            >
              {idx + 1}
            </div>
            <p className={`pt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{step}</p>
          </div>
        ))}
      </div>

      {/* Time suggestion */}
      <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-amber-900/40 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
        <p className={`text-sm ${darkMode ? 'text-amber-200' : 'text-amber-900'}`}>
          <strong>⏱️ Tempo sugerido:</strong> {technique.time} - não apresse o processo, qualidade &gt; velocidade
        </p>
      </div>

      {/* Action buttons */}
      {!completed ? (
        <button
          onClick={onMarkComplete}
          className="w-full py-4 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          style={techniqueStyles.completeButton}
        >
          Completei a Elaboração ✓
        </button>
      ) : (
        <button
          onClick={onComplete}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
        >
          Continuar para Próximo Parágrafo →
        </button>
      )}
    </div>
  );
});

/**
 * ElaborationTechniques - Componente otimizado para técnicas de elaboração
 */
const ElaborationTechniques = memo(function ElaborationTechniques({ onComplete }) {
  const { darkMode } = useTheme();
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [completed, setCompleted] = useState(false);

  // Handlers memoizados
  const handleTechniqueSelect = useCallback((key) => {
    setSelectedTechnique(key);
    setCompleted(false);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedTechnique(null);
    setCompleted(false);
  }, []);

  const handleMarkComplete = useCallback(() => {
    setCompleted(true);
  }, []);

  // Renderização condicional após todos os hooks
  if (!selectedTechnique) {
    return (
      <TechniqueGrid
        onSelect={handleTechniqueSelect}
        darkMode={darkMode}
      />
    );
  }

  return (
    <TechniqueDetail
      techniqueKey={selectedTechnique}
      onBack={handleBack}
      onComplete={onComplete}
      completed={completed}
      onMarkComplete={handleMarkComplete}
      darkMode={darkMode}
    />
  );
});

export default ElaborationTechniques;
