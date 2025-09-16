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
      "Something changed in my life recently... help me make things click.",
    answers: ["illness", "sickness"],
    reconfigure: ["i", "l", "n", "e", "s", "c", "k"],
  },
  {
    question: "If I just listen closely, I can hear the sick being...",
    answers: ["caged"],
    audio: true,
  },
  {
    question:
      "If I inspect myself closely, maybe I can remember - what was I searching for?",
    answers: ["medicine", "cure"],
    hiddenWords: [
      "Often thanked only after the cause is gone",
      "Is sought and researched, ending what time alone often cannot",
    ],
  },
];
