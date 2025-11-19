import React, { useState, useEffect } from 'react';
import { Pronoun, Verb, Tense, Structure, VERB_PARTICIPLES } from './types';
import { SelectionSection } from './components/SelectionSection';
import { ResultSection } from './components/ResultSection';
import { VerbTable } from './components/VerbTable';
import { ChallengeSection } from './components/ChallengeSection';
import { generateFrenchSentence } from './services/geminiService';

const App: React.FC = () => {
  const [pronoun, setPronoun] = useState<Pronoun | null>(null);
  const [verb, setVerb] = useState<Verb | null>(null);
  const [tense, setTense] = useState<Tense | null>(null);
  const [structure, setStructure] = useState<Structure | null>(null);
  
  const [sentence, setSentence] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSentence = async () => {
      if (pronoun && verb && tense && structure) {
        setIsLoading(true);
        const result = await generateFrenchSentence({
          pronoun,
          verb,
          tense,
          structure
        });
        setSentence(result);
        setIsLoading(false);
      }
    };

    // Use a small timeout to debounce if user clicks rapidly, 
    // or simply call immediately if all are selected.
    // Given the UX, immediate feedback upon completing selection is good.
    fetchSentence();
  }, [pronoun, verb, tense, structure]);

  // Prepare options with labels
  const pronounOptions = Object.values(Pronoun).map(p => ({ value: p, label: p }));
  
  const verbOptions = Object.values(Verb).map(v => ({
    value: v,
    label: (
      <span className="flex flex-col items-center justify-center leading-tight">
        <span>{v}</span>
        <span className="text-sm text-gray-500 font-normal mt-1">({VERB_PARTICIPLES[v]})</span>
      </span>
    )
  }));

  const tenseOptions = Object.values(Tense).map(t => ({ value: t, label: t }));
  const structureOptions = Object.values(Structure).map(s => ({ value: s, label: s }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Estruturas de frases em francês
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecione os elementos abaixo para gerar frases automaticamente e praticar sua pronúncia.
          </p>
        </header>

        <main aria-live="polite">
          <SelectionSection
            title="1. Escolha o Pronome (Sujet)"
            groupName="pronoun"
            options={pronounOptions}
            selectedValue={pronoun}
            onChange={(val) => setPronoun(val as Pronoun)}
          />

          <SelectionSection
            title="2. Escolha o Verbo (Verbe)"
            groupName="verb"
            options={verbOptions}
            selectedValue={verb}
            onChange={(val) => setVerb(val as Verb)}
          />

          <SelectionSection
            title="3. Escolha o Tempo Verbal (Temps)"
            groupName="tense"
            options={tenseOptions}
            selectedValue={tense}
            onChange={(val) => setTense(val as Tense)}
          />

          <SelectionSection
            title="4. Escolha a Estrutura (Forme)"
            groupName="structure"
            options={structureOptions}
            selectedValue={structure}
            onChange={(val) => setStructure(val as Structure)}
          />

          <ResultSection sentence={sentence} isLoading={isLoading} />

          <VerbTable />

          <ChallengeSection />
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm border-t border-gray-200 pt-6">
          <p>Desenvolvido com React, Tailwind e Google Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;