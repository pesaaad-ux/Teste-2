import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Context para gerenciamento de tema
const ThemeContext = createContext(null);

// Hook customizado para usar o tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider do tema
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Inicializar com preferência do sistema ou localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('neuro-study-dark-mode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    }
    return false;
  });

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newValue = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('neuro-study-dark-mode', JSON.stringify(newValue));
      }
      return newValue;
    });
  }, []);

  // Classes utilitárias memoizadas
  const themeClasses = useMemo(() => ({
    // Backgrounds
    bgPrimary: darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    bgCard: darkMode ? 'bg-gray-800' : 'bg-white',
    bgCardAlt: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100',
    bgInput: darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300',
    bgHover: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',

    // Textos
    textPrimary: darkMode ? 'text-white' : 'text-gray-800',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-700',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
    textInput: darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900',

    // Bordas
    borderPrimary: darkMode ? 'border-gray-700' : 'border-gray-200',
    borderSecondary: darkMode ? 'border-gray-600' : 'border-gray-300',

    // Estados especiais
    highlightBg: darkMode ? 'bg-indigo-900/40 border-indigo-700' : 'bg-indigo-100',
    highlightText: darkMode ? 'text-indigo-200' : 'text-indigo-900',

    // Badges
    badgePrimary: darkMode ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-700',
  }), [darkMode]);

  const value = useMemo(() => ({
    darkMode,
    toggleDarkMode,
    themeClasses,
  }), [darkMode, toggleDarkMode, themeClasses]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
