"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Play, AlertTriangle, X, Star } from "lucide-react";
import { scenarios, negativeScenarios, gameOverTexts, Option } from "./config";

enum GameState {
  HOME = "home",
  PLAYING = "playing",
  WON = "won",
  LOST = "lost",
}

interface GameStats {
  health: number;
  happiness: number;
  fulfillment: number;
}

interface PlayerChoice {
  scenarioLabel: string;
  optionSelected: Option;
  isNegativeScenario: boolean;
  roundNumber: number;
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [stats, setStats] = useState<GameStats>({
    health: 30,
    happiness: 30,
    fulfillment: 30,
  });
  const [usedScenarios, setUsedScenarios] = useState<number[]>([0]);
  const [usedNegativeScenarios, setUsedNegativeScenarios] = useState<number[]>(
    []
  );
  const [roundNumber, setRoundNumber] = useState(1);
  const [isProcessingChoice, setIsProcessingChoice] = useState(false);
  const [gameOverText, setGameOverText] = useState("");
  const [playerChoices, setPlayerChoices] = useState<PlayerChoice[]>([]);
  const [showChoiceDetails, setShowChoiceDetails] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [winningProperty, setWinningProperty] = useState<string | null>(null);

  // Persistent motion values for bars
  const healthWidth = useMotionValue("30%");
  const happinessWidth = useMotionValue("30%");
  const fulfillmentWidth = useMotionValue("30%");

  // Final display values for win/loss states
  const finalHealthWidth = useMotionValue("30%");
  const finalHappinessWidth = useMotionValue("30%");
  const finalFulfillmentWidth = useMotionValue("30%");

  const smoothHealthWidth = useSpring(healthWidth, { duration: 0.8 });
  const smoothHappinessWidth = useSpring(happinessWidth, { duration: 0.8 });
  const smoothFulfillmentWidth = useSpring(fulfillmentWidth, { duration: 0.8 });

  // Update motion values when stats change
  useEffect(() => {
    const healthPercentage = Math.min(
      100,
      Math.max(0, (stats.health / 100) * 100)
    );
    const happinessPercentage = Math.min(
      100,
      Math.max(0, (stats.happiness / 100) * 100)
    );
    const fulfillmentPercentage = Math.min(
      100,
      Math.max(0, (stats.fulfillment / 100) * 100)
    );

    // Check if this will trigger win/loss state
    const willWin =
      stats.health >= 100 || stats.happiness >= 100 || stats.fulfillment >= 100;
    const willLose =
      stats.health < 0 || stats.happiness < 0 || stats.fulfillment < 0;

    if (willWin || willLose) {
      // Set final values immediately for win/loss display
      finalHealthWidth.set(`${healthPercentage}%`);
      finalHappinessWidth.set(`${happinessPercentage}%`);
      finalFulfillmentWidth.set(`${fulfillmentPercentage}%`);

      // Update game state - prioritize win over loss
      if (willWin) {
        // Determine which property caused the win
        if (stats.health >= 100) {
          setWinningProperty("health");
        } else if (stats.happiness >= 100) {
          setWinningProperty("happiness");
        } else if (stats.fulfillment >= 100) {
          setWinningProperty("fulfillment");
        }
        setGameState(GameState.WON);
      } else if (willLose) {
        // Pick a random game over text
        const randomText =
          gameOverTexts[Math.floor(Math.random() * gameOverTexts.length)];
        setGameOverText(randomText);
        setGameState(GameState.LOST);
      }
    } else {
      // Use normal animated transitions for gameplay
      healthWidth.set(`${healthPercentage}%`);
      happinessWidth.set(`${happinessPercentage}%`);
      fulfillmentWidth.set(`${fulfillmentPercentage}%`);
    }
  }, [
    stats,
    healthWidth,
    happinessWidth,
    fulfillmentWidth,
    finalHealthWidth,
    finalHappinessWidth,
    finalFulfillmentWidth,
  ]);

  const handleReminisceClick = () => {
    // For game restarts from loss/win state, just refresh the page
    if (gameState === GameState.LOST || gameState === GameState.WON) {
      window.location.reload();
      return;
    }

    // This should not be called since we removed the reminisce button
    // but keeping for compatibility
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "moonleaf") {
      // Password correct, show title screen
      setShowPasswordPrompt(false);
      setPassword("");
      setPasswordError(false);
      setIsAuthenticated(true);
    } else {
      // Password incorrect
      setPasswordError(true);
      setPassword("");
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  const getWinningImage = () => {
    switch (winningProperty) {
      case "happiness":
        return "/panda_medicine_wife.jpg";
      case "fulfillment":
        return "/panda_medicine_son.jpg";
      case "health":
        return "/panda_medicine_self.jpg";
      default:
        return null;
    }
  };

  const startGame = () => {
    // Initialize game state
    setStats({ health: 30, happiness: 30, fulfillment: 30 });
    setUsedScenarios([0]);
    setUsedNegativeScenarios([]);
    setRoundNumber(1);
    setCurrentScenarioIndex(0);
    setIsProcessingChoice(false);
    setPlayerChoices([]);
    setShowChoiceDetails(false);
    setWinningProperty(null);

    // Reset both sets of motion values immediately
    healthWidth.jump("30%");
    happinessWidth.jump("30%");
    fulfillmentWidth.jump("30%");
    finalHealthWidth.jump("30%");
    finalHappinessWidth.jump("30%");
    finalFulfillmentWidth.jump("30%");

    // Change game state last to ensure bars switch to correct values
    setGameState(GameState.PLAYING);
  };

  const selectOption = (option: Option) => {
    if (isProcessingChoice) return;

    setIsProcessingChoice(true);
    const newStats = {
      health: stats.health + option.healthValue,
      happiness: stats.happiness + option.happinessValue,
      fulfillment: stats.fulfillment + option.fulfillmentValue,
    };
    setStats(newStats);

    // Track the player's choice
    const isNegativeRound = roundNumber % 5 === 0;
    const currentScenario = isNegativeRound
      ? negativeScenarios[currentScenarioIndex]
      : scenarios[currentScenarioIndex];

    const newChoice: PlayerChoice = {
      scenarioLabel: currentScenario.label,
      optionSelected: option,
      isNegativeScenario: isNegativeRound,
      roundNumber: roundNumber,
    };

    setPlayerChoices((prev) => [...prev, newChoice]);

    // Small delay to allow bar animations to start, then change scenario
    setTimeout(() => {
      const nextRound = roundNumber + 1;
      const isNegativeRound = nextRound % 5 === 0;

      if (isNegativeRound) {
        // Every 5th round: use negative scenarios
        const availableNegativeScenarios = negativeScenarios
          .map((_, index) => index)
          .filter((index) => !usedNegativeScenarios.includes(index));

        if (availableNegativeScenarios.length > 0) {
          const nextScenarioIndex =
            availableNegativeScenarios[
              Math.floor(Math.random() * availableNegativeScenarios.length)
            ];
          setCurrentScenarioIndex(nextScenarioIndex);
          setUsedNegativeScenarios([
            ...usedNegativeScenarios,
            nextScenarioIndex,
          ]);
        } else {
          // No more negative scenarios - trigger loss
          const randomText =
            gameOverTexts[Math.floor(Math.random() * gameOverTexts.length)];
          setGameOverText(randomText);
          setGameState(GameState.LOST);
          return;
        }
      } else {
        // Normal rounds: use regular scenarios
        const availableScenarios = scenarios
          .map((_, index) => index)
          .filter((index) => !usedScenarios.includes(index));

        if (availableScenarios.length > 0) {
          const nextScenarioIndex =
            availableScenarios[
              Math.floor(Math.random() * availableScenarios.length)
            ];
          setCurrentScenarioIndex(nextScenarioIndex);
          setUsedScenarios([...usedScenarios, nextScenarioIndex]);
        } else {
          // No more regular scenarios - trigger loss
          const randomText =
            gameOverTexts[Math.floor(Math.random() * gameOverTexts.length)];
          setGameOverText(randomText);
          setGameState(GameState.LOST);
          return;
        }
      }

      setRoundNumber(nextRound);
      setIsProcessingChoice(false);
    }, 100);
  };

  const PropertyBar = React.memo(
    ({
      value,
      motionValue,
      color,
      stat,
    }: {
      value: number;
      motionValue: any;
      color: string;
      stat: string;
    }) => {
      const isLow = value <= 25 && value > 10; // 30% or below but above critical
      const isCritical = value <= 10 && value >= 0; // 10% or below but not negative
      const isDead = value < 0; // Below 0 = dead
      const isWinning = value >= 100 && gameState === GameState.WON; // At or above 100 AND won the game

      return (
        <div className="relative flex flex-col items-center">
          {isWinning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-8 flex items-center gap-1 z-10"
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                }}
              >
                <Star
                  className="text-yellow-400"
                  size={16}
                  fill="currentColor"
                />
              </motion.div>
              <span className="text-xs text-yellow-300 font-semibold">
                COMPLETE
              </span>
            </motion.div>
          )}
          {isDead && !isWinning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-8 flex items-center gap-1 z-10"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <X className="text-red-600" size={16} />
              </motion.div>
            </motion.div>
          )}
          {isLow && !isDead && !isWinning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-8 flex items-center gap-1 z-10"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <AlertTriangle className="text-red-400" size={16} />
              </motion.div>
              <span className="text-xs text-red-300 font-semibold">
                WARNING
              </span>
            </motion.div>
          )}
          {isCritical && !isDead && !isWinning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-8 flex items-center gap-1 z-10"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <AlertTriangle className="text-red-400" size={16} />
              </motion.div>
              <span className="text-xs text-red-300 font-semibold">
                CRITICAL
              </span>
            </motion.div>
          )}
          <div
            className={`w-40 h-3 rounded-full overflow-hidden ${
              isWinning
                ? "bg-yellow-900 border-2 border-yellow-400"
                : isDead
                ? "bg-red-900 border-2 border-red-500"
                : isCritical
                ? "bg-red-800 border border-red-400"
                : "bg-gray-800"
            }`}
          >
            <motion.div
              className={`h-full ${color} rounded-full `}
              style={{
                width: motionValue,
              }}
            />
          </div>
          {gameState === GameState.WON && (
            <div className="pt-2 text-center">
              <span className="text-xs text-white font-semibold block">
                {stat}
              </span>
              <span className="text-xs text-white/70 font-medium">{value}</span>
            </div>
          )}
        </div>
      );
    }
  );

  if (gameState === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-8 tracking-wider">
            Rediscovering Me
          </h1>

          {isAuthenticated && !showPasswordPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                Help me piece together my lost memories so I can rediscover who
                I am - and deliver the cure to those surely waiting
              </p>
              <motion.button
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-2xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto cursor-pointer"
              >
                <Play size={28} />
                Reminisce
              </motion.button>
            </motion.div>
          )}

          {showPasswordPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                Enter the password to begin
              </h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  autoFocus
                />
                {passwordError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-red-300 text-sm"
                  >
                    Incorrect password. Try again.
                  </motion.p>
                )}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl text-lg font-semibold cursor-pointer"
                >
                  Continue
                </motion.button>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-purple-600 to-indigo-600 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Property Bars */}
        <div className="flex justify-center gap-8 mb-12 mt-8">
          <PropertyBar
            key="health-bar"
            value={stats.health}
            motionValue={
              gameState === GameState.PLAYING
                ? smoothHealthWidth
                : finalHealthWidth
            }
            color="bg-green-500"
            stat={"HEALTH & EFFORT"}
          />
          <PropertyBar
            key="happiness-bar"
            value={stats.happiness}
            motionValue={
              gameState === GameState.PLAYING
                ? smoothHappinessWidth
                : finalHappinessWidth
            }
            color="bg-yellow-500"
            stat={"HAPPINESS"}
          />
          <PropertyBar
            key="fulfillment-bar"
            value={stats.fulfillment}
            motionValue={
              gameState === GameState.PLAYING
                ? smoothFulfillmentWidth
                : finalFulfillmentWidth
            }
            color="bg-blue-500"
            stat={"FULFILLMENT"}
          />
        </div>

        {/* Game Content */}
        <AnimatePresence mode="wait">
          {gameState === GameState.WON && (
            <motion.div
              key="won"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-green-500/50 text-center"
            >
              <h1 className="text-4xl font-bold text-white mb-6">
                I remember everything now
              </h1>
              <p className="text-xl text-green-200 mb-8">
                {`I took the moonleaf back to my ${
                  winningProperty === "fulfillment"
                    ? "son"
                    : winningProperty === "happiness"
                    ? "wife"
                    : "village"
                } and saved ${
                  winningProperty === "fulfillment"
                    ? "him"
                    : winningProperty === "happiness"
                    ? "her"
                    : "them"
                }!`}
              </p>

              {getWinningImage() && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mb-8 flex justify-center"
                >
                  <img
                    src={getWinningImage()!}
                    alt="Victory memory"
                    className="max-w-md w-full h-auto rounded-xl shadow-2xl border-2 border-green-500/30"
                  />
                </motion.div>
              )}

              <motion.button
                onClick={() => setShowChoiceDetails(!showChoiceDetails)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 cursor-pointer"
              >
                {showChoiceDetails ? "Hide" : "Show"} My Journey
              </motion.button>

              {showChoiceDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-left max-h-96 overflow-y-auto"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Your Choices & Their Impact:
                  </h3>
                  <div className="space-y-3">
                    {playerChoices.map((choice, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${
                          choice.isNegativeScenario
                            ? "bg-red-900/20 border border-red-500/30"
                            : "bg-blue-900/20 border border-blue-500/30"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-white/90">
                            Round {choice.roundNumber}: {choice.scenarioLabel}
                          </span>
                          {choice.isNegativeScenario && (
                            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                              Challenge
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/80 mb-2">
                          "{choice.optionSelected.label}"
                        </p>
                        <div className="flex gap-4 text-xs">
                          <span
                            className={`${
                              choice.optionSelected.healthValue >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            Health:{" "}
                            {choice.optionSelected.healthValue >= 0 ? "+" : ""}
                            {choice.optionSelected.healthValue}
                          </span>
                          <span
                            className={`${
                              choice.optionSelected.happinessValue >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            Happiness:{" "}
                            {choice.optionSelected.happinessValue >= 0
                              ? "+"
                              : ""}
                            {choice.optionSelected.happinessValue}
                          </span>
                          <span
                            className={`${
                              choice.optionSelected.fulfillmentValue >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            Fulfillment:{" "}
                            {choice.optionSelected.fulfillmentValue >= 0
                              ? "+"
                              : ""}
                            {choice.optionSelected.fulfillmentValue}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {gameState === GameState.LOST && (
            <motion.div
              key="lost"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-red-500/50 text-center"
            >
              <h1 className="text-4xl font-bold text-white mb-6">
                That wasn't me...
              </h1>
              <p className="text-xl text-red-200 mb-8">{gameOverText}</p>
              <motion.button
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full text-xl font-semibold cursor-pointer"
              >
                Try again
              </motion.button>
            </motion.div>
          )}

          {gameState === GameState.PLAYING && (
            <motion.div
              key={`${
                roundNumber % 5 === 0 ? "negative" : "normal"
              }-${currentScenarioIndex}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className={`backdrop-blur-md rounded-2xl p-8 border ${
                roundNumber % 5 === 0
                  ? "bg-red-900/20 border-red-500/50"
                  : "bg-white/10 border-white/20"
              }`}
            >
              <h2 className="text-2xl font-semibold text-white mb-8 text-center leading-relaxed">
                {roundNumber % 5 === 0
                  ? negativeScenarios[currentScenarioIndex]?.label
                  : scenarios[currentScenarioIndex]?.label}
              </h2>

              <div className="grid gap-4">
                {(roundNumber % 5 === 0
                  ? negativeScenarios[currentScenarioIndex]?.options
                  : scenarios[currentScenarioIndex]?.options
                )?.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => selectOption(option)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-xl p-6 text-left text-white transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-lg">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
