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
      "When I was in school, I always felt like I had to go above and beyond. What is it that traumatizes me?",
    answers: ["extra credit", "ec"],
    audio: true,
  },
  {
    question:
      "The hints of painful memories linger, but if I inspect more closely, what hope can I find for relief?",
    answers: ["acceptance", "time"],
    hiddenWords: [
      "when you change your relationship with pain, you can learn to carry it more lightly",
      "everything fades",
    ],
  },
  {
    question:
      "Help me identify and reconfigure my mentality so I can take a simple action to move in the right direction.",
    answers: ["step", "stride", "rise"],
    reconfigure: ["s", "e", "t", "p", "r", "i", "d"],
  },
];
