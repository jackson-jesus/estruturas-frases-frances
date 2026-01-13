import React, { useState, useEffect } from 'react';
import AccessibilityControls from './components/AccessibilityControls';
import SentenceGenerator from './components/SentenceGenerator';
import VerbTable from './components/VerbTable';
import ChallengeSection from './components/ChallengeSection';
import { FontSize } from './types';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('normal');

  useEffect(() => {
    // Check system preference on mount
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large': return 'text-lg';
      case 'extra-large': return 'text-xl';
      default: return 'text-base';
    }
  };

  return (
    <div className={`min-h-screen py-10 px-4 md:px-8 transition-all duration-300 ${getFontSizeClass()}`}>
      <AccessibilityControls
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      <main className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
            Estruturas de Frases em Francês
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Selecione os elementos abaixo para construir frases e praticar a conjugação. 
            A IA ajudará a criar contextos naturais para seu aprendizado.
          </p>
        </header>

        <section className="mb-16">
          <SentenceGenerator />
        </section>

        <section className="mb-16">
          <VerbTable />
        </section>

        <section className="mb-16">
          <ChallengeSection />
        </section>

        <footer className="text-center text-gray-500 dark:text-gray-500 mt-20 pb-8">
          <p>© {new Date().getFullYear()} Aprendizado de Francês. Powered by Google Gemini.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;