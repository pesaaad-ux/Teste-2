import React, { useState, useCallback, memo } from 'react';
import { HelpCircle } from 'lucide-react';

/**
 * Componente Tooltip otimizado com React.memo
 * Exibe explicações contextuais ao passar o mouse ou clicar
 */
const Tooltip = memo(function Tooltip({ content, children }) {
  const [show, setShow] = useState(false);

  const handleMouseEnter = useCallback(() => setShow(true), []);
  const handleMouseLeave = useCallback(() => setShow(false), []);
  const handleClick = useCallback(() => setShow(prev => !prev), []);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors"
        type="button"
        aria-label="Mais informações"
        aria-expanded={show}
      >
        {children}
        <HelpCircle className="w-4 h-4" aria-hidden="true" />
      </button>

      {show && (
        <div
          className="absolute z-50 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl bottom-full left-1/2 transform -translate-x-1/2 mb-2"
          role="tooltip"
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
          {content}
        </div>
      )}
    </div>
  );
});

export default Tooltip;
