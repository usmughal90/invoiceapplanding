type HowItWorksStepType = {
 title: string;
 description: string;
};

type FaqItem = {
 question: string;
 answer: string;
};

type Review = {
 name: string;
 role?: string;
 /**
  * Rating value on a 0..5 scale.
  * Can be fractional (e.g. 4.4).
  */
 rating: number;
 text: string;
};

export type { HowItWorksStepType, FaqItem, Review };