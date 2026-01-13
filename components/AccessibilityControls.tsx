import React from 'react';
import { FontSize } from '../types';
import { Moon, Sun, Type } from 'lucide-react';

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const AccessibilityControls: React.FC<Props> = ({ isDark, toggleTheme, fontSize, setFontSize }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
        aria-label="Alternar tema claro/escuro"
        title="Alternar tema"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      <div className="flex items-center border-l border-gray-300 dark:border-gray-600 pl-2 gap-1">
        <button
          onClick={() => setFontSize('normal')}
          className={`p-2 rounded-full transition-colors ${fontSize === 'normal' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          aria-label="Fonte normal"
          title="Fonte normal"
        >
          <Type size={14} />
        </button>
        <button
          onClick={() => setFontSize('large')}
          className={`p-2 rounded-full transition-colors ${fontSize === 'large' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          aria-label="Fonte grande"
          title="Fonte grande"
        >
          <Type size={18} />
        </button>
        <button
          onClick={() => setFontSize('extra-large')}
          className={`p-2 rounded-full transition-colors ${fontSize === 'extra-large' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          aria-label="Fonte extra grande"
          title="Fonte extra grande"
        >
          <Type size={24} />
        </button>
      </div>
    </div>
  );
};

export default AccessibilityControls;