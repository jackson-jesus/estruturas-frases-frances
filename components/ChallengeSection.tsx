import React, { useState } from 'react';
import { ChallengeData } from '../types';
import { generateChallenge } from '../services/geminiService';

export const ChallengeSection: React.FC = () => {
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  const handleNewChallenge = async () => {
    setIsLoading(true);
    setShowSolution(false);
    setUserAnswer('');
    const data = await generateChallenge();
    setChallenge(data);
    setIsLoading(false);
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
              className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-4 focus:ring-high-contrast-focus outline-none transition"
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
              <p className="text-2xl font-medium text-gray-900">{challenge.solution}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};