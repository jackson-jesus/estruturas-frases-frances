import React, { useState } from 'react';
import { PRONOUNS, VERBS, TENSES, STRUCTURES } from '../constants';
import { ChallengeData } from '../types';
import { generateChallengeScenario, playGeminiTTS } from '../services/gemini';
import { Play, CheckCircle, Loader2, Volume2 } from 'lucide-react';

const ChallengeSection: React.FC = () => {
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const startChallenge = async () => {
    setLoading(true);
    setChallenge(null);
    setUserAnswer('');
    setShowAnswer(false);
    setFeedback(null);

    const rPronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
    const rVerb = VERBS[Math.floor(Math.random() * VERBS.length)];
    const rTense = TENSES[Math.floor(Math.random() * TENSES.length)];
    const rStructure = STRUCTURES[Math.floor(Math.random() * STRUCTURES.length)];

    try {
      const data = await generateChallengeScenario(rPronoun, rVerb, rTense, rStructure);
      setChallenge(data);
    } catch (e) {
      setFeedback("Erro ao gerar desafio. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = async (text: string) => {
    if (audioLoading) return;
    setAudioLoading(true);
    try {
      await playGeminiTTS(text);
    } catch (error) {
      alert("Não foi possível reproduzir o áudio.");
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-primary dark:text-blue-400">
        <CheckCircle className="w-8 h-8" />
        Desafio de Frase
      </h2>

      <div className="text-center mb-6">
        {!challenge && !loading && (
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Teste seus conhecimentos! Gere uma combinação aleatória e tente construir a frase correta.
          </p>
        )}
        
        <button
          onClick={startChallenge}
          disabled={loading}
          className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Play fill="currentColor" />}
          {challenge ? 'Novo Desafio' : 'Iniciar Desafio'}
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
           <div className="animate-pulse text-indigo-500 text-xl">Criando desafio com IA...</div>
        </div>
      )}

      {challenge && !loading && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-inner border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Construa a frase usando:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <span className="block text-sm text-gray-500 dark:text-gray-400 uppercase">Pronome</span>
                <span className="text-lg font-bold text-blue-700 dark:text-blue-300">{challenge.pronoun}</span>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <span className="block text-sm text-gray-500 dark:text-gray-400 uppercase">Verbo</span>
                <span className="text-lg font-bold text-blue-700 dark:text-blue-300">{challenge.verb.infinitive}</span>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <span className="block text-sm text-gray-500 dark:text-gray-400 uppercase">Tempo</span>
                <span className="text-lg font-bold text-blue-700 dark:text-blue-300">{challenge.tense}</span>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <span className="block text-sm text-gray-500 dark:text-gray-400 uppercase">Estrutura</span>
                <span className="text-lg font-bold text-blue-700 dark:text-blue-300">{challenge.structure}</span>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700/50 rounded-lg">
              <span className="block text-sm text-yellow-700 dark:text-yellow-400 font-semibold mb-1">Complemento Sugerido (inclua isto):</span>
              <span className="text-xl text-gray-800 dark:text-gray-200 italic">"... {challenge.complement}"</span>
            </div>
          </div>

          <div className="space-y-4">
            <label htmlFor="challenge-input" className="sr-only">Sua resposta</label>
            <textarea
              id="challenge-input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Digite sua frase em francês aqui..."
              className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none h-32"
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowAnswer(true)}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-sm"
              >
                Ver Resposta
              </button>
            </div>
          </div>

          {showAnswer && (
            <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in">
              <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Resposta Correta:</h4>
              <div className="flex items-start justify-between gap-4">
                <p className="text-2xl text-gray-800 dark:text-white font-serif">
                  {challenge.fullSentence}
                </p>
                <button
                  onClick={() => handlePlayAudio(challenge.fullSentence)}
                  disabled={audioLoading}
                  className="p-3 bg-green-100 dark:bg-green-800 rounded-full text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-700 transition-colors flex-shrink-0 disabled:opacity-50"
                  aria-label="Ouvir resposta"
                >
                  {audioLoading ? <Loader2 className="animate-spin" size={24} /> : <Volume2 size={24} />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChallengeSection;
