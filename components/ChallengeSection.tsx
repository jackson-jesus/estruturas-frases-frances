import React, { useState } from 'react';
import { ChallengeData } from '../types';
import { generateChallenge, getAudioBase64 } from '../services/geminiService';
import { decode, decodeAudioData } from '../services/audioUtils';

export const ChallengeSection: React.FC = () => {
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNewChallenge = async () => {
    setIsLoading(true);
    setShowSolution(false);
    setUserAnswer('');
    const data = await generateChallenge();
    setChallenge(data);
    setIsLoading(false);
  };

  const handlePlayAudio = async (text: string | undefined) => {
    if (isPlaying || !text) return;
    setIsPlaying(true);

    try {
      const base64Data = await getAudioBase64(text);
      if (base64Data) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioBuffer = await decodeAudioData(
          decode(base64Data),
          audioContext,
          24000,
          1
        );
        
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.onended = () => setIsPlaying(false);
        source.start();
      } else {
        setIsPlaying(false);
      }
    } catch (e) {
      console.error(e);
      setIsPlaying(false);
    }
  };

  return (
    <div className="my-12 bg-indigo-50 rounded-xl p-8 border-2 border-indigo-200 shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-900 mb-6 text-center">Desafio de Frase</h2>
      
      {!challenge && !isLoading && (
        <div className="text-center">
          <p className="text-xl mb-6">Teste seus conhecimentos construindo frases aleatórias!</p>
          <button 
            onClick={handleNewChallenge}
            className="bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-indigo-700 transition focus:ring-4 focus:ring-high-contrast-focus"
          >
            Iniciar Desafio
          </button>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Gerando desafio...</p>
        </div>
      )}

      {challenge && !isLoading && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-indigo-100">
            <h3 className="text-xl font-semibold mb-4 text-indigo-800 border-b pb-2">Elementos para usar:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <li><strong>Pronome:</strong> {challenge.pronoun}</li>
              <li><strong>Verbo:</strong> {challenge.verb}</li>
              <li><strong>Tempo:</strong> {challenge.tense}</li>
              <li><strong>Estrutura:</strong> {challenge.structure}</li>
              <li className="md:col-span-2 bg-yellow-50 p-2 rounded border border-yellow-200">
                <strong>Complemento/Contexto:</strong> {challenge.complement}
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <label htmlFor="challengeInput" className="block text-xl font-bold text-gray-800">
              Escreva sua frase:
            </label>
            <input
              type="text"
              id="challengeInput"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-4 text-xl bg-yellow-50 border-2 border-yellow-200 text-gray-900 rounded-lg focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200 outline-none transition placeholder-gray-500"
              placeholder="Digite a frase em francês..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button 
              onClick={() => setShowSolution(true)}
              className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition focus:ring-4 focus:ring-high-contrast-focus"
            >
              Ver Resposta
            </button>
            <button 
              onClick={handleNewChallenge}
              className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 transition focus:ring-4 focus:ring-high-contrast-focus"
            >
              Próximo Desafio
            </button>
          </div>

          {showSolution && (
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-6 rounded animate-fade-in">
              <h4 className="text-lg font-bold text-green-800 mb-2">Solução Sugerida:</h4>
              <div className="flex flex-col gap-3">
                <p className="text-2xl font-medium text-gray-900">{challenge.solution}</p>
                <button 
                  onClick={() => handlePlayAudio(challenge.solution)}
                  disabled={isPlaying}
                  className={`
                    self-start flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-all
                    ${isPlaying 
                      ? 'bg-green-200 text-green-800 cursor-wait' 
                      : 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50'}
                  `}
                  aria-label="Ouvir a resposta"
                >
                  {isPlaying ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Ouvindo...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                      </svg>
                      Escutar Áudio
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};