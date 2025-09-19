export type Scenario = {
  label: string;
  options: Option[];
};
export type Option = {
  label: string;
  happinessValue: number;
  fulfillmentValue: number;
  healthValue: number;
};

export const gameOverTexts = [
  `You tried to falsify memories >:(`,
  `Not quite how it happened`,
  `I guess you really don't know me`,
  `So close, yet so far`,
  `Why did you think that was right?`,
];

export const scenarios: Scenario[] = [
  {
    label: "Where was I born?",
    options: [
      {
        label: "Pandaland",
        happinessValue: 11,
        fulfillmentValue: 4,
        healthValue: -5,
      },
      {
        label: "Chengdu",
        happinessValue: 4,
        fulfillmentValue: 5,
        healthValue: 0,
      },
      {
        label: "NYC",
        happinessValue: 7,
        fulfillmentValue: 2,
        healthValue: 1,
      },
    ],
  },
  {
    label: "What did I pursue for my career?",
    options: [
      {
        label: "Software engineering",
        happinessValue: 11,
        fulfillmentValue: -4,
        healthValue: 3,
      },
      {
        label: "Doctor",
        happinessValue: 2,
        fulfillmentValue: 21,
        healthValue: -14,
      },
      {
        label: "Funemployed",
        happinessValue: 18,
        fulfillmentValue: -14,
        healthValue: 6,
      },
    ],
  },
  {
    label: "What was my favorite childhood snack?",
    options: [
      {
        label: "Bamboo shoots with honey",
        happinessValue: 18,
        fulfillmentValue: -4,
        healthValue: -6,
      },
      {
        label: "Fresh fruit from the mountain",
        happinessValue: 4,
        fulfillmentValue: -3,
        healthValue: 7,
      },
      {
        label: "Rice cakes from the village",
        happinessValue: 3,
        fulfillmentValue: 4,
        healthValue: 1,
      },
    ],
  },
  {
    label: "What did I like to do for fun when I was young?",
    options: [
      {
        label: "Climbed the tallest trees",
        happinessValue: 11,
        fulfillmentValue: -8,
        healthValue: 6,
      },
      {
        label: "Played with other forest creatures",
        happinessValue: 6,
        fulfillmentValue: 10,
        healthValue: -7,
      },
      {
        label: "Rolled down grassy hills",
        happinessValue: 7,
        fulfillmentValue: -10,
        healthValue: 12,
      },
    ],
  },
  {
    label: "Who was my closest companion growing up?",
    options: [
      {
        label: "An old wise turtle",
        happinessValue: -6,
        fulfillmentValue: 13,
        healthValue: 2,
      },
      {
        label: "A playful red panda",
        happinessValue: 15,
        fulfillmentValue: -8,
        healthValue: 2,
      },
      {
        label: "A patient human caretaker",
        happinessValue: -8,
        fulfillmentValue: 4,
        healthValue: 13,
      },
    ],
  },
  {
    label: "What skill was I most proud of learning?",
    options: [
      {
        label: "Meditation and inner peace",
        happinessValue: -15,
        fulfillmentValue: 16,
        healthValue: 8,
      },
      {
        label: "Acrobatic tree dancing",
        happinessValue: 10,
        fulfillmentValue: -5,
        healthValue: 3,
      },
      {
        label: "Mastering human language",
        happinessValue: 4,
        fulfillmentValue: 15,
        healthValue: -10,
      },
    ],
  },
  {
    label: "What was my favorite season?",
    options: [
      {
        label: "Spring, when bamboo grew fresh",
        happinessValue: 5,
        fulfillmentValue: -2,
        healthValue: 7,
      },
      {
        label: "Summer, for warm afternoon naps",
        happinessValue: 18,
        fulfillmentValue: -7,
        healthValue: -2,
      },
      {
        label: "Autumn, with colorful falling leaves",
        happinessValue: 3,
        fulfillmentValue: 4,
        healthValue: 2,
      },
      {
        label: "Winter, with its peaceful snow",
        happinessValue: -4,
        fulfillmentValue: 9,
        healthValue: 4,
      },
    ],
  },
  {
    label: "What was my favorite travel destination?",
    options: [
      {
        label: "Any place with forests and mountains",
        happinessValue: 3,
        fulfillmentValue: 2,
        healthValue: 3,
      },
      {
        label: "The bustling cities full of life",
        happinessValue: 8,
        fulfillmentValue: 4,
        healthValue: -4,
      },
      {
        label: "I never traveled",
        happinessValue: -4,
        fulfillmentValue: -4,
        healthValue: 16,
      },
    ],
  },
  {
    label: "What was my relationship with my siblings?",
    options: [
      {
        label: "I was the protective older brother",
        happinessValue: 6,
        fulfillmentValue: 13,
        healthValue: -9,
      },
      {
        label: "I was the playful younger sister",
        happinessValue: 13,
        fulfillmentValue: -6,
        healthValue: 2,
      },
      {
        label: "I was an only child",
        happinessValue: -4,
        fulfillmentValue: 7,
        healthValue: 7,
      },
    ],
  },
  {
    label: "What was my favorite way to spend rainy days?",
    options: [
      {
        label: "Reading fantastical stories by the window",
        happinessValue: 7,
        fulfillmentValue: 1,
        healthValue: 2,
      },
      {
        label: "Playing in puddles and getting muddy",
        happinessValue: 14,
        fulfillmentValue: -7,
        healthValue: 3,
      },
      {
        label: "Sleeping peacefully all day",
        happinessValue: 7,
        fulfillmentValue: -9,
        healthValue: 11,
      },
    ],
  },
  {
    label: "What kind of music did I love most?",
    options: [
      {
        label: "The sounds of nature and wind",
        happinessValue: 2,
        fulfillmentValue: 1,
        healthValue: 7,
      },
      {
        label: "Upbeat songs that made me dance",
        happinessValue: 15,
        fulfillmentValue: -6,
        healthValue: 1,
      },
      {
        label: "Soft lullabies that helped me sleep",
        happinessValue: -2,
        fulfillmentValue: 1,
        healthValue: 11,
      },
    ],
  },
  {
    label: "How did I handle conflict with others?",
    options: [
      {
        label: "I avoided confrontation at all costs",
        happinessValue: 9,
        fulfillmentValue: -3,
        healthValue: 4,
      },
      {
        label: "I faced problems directly and honestly",
        happinessValue: -2,
        fulfillmentValue: 8,
        healthValue: 4,
      },
      {
        label: "I used humor to diffuse tension",
        happinessValue: 11,
        fulfillmentValue: -2,
        healthValue: 1,
      },
    ],
  },
  {
    label: "What was my favorite type of weather?",
    options: [
      {
        label: "Bright sunny days with gentle breezes",
        happinessValue: 12,
        fulfillmentValue: -6,
        healthValue: 4,
      },
      {
        label: "Misty mornings with cool air",
        happinessValue: -5,
        fulfillmentValue: 8,
        healthValue: 7,
      },
      {
        label: "Dramatic thunderstorms",
        happinessValue: 6,
        fulfillmentValue: 7,
        healthValue: -3,
      },
    ],
  },
  {
    label: "What was my relationship with my community?",
    options: [
      {
        label: "I was a careful, respectful member",
        happinessValue: -5,
        fulfillmentValue: 4,
        healthValue: 11,
      },
      {
        label: "I knew every single panda like family",
        happinessValue: 8,
        fulfillmentValue: 16,
        healthValue: -14,
      },
      {
        label: "I had a tight-knit group of close friends",
        happinessValue: 5,
        fulfillmentValue: 3,
        healthValue: 2,
      },
    ],
  },
  {
    label: "How did I approach learning new things?",
    options: [
      {
        label: "I was methodical and patient",
        happinessValue: -7,
        fulfillmentValue: 11,
        healthValue: 6,
      },
      {
        label: "I jumped in enthusiastically",
        happinessValue: 14,
        fulfillmentValue: 5,
        healthValue: -9,
      },
      {
        label: "I preferred to watch others first",
        happinessValue: 3,
        fulfillmentValue: -4,
        healthValue: 11,
      },
    ],
  },
  {
    label: "What was my sleeping schedule like?",
    options: [
      {
        label: "Early to bed, early to rise",
        happinessValue: -4,
        fulfillmentValue: 3,
        healthValue: 11,
      },
      {
        label: "I stayed up late enjoying the night",
        happinessValue: 17,
        fulfillmentValue: -1,
        healthValue: -6,
      },
      {
        label: "I napped whenever I felt tired",
        happinessValue: 2,
        fulfillmentValue: 1,
        healthValue: 7,
      },
    ],
  },
  {
    label: "What did I do when I felt overwhelmed?",
    options: [
      {
        label: "I retreated to quiet, peaceful places",
        happinessValue: -2,
        fulfillmentValue: 3,
        healthValue: 9,
      },
      {
        label: "I sought comfort from close friends",
        happinessValue: 2,
        fulfillmentValue: 4,
        healthValue: 4,
      },
      {
        label: "I pushed through and kept working",
        happinessValue: -7,
        fulfillmentValue: 11,
        healthValue: 5,
      },
    ],
  },
  {
    label: "How did I celebrate my achievements?",
    options: [
      {
        label: "With quiet personal reflection",
        happinessValue: -9,
        fulfillmentValue: 10,
        healthValue: 8,
      },
      {
        label: "With big parties and lots of friends",
        happinessValue: 18,
        fulfillmentValue: 4,
        healthValue: -12,
      },
      {
        label: "I rarely celebrated, just moved on",
        happinessValue: 1,
        fulfillmentValue: -7,
        healthValue: 16,
      },
    ],
  },
  {
    label: "What was my attitude toward change?",
    options: [
      {
        label: "I embraced it as an adventure",
        happinessValue: 9,
        fulfillmentValue: 11,
        healthValue: -10,
      },
      {
        label: "I found it stressful but adapted",
        happinessValue: -4,
        fulfillmentValue: 8,
        healthValue: 5,
      },
      {
        label: "I preferred familiar routines",
        happinessValue: 2,
        fulfillmentValue: -8,
        healthValue: 15,
      },
    ],
  },
  {
    label: "What role did I play in group settings?",
    options: [
      {
        label: "The natural leader who organized everyone",
        happinessValue: 3,
        fulfillmentValue: 14,
        healthValue: -7,
      },
      {
        label: "The supportive friend who helped others",
        happinessValue: 5,
        fulfillmentValue: 9,
        healthValue: -4,
      },
      {
        label: "The quiet observer who listened",
        happinessValue: -8,
        fulfillmentValue: 6,
        healthValue: 12,
      },
    ],
  },
  {
    label: "How did I express creativity?",
    options: [
      {
        label: "Through artistic pursuits like painting",
        happinessValue: 6,
        fulfillmentValue: 7,
        healthValue: -3,
      },
      {
        label: "Through storytelling and imagination",
        happinessValue: 4,
        fulfillmentValue: 3,
        healthValue: 3,
      },
      {
        label: "Through practical problem-solving",
        happinessValue: 2,
        fulfillmentValue: 6,
        healthValue: 2,
      },
    ],
  },
  {
    label: "What was my relationship with technology?",
    options: [
      {
        label: "I was fascinated by how things worked",
        happinessValue: 6,
        fulfillmentValue: 12,
        healthValue: -8,
      },
      {
        label: "I preferred simpler, natural ways",
        happinessValue: 3,
        fulfillmentValue: 1,
        healthValue: 6,
      },
      {
        label: "I mastered it for practical use",
        happinessValue: 2,
        fulfillmentValue: -3,
        healthValue: 11,
      },
    ],
  },
  {
    label: "What motivated me to get up each morning?",
    options: [
      {
        label: "The excitement of new possibilities",
        happinessValue: 10,
        fulfillmentValue: 5,
        healthValue: -5,
      },
      {
        label: "My sense of duty and responsibility",
        happinessValue: -4,
        fulfillmentValue: 19,
        healthValue: -5,
      },
      {
        label: "The simple pleasure of being alive",
        happinessValue: 5,
        fulfillmentValue: 3,
        healthValue: 2,
      },
    ],
  },
];

export const negativeScenarios: Scenario[] = [
  {
    label: "What was the biggest tragedy of my life?",
    options: [
      {
        label: "Heartbreak from a lost love",
        happinessValue: -24,
        fulfillmentValue: -2,
        healthValue: -5,
      },
      {
        label: "Losing my favorite red ball in the mountains",
        happinessValue: -16,
        fulfillmentValue: -7,
        healthValue: -7,
      },
      {
        label: "Losing my home to a forest fire",
        happinessValue: -3,
        fulfillmentValue: -11,
        healthValue: -16,
      },
    ],
  },
  {
    label: "What was my greatest regret?",
    options: [
      {
        label: "Being forgotten by those I loved",
        happinessValue: -7,
        fulfillmentValue: -21,
        healthValue: -2,
      },
      {
        label: "Losing my connection to nature",
        happinessValue: -13,
        fulfillmentValue: -13,
        healthValue: -5,
      },
      {
        label: "Never finding my true purpose",
        happinessValue: -3,
        fulfillmentValue: -24,
        healthValue: -3,
      },
    ],
  },
  {
    label: "What was my most regretful vice?",
    options: [
      {
        label: "Addiction to social media",
        happinessValue: 4,
        fulfillmentValue: -21,
        healthValue: -13,
      },
      {
        label: "Reliance on drugs and alcohol",
        happinessValue: 4,
        fulfillmentValue: -13,
        healthValue: -22,
      },
      {
        label: "Avoidance of personal responsibility",
        happinessValue: -13,
        fulfillmentValue: -21,
        healthValue: 4,
      },
    ],
  },
  {
    label: "What was my deepest fear about myself?",
    options: [
      {
        label: "That I would always be alone",
        happinessValue: -16,
        fulfillmentValue: -12,
        healthValue: -3,
      },
      {
        label: "That I was fundamentally broken",
        happinessValue: -9,
        fulfillmentValue: -11,
        healthValue: -9,
      },
      {
        label: "That I would never be enough",
        happinessValue: -6,
        fulfillmentValue: -23,
        healthValue: -1,
      },
    ],
  },
  {
    label: "What was the most painful goodbye I ever said?",
    options: [
      {
        label: "To my best friend who moved away",
        happinessValue: -18,
        fulfillmentValue: -8,
        healthValue: -4,
      },
      {
        label: "To my parents when I left home forever",
        happinessValue: -13,
        fulfillmentValue: -13,
        healthValue: -5,
      },
      {
        label: "To my younger, more innocent self",
        happinessValue: -21,
        fulfillmentValue: -2,
        healthValue: -7,
      },
    ],
  },
  {
    label: "What disaster did I experience?",
    options: [
      {
        label: "A chemical spill that poisoned my home",
        happinessValue: -7,
        fulfillmentValue: -2,
        healthValue: -22,
      },
      {
        label: "A hurricane that tore through my entire community",
        happinessValue: -15,
        fulfillmentValue: -4,
        healthValue: -11,
      },
      {
        label: "A war that devastated my family and my childhood",
        happinessValue: -9,
        fulfillmentValue: -19,
        healthValue: -2,
      },
    ],
  },
];
