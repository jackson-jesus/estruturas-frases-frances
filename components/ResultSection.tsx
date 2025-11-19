import React, { useState } from 'react';
import { getAudioBase64 } from '../services/geminiService';
import { decode, decodeAudioData } from '../services/audioUtils';

interface ResultSectionProps {
  sentence: string;
  isLoading: boolean;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ sentence, isLoading }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = async () => {
    if (isPlaying || !sentence) return;
    setIsPlaying(true);

    try {
      const base64Data = await getAudioBase64(sentence);
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

  if (isLoading) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-lg text-center my-8" role="status">
        <p className="text-xl font-bold text-yellow-800 animate-pulse">Criando sua frase...</p>
      </div>
    );
  }

  if (!sentence) return null;

  return (
    <div className="bg-blue-50 border-2 border-high-contrast-accent p-8 rounded-xl shadow-lg my-8 text-center">
      <h3 className="text-xl text-gray-600 mb-2 font-semibold">Frase Gerada:</h3>
      <p className="text-3xl md:text-4xl font-bold text-high-contrast-text mb-6 leading-relaxed">
        {sentence}
      </p>
      
      <button
        onClick={handlePlayAudio}
        disabled={isPlaying}
        className={`
          inline-flex items-center px-8 py-4 rounded-full text-xl font-bold text-white shadow-md transition-transform
          ${isPlaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-high-contrast-accent hover:bg-blue-700 active:scale-95 focus:ring-4 focus:ring-high-contrast-focus'}
        `}
        aria-label="Ouvir pronúncia da frase"
      >
        {isPlaying ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Ouvindo...
          </>
        ) : (
          <>
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
            </svg>
            Escutar Áudio
          </>
        )}
      </button>
    </div>
  );
};