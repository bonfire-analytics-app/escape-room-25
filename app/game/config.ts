export type Riddle = {
  question: string;
  answers: string[];
  audio?: boolean;
  reconfigure?: string[];
  hiddenWords?: string[];
};

export const riddles: Riddle[] = [
  {
    question:
      "Something significant disrupted my life recently... help me form an idea or two on what happened to make my incomplete memories click.",
    answers: ["illness", "sickness"],
    reconfigure: ["i", "l", "n", "e", "s", "c", "k"],
  },
  {
    question:
      "After first contact with the disease, I was doing something within my community. If I listen carefully, maybe I can remember what that was...",
    answers: ["begged"],
    audio: true,
  },
  {
    question:
      "I begged and begged, but no one could help. I decided to leave the community to find something - if I inspect myself closely, maybe I can remember what it was I was trying to find...",
    answers: ["medicine", "cure"],
    hiddenWords: [
      "Often thanked only after the cause is gone",
      "Is sought and researched, ending what time alone often cannot",
    ],
  },
];
