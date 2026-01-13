export enum Pronoun {
  Je = 'Je',
  Tu = 'Tu',
  Il = 'Il',
  Elle = 'Elle',
  On = 'On',
  Nous = 'Nous',
  Vous = 'Vous',
  Ils = 'Ils',
  Elles = 'Elles'
}

export interface VerbInfo {
  infinitive: string;
  participle: string;
}

export enum Tense {
  Present = 'Présent',
  PasseCompose = 'Passé composé',
  Imparfait = 'Imparfait',
  PlusQueParfait = 'Plus-que-parfait',
  FuturSimple = 'Futur simple',
  FuturProche = 'Futur proche'
}

export enum SentenceStructure {
  Affirmative = 'Affirmative',
  Negative = 'Négative',
  Interrogative = 'Interrogative'
}

export interface ChallengeData {
  pronoun: Pronoun;
  verb: VerbInfo;
  tense: Tense;
  structure: SentenceStructure;
  complement: string;
  fullSentence: string;
}

export interface SentenceVariation {
  structure: SentenceStructure;
  text: string;
}

export interface TenseGroup {
  tense: Tense;
  variations: SentenceVariation[];
}

export type FontSize = 'normal' | 'large' | 'extra-large';