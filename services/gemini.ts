import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Pronoun, VerbInfo, Tense, SentenceStructure, ChallengeData, TenseGroup } from "../types";
import { TENSES, STRUCTURES } from "../constants";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key is missing");
    throw new Error("API Key is missing. Please check your environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateConjugationTable = async (
  pronoun: Pronoun,
  verb: VerbInfo
): Promise<TenseGroup[]> => {
  try {
    const ai = getAiClient();
    
    const tensesList = TENSES.join(", ");
    const structuresList = STRUCTURES.join(", ");

    const prompt = `
      You are a French teacher.
      Task: Generate a complete list of French sentences for the Pronoun "${pronoun}" and the Verb "${verb.infinitive}".
      
      1. First, choose ONE natural, simple complement (e.g., "une pomme", "au cinéma", "demain") that fits this verb nicely.
      2. Use EXACTLY the same complement for ALL sentences to show the grammatical changes clearly.
      3. Generate sentences for ALL of the following tenses: ${tensesList}.
      4. For EACH tense, generate the sentence in ALL 3 structures: ${structuresList}.
      
      CRITICAL RULES FOR STRUCTURES:
      - Affirmative: Standard Subject + Verb structure.
      - Negative: Use "ne ... pas" around the conjugated verb.
      - Interrogative: YOU MUST ALWAYS START WITH "Est-ce que" (or "Est-ce qu'" before a vowel). 
        - Example: "Est-ce que tu manges ?"
        - Example: "Est-ce qu'il aime ?"
        - Do NOT use inversion (e.g., "Manges-tu ?").
        - ALWAYS end with a question mark "?".
      
      Output must be a JSON array where each item represents a Tense, containing an array of variations (structure + text).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tense: { type: Type.STRING, enum: TENSES },
              variations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    structure: { type: Type.STRING, enum: STRUCTURES },
                    text: { type: Type.STRING }
                  },
                  required: ["structure", "text"]
                }
              }
            },
            required: ["tense", "variations"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    let data = JSON.parse(text) as TenseGroup[];

    // Post-processing to ENFORCE "Est-ce que" rule strictly
    data = data.map(group => ({
      ...group,
      variations: group.variations.map(v => {
        if (v.structure === SentenceStructure.Interrogative) {
          let cleanText = v.text.trim();
          // Remove ending punctuation for processing
          if (cleanText.endsWith('?') || cleanText.endsWith('.')) {
            cleanText = cleanText.slice(0, -1);
          }
          
          // Check if it starts with Est-ce que
          const lower = cleanText.toLowerCase();
          if (!lower.startsWith("est-ce que") && !lower.startsWith("est-ce qu")) {
             // If not, prepend it. Lowercase the original first letter (simple heuristic)
             const firstChar = cleanText.charAt(0).toLowerCase();
             const rest = cleanText.slice(1);
             cleanText = `Est-ce que ${firstChar}${rest}`;
          }
          
          // Ensure it ends with ?
          return { ...v, text: cleanText + "?" };
        }
        return v;
      })
    }));

    return data;

  } catch (error) {
    console.error("Gemini Table Error:", error);
    throw error;
  }
};

export const generateChallengeScenario = async (
  pronoun: Pronoun,
  verb: VerbInfo,
  tense: Tense,
  structure: SentenceStructure
): Promise<ChallengeData> => {
  try {
    const ai = getAiClient();
    const prompt = `
      Create a challenge for a French student.
      Parameters:
      - Pronoun: ${pronoun}
      - Verb: ${verb.infinitive}
      - Tense: ${tense}
      - Structure: ${structure}

      Task:
      1. Create a grammatically correct French sentence using these parameters with a suitable complement.
      2. If the structure is '${SentenceStructure.Interrogative}', you MUST use the form starting with "Est-ce que" (or "Est-ce qu'") and end with "?".
      3. Extract that specific complement.
      
      Output JSON format:
      {
        "complement": "the complement used (in French)",
        "fullSentence": "the full french sentence"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            complement: { type: Type.STRING },
            fullSentence: { type: Type.STRING }
          },
          required: ["complement", "fullSentence"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data returned");
    
    const data = JSON.parse(text);

    return {
      pronoun,
      verb,
      tense,
      structure,
      complement: data.complement,
      fullSentence: data.fullSentence
    };

  } catch (error) {
    console.error("Gemini Challenge Error:", error);
    throw error;
  }
};

// Singleton AudioContext to prevent "too many audio contexts" error
let sharedAudioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!sharedAudioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    sharedAudioContext = new AudioContextClass({ sampleRate: 24000 });
  }
  return sharedAudioContext;
};

export const playGeminiTTS = async (text: string): Promise<void> => {
  try {
    const ai = getAiClient();
    
    // Ensure context is running (must be called after user gesture ideally, but here we handle resume)
    const audioContext = getAudioContext();
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("No audio data received from Gemini");
    }

    // Decode Base64 string to byte array
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // RAW PCM Decoding (Gemini returns raw PCM, not WAV/MP3)
    // Format: 24kHz, 1 channel, Int16
    const int16Data = new Int16Array(bytes.buffer);
    const float32Data = new Float32Array(int16Data.length);
    
    // Convert Int16 PCM to Float32 (-1.0 to 1.0)
    for (let i = 0; i < int16Data.length; i++) {
        float32Data[i] = int16Data[i] / 32768.0;
    }

    const audioBuffer = audioContext.createBuffer(1, float32Data.length, 24000);
    audioBuffer.copyToChannel(float32Data, 0);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
    
    return new Promise((resolve) => {
      source.onended = () => {
        resolve();
        // Do not close shared context
      };
    });

  } catch (error) {
    console.error("TTS Error:", error);
    throw error;
  }
};