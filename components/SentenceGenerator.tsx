import React, { useState } from 'react';
import { PRONOUNS, VERBS } from '../constants';
import { Pronoun, VerbInfo, TenseGroup, SentenceStructure } from '../types';
import { generateConjugationTable, playGeminiTTS } from '../services/gemini';
import { Volume2, Sparkles, Loader2, Download } from 'lucide-react';

const SentenceGenerator: React.FC = () => {
  const [selectedPronoun, setSelectedPronoun] = useState<Pronoun | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<VerbInfo | null>(null);
  
  const [results, setResults] = useState<TenseGroup[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const canGenerate = selectedPronoun && selectedVerb;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    
    setLoading(true);
    setResults(null);
    
    try {
      const data = await generateConjugationTable(selectedPronoun, selectedVerb);
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar frases. Verifique sua conexão ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = async (text: string, id: string) => {
    if (playingAudioId) return; // Prevent multiple plays at once
    
    setPlayingAudioId(id);
    try {
      await playGeminiTTS(text);
    } catch (error) {
      alert("Não foi possível reproduzir o áudio. Tente interagir com a página novamente.");
    } finally {
      setPlayingAudioId(null);
    }
  };

  const handleDownload = () => {
    if (!results || !selectedPronoun || !selectedVerb) return;

    let content = `Estudo de Francês\n`;
    content += `Data: ${new Date().toLocaleDateString()}\n`;
    content += `Pronome: ${selectedPronoun}\n`;
    content += `Verbo: ${selectedVerb.infinitive} (PP: ${selectedVerb.participle})\n\n`;
    content += `--------------------------------\n\n`;

    results.forEach(group => {
      content += `[ ${group.tense} ]\n`;
      group.variations.forEach(v => {
        content += `  - ${v.structure}: ${v.text}\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `frances_${selectedPronoun}_${selectedVerb.infinitive}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Função auxiliar para cores baseadas na estrutura
  const getStructureColor = (structure: SentenceStructure) => {
    switch (structure) {
      case SentenceStructure.Affirmative: return 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case SentenceStructure.Negative: return 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case SentenceStructure.Interrogative: return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      
      {/* Selection Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pronouns */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-lg mb-3 text-primary dark:text-blue-400 border-b pb-2 dark:border-gray-700">1. Escolha o Pronome</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PRONOUNS.map((p) => (
              <label key={p} className={`
                flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all border
                ${selectedPronoun === p 
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 shadow-sm' 
                  : 'bg-gray-50 dark:bg-gray-700/50 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}>
                <input
                  type="radio"
                  name="pronoun"
                  className="sr-only"
                  checked={selectedPronoun === p}
                  onChange={() => setSelectedPronoun(p)}
                />
                <span className={`font-bold ${selectedPronoun === p ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                  {p}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Verbs */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-lg mb-3 text-primary dark:text-blue-400 border-b pb-2 dark:border-gray-700">2. Escolha o Verbo</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
            {VERBS.map((v) => (
              <label key={v.infinitive} className={`
                flex items-center p-2 rounded-lg cursor-pointer transition-colors border
                ${selectedVerb?.infinitive === v.infinitive
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400'
                  : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}>
                <input
                  type="radio"
                  name="verb"
                  className="sr-only"
                  checked={selectedVerb === v}
                  onChange={() => setSelectedVerb(v)}
                />
                <div className="w-full flex justify-between items-center">
                  <span className={`font-medium ${selectedVerb === v ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'}`}>
                    {v.infinitive}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    PP: {v.participle}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex flex-col items-center mt-8 space-y-4">
        <button
          onClick={handleGenerate}
          disabled={!canGenerate || loading}
          className={`
            w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1
            ${canGenerate 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer' 
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'}
          `}
        >
          {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
          Gerar Lista de Frases
        </button>
        {!canGenerate && (
          <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            Selecione um pronome e um verbo para começar
          </p>
        )}
      </div>

      {/* Results List Area */}
      {results && (
        <div className="space-y-6 animate-fade-in">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Resultados
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedPronoun}</span> + <span className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedVerb?.infinitive}</span>
              </p>
            </div>
            
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors font-medium text-sm"
              title="Baixar lista em arquivo texto"
            >
              <Download size={18} />
              Baixar Lista (TXT)
            </button>
           </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {results.map((group) => (
              <div key={group.tense} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{group.tense}</h3>
                </div>
                <div className="p-4 space-y-3">
                  {group.variations.map((variation, idx) => {
                    const uniqueId = `${group.tense}-${idx}-${variation.structure}`;
                    const isPlaying = playingAudioId === uniqueId;
                    return (
                      <div 
                        key={uniqueId} 
                        className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${getStructureColor(variation.structure)}`}
                      >
                        <div className="flex-1">
                          <span className="text-xs font-bold opacity-70 uppercase tracking-wider block mb-1">
                            {variation.structure}
                          </span>
                          <p className="text-lg font-medium leading-snug">
                            {variation.text}
                          </p>
                        </div>
                        <button
                          onClick={() => handlePlayAudio(variation.text, uniqueId)}
                          disabled={playingAudioId !== null}
                          className={`self-end sm:self-center p-2 rounded-full transition-colors flex-shrink-0 
                            ${isPlaying 
                              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' 
                              : 'bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 disabled:opacity-50 disabled:cursor-not-allowed'}`}
                          title="Ouvir áudio"
                          aria-label={`Ouvir frase: ${variation.text}`}
                        >
                          {isPlaying ? <Loader2 className="animate-spin" size={20} /> : <Volume2 size={20} />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SentenceGenerator;