#!/usr/bin/env python3
"""
Script para aplicar correções de dark mode no NeuroStudyEnhanced.jsx
"""

import re

def apply_fixes():
    with open('src/NeuroStudyEnhanced.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix 1: CircadianOptimizer - Adicionar variáveis de classe e cores inline
    content = re.sub(
        r'function CircadianOptimizer\({ darkMode }\) \{\n  const \[currentHour\] = useState\(new Date\(\)\.getHours\(\)\);\n  const optimization = AdvancedLearningAlgorithms\.circadianOptimization\(currentHour\);',
        r'''function CircadianOptimizer({ darkMode }) {
  const [currentHour] = useState(new Date().getHours());
  const optimization = AdvancedLearningAlgorithms.circadianOptimization(currentHour);

  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondaryClass = darkMode ? 'text-gray-300' : 'text-gray-700';
  const boxBgClass = darkMode ? 'bg-gray-700' : 'bg-white';

  // Color coding based on performance with actual color values
  const performanceColorData = optimization.performance >= 0.85 ? {
    name: 'green',
    textColor: '#16a34a',
    gradientFrom: '#4ade80',
    gradientTo: '#16a34a'
  } : optimization.performance >= 0.65 ? {
    name: 'yellow',
    textColor: '#ca8a04',
    gradientFrom: '#fbbf24',
    gradientTo: '#ca8a04'
  } : optimization.performance >= 0.45 ? {
    name: 'orange',
    textColor: '#ea580c',
    gradientFrom: '#fb923c',
    gradientTo: '#ea580c'
  } : {
    name: 'red',
    textColor: '#dc2626',
    gradientFrom: '#f87171',
    gradientTo: '#dc2626'
  };''',
        content
    )

    # Fix 2: Replace text-gray-800 with textClass in CircadianOptimizer
    # Find CircadianOptimizer component and replace within it
    circadian_start = content.find('function CircadianOptimizer')
    circadian_end = content.find('function NeuromodulatorOptimizer', circadian_start)

    if circadian_start != -1 and circadian_end != -1:
        circadian_section = content[circadian_start:circadian_end]

        # Replace fixed color classes with variables
        circadian_section = circadian_section.replace(
            'className="font-bold text-gray-800"',
            'className={`font-bold ${textClass}`}'
        )
        circadian_section = circadian_section.replace(
            'className="text-gray-700"',
            'className={textSecondaryClass}'
        )
        circadian_section = circadian_section.replace(
            'className="w-4 h-4 text-gray-600"',
            'className={`w-4 h-4 ${darkMode ? \'text-gray-400\' : \'text-gray-600\'}`}'
        )
        circadian_section = circadian_section.replace(
            'className="font-medium text-gray-700"',
            'className={`font-medium ${textSecondaryClass}`}'
        )
        circadian_section = circadian_section.replace(
            'className="bg-white rounded-lg p-3"',
            'className={`${boxBgClass} rounded-lg p-3 ${darkMode ? \'border border-gray-600\' : \'\'}`}'
        )
        circadian_section = circadian_section.replace(
            'className="text-xs text-gray-500 mb-1"',
            'className={`text-xs mb-1 ${darkMode ? \'text-gray-400\' : \'text-gray-500\'}`}'
        )
        circadian_section = circadian_section.replace(
            'className="text-sm font-medium text-gray-800"',
            'className={`text-sm font-medium ${textClass}`}'
        )

        # Replace dynamic color classes with inline styles
        circadian_section = re.sub(
            r'className={`font-bold text-\$\{performanceColor\}-600`}',
            'className="font-bold" style={{ color: performanceColorData.textColor }}',
            circadian_section
        )
        circadian_section = re.sub(
            r'className="h-3 bg-white rounded-full overflow-hidden"',
            'className={`h-3 rounded-full overflow-hidden ${darkMode ? \'bg-gray-700\' : \'bg-white\'}`}',
            circadian_section
        )
        circadian_section = re.sub(
            r'className={`h-full bg-gradient-to-r from-\$\{performanceColor\}-400 to-\$\{performanceColor\}-600 transition-all`}\s*style=\{\{ width:',
            '''className="h-full transition-all"
            style={{
              width:''',
            circadian_section
        )
        circadian_section = re.sub(
            r'style=\{\{ width: `\$\{optimization\.performance \* 100\}%` \}\}',
            '''style={{
              width: `${optimization.performance * 100}%`,
              backgroundImage: `linear-gradient(to right, ${performanceColorData.gradientFrom}, ${performanceColorData.gradientTo})`
            }}''',
            circadian_section
        )

        content = content[:circadian_start] + circadian_section + content[circadian_end:]

    # Save the fixed content
    with open('src/NeuroStudyEnhanced.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

    print("✅ Correções aplicadas com sucesso!")
    print("   - CircadianOptimizer: Dark mode completo")
    return True

if __name__ == '__main__':
    try:
        apply_fixes()
    except Exception as e:
        print(f"❌ Erro ao aplicar correções: {e}")
        import traceback
        traceback.print_exc()
