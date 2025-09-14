"use client";

import { useState } from "react";
import { riddles } from "./config";
import LandingPage from "./components/LandingPage";
import RiddleGame from "./components/RiddleGame";
import WinScreen from "./components/WinScreen";

type GameState = "landing" | "playing" | "won";

export default function Game() {
  const [gameState, setGameState] = useState<GameState>("landing");
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const startGame = () => {
    setGameState("playing");
    setCurrentRiddleIndex(0);
    setUserAnswers([]);
  };

  const nextRiddle = (answer: string) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (currentRiddleIndex < riddles.length - 1) {
      setCurrentRiddleIndex(currentRiddleIndex + 1);
    } else {
      setGameState("won");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {gameState === "landing" && <LandingPage onStartGame={startGame} />}
      {gameState === "playing" && (
        <RiddleGame
          riddle={riddles[currentRiddleIndex]}
          riddleNumber={currentRiddleIndex + 1}
          totalRiddles={riddles.length}
          onCorrectAnswer={nextRiddle}
        />
      )}
      {gameState === "won" && <WinScreen userAnswers={userAnswers} />}
    </div>
  );
}
