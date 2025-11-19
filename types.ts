export enum Pronoun {
  JE = "Je",
  TU = "Tu",
  IL = "Il",
  ELLE = "Elle",
  ON = "On",
  NOUS = "Nous",
  VOUS = "Vous",
  ILS = "Ils",
  ELLES = "Elles"
}

export enum Verb {
  ETRE = "être",
  AVOIR = "avoir",
  FAIRE = "faire",
  ALLER = "aller",
  DIRE = "dire",
  POUVOIR = "pouvoir",
  VOULOIR = "vouloir",
  SAVOIR = "savoir",
  VOIR = "voir",
  VENIR = "venir",
  PRENDRE = "prendre",
  DEVOIR = "devoir",
  FALLOIR = "falloir",
  DONNER = "donner",
  METTRE = "mettre",
  PARLER = "parler",
  PENSER = "penser",
  TROUVER = "trouver",
  AIMER = "aimer",
  COMPRENDRE = "comprendre"
}

export const VERB_PARTICIPLES: Record<Verb, string> = {
  [Verb.ETRE]: "été",
  [Verb.AVOIR]: "eu",
  [Verb.FAIRE]: "fait",
  [Verb.ALLER]: "allé",
  [Verb.DIRE]: "dit",
  [Verb.POUVOIR]: "pu",
  [Verb.VOULOIR]: "voulu",
  [Verb.SAVOIR]: "su",
  [Verb.VOIR]: "vu",
  [Verb.VENIR]: "venu",
  [Verb.PRENDRE]: "pris",
  [Verb.DEVOIR]: "dû",
  [Verb.FALLOIR]: "fallu",
  [Verb.DONNER]: "donné",
  [Verb.METTRE]: "mis",
  [Verb.PARLER]: "parlé",
  [Verb.PENSER]: "pensé",
  [Verb.TROUVER]: "trouvé",
  [Verb.AIMER]: "aimé",
  [Verb.COMPRENDRE]: "compris"
};

export enum Tense {
  PRESENT = "Présent",
  PASSE_COMPOSE = "Passé composé",
  IMPARFAIT = "Imparfait",
  PLUS_QUE_PARFAIT = "Plus-que-parfait",
  FUTUR_SIMPLE = "Futur simple",
  FUTUR_PROCHE = "Futur proche"
}

export enum Structure {
  AFFIRMATIVE = "Afirmativa",
  NEGATIVE = "Negativa",
  INTERROGATIVE = "Interrogativa"
}

export interface SentenceRequest {
  pronoun: Pronoun;
  verb: Verb;
  tense: Tense;
  structure: Structure;
}

export interface ChallengeData {
  pronoun: string;
  verb: string;
  tense: string;
  structure: string;
  complement: string;
  solution?: string;
}