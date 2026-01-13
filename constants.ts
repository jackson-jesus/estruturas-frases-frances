import { Pronoun, VerbInfo, Tense, SentenceStructure } from './types';

export const PRONOUNS: Pronoun[] = [
  Pronoun.Je, Pronoun.Tu, Pronoun.Il, Pronoun.Elle, Pronoun.On,
  Pronoun.Nous, Pronoun.Vous, Pronoun.Ils, Pronoun.Elles
];

export const VERBS: VerbInfo[] = [
  { infinitive: 'être', participle: 'été' },
  { infinitive: 'avoir', participle: 'eu' },
  { infinitive: 'faire', participle: 'fait' },
  { infinitive: 'aller', participle: 'allé' },
  { infinitive: 'dire', participle: 'dit' },
  { infinitive: 'pouvoir', participle: 'pu' },
  { infinitive: 'vouloir', participle: 'voulu' },
  { infinitive: 'savoir', participle: 'su' },
  { infinitive: 'voir', participle: 'vu' },
  { infinitive: 'venir', participle: 'venu' },
  { infinitive: 'prendre', participle: 'pris' },
  { infinitive: 'devoir', participle: 'dû' },
  { infinitive: 'falloir', participle: 'fallu' },
  { infinitive: 'donner', participle: 'donné' },
  { infinitive: 'mettre', participle: 'mis' },
  { infinitive: 'parler', participle: 'parlé' },
  { infinitive: 'penser', participle: 'pensé' },
  { infinitive: 'trouver', participle: 'trouvé' },
  { infinitive: 'aimer', participle: 'aimé' },
  { infinitive: 'comprendre', participle: 'compris' },
  { infinitive: 'se souvenir', participle: 'souvenu' },
  { infinitive: "s'en aller", participle: 'allé' }
];

export const TENSES: Tense[] = [
  Tense.Present,
  Tense.PasseCompose,
  Tense.Imparfait,
  Tense.PlusQueParfait,
  Tense.FuturSimple,
  Tense.FuturProche
];

export const STRUCTURES: SentenceStructure[] = [
  SentenceStructure.Affirmative,
  SentenceStructure.Negative,
  SentenceStructure.Interrogative
];