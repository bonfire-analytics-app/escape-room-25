"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Riddle } from "../config";

interface RiddleGameProps {
  riddle: Riddle;
  riddleNumber: number;
  totalRiddles: number;
  onCorrectAnswer: (answer: string) => void;
}

export default function RiddleGame({
  riddle,
  onCorrectAnswer,
}: RiddleGameProps) {
  const [answer, setAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [clickedLetters, setClickedLetters] = useState<Set<number>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play piano notes B-E-G-G-E-D continuously when audio is enabled
  useEffect(() => {
    if (riddle.audio && audioContextRef.current) {
      const playPianoSequence = () => {
        const audioContext = audioContextRef.current!;

        // Resume audio context if suspended (required by browser policies)
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }

        // Piano note frequencies: E4 = 329.63 Hz, C4 = 261.63 Hz
        const playNote = (frequency: number, delay: number) => {
          setTimeout(() => {
            const now = audioContext.currentTime;

            // Create multiple oscillators for harmonics (more realistic piano sound)
            const fundamental = audioContext.createOscillator();
            const harmonic2 = audioContext.createOscillator();
            const harmonic3 = audioContext.createOscillator();
            const harmonic4 = audioContext.createOscillator();

            // Create gain nodes for each harmonic
            const fundamentalGain = audioContext.createGain();
            const harmonic2Gain = audioContext.createGain();
            const harmonic3Gain = audioContext.createGain();
            const harmonic4Gain = audioContext.createGain();
            const masterGain = audioContext.createGain();

            // Connect oscillators to their gain nodes
            fundamental.connect(fundamentalGain);
            harmonic2.connect(harmonic2Gain);
            harmonic3.connect(harmonic3Gain);
            harmonic4.connect(harmonic4Gain);

            // Connect all gains to master gain
            fundamentalGain.connect(masterGain);
            harmonic2Gain.connect(masterGain);
            harmonic3Gain.connect(masterGain);
            harmonic4Gain.connect(masterGain);
            masterGain.connect(audioContext.destination);

            // Set frequencies (fundamental + harmonics)
            fundamental.frequency.setValueAtTime(frequency, now);
            harmonic2.frequency.setValueAtTime(frequency * 2, now);
            harmonic3.frequency.setValueAtTime(frequency * 3, now);
            harmonic4.frequency.setValueAtTime(frequency * 4, now);

            // Use triangle wave for more piano-like timbre
            fundamental.type = "triangle";
            harmonic2.type = "triangle";
            harmonic3.type = "triangle";
            harmonic4.type = "triangle";

            // Set harmonic amplitudes (decreasing for higher harmonics)
            fundamentalGain.gain.setValueAtTime(0.5, now);
            harmonic2Gain.gain.setValueAtTime(0.25, now);
            harmonic3Gain.gain.setValueAtTime(0.15, now);
            harmonic4Gain.gain.setValueAtTime(0.1, now);

            // Piano-like envelope: quick attack, long decay
            masterGain.gain.setValueAtTime(0, now);
            masterGain.gain.linearRampToValueAtTime(0.3, now + 0.05); // Quick attack
            masterGain.gain.exponentialRampToValueAtTime(0.1, now + 0.3); // Initial decay
            masterGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5); // Long decay

            // Start all oscillators
            fundamental.start(now);
            harmonic2.start(now);
            harmonic3.start(now);
            harmonic4.start(now);

            // Stop all oscillators
            fundamental.stop(now + 1.5);
            harmonic2.stop(now + 1.5);
            harmonic3.stop(now + 1.5);
            harmonic4.stop(now + 1.5);
          }, delay);
        };

        // Play B-E-G-G-E-D sequence with 1-second gaps between them
        playNote(246.94, 0); // B3
        playNote(329.63, 1000); // E4
        playNote(392.0, 2000); // G4
        playNote(392.0, 3000); // G4
        playNote(329.63, 4000); // E4
        playNote(293.66, 5000); // D4
      };

      // Start immediately and then repeat every 8 seconds
      playPianoSequence();
      intervalRef.current = setInterval(playPianoSequence, 8000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [riddle.audio]);

  const handleLetterClick = (letterIndex: number) => {
    setClickedLetters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(letterIndex)) {
        newSet.delete(letterIndex);
      } else {
        newSet.add(letterIndex);
      }
      return newSet;
    });
  };

  const renderQuestion = () => {
    if (!riddle.reconfigure) {
      return riddle.question;
    }

    const reconfigurableChars = riddle.reconfigure.map((char) =>
      char.toLowerCase()
    );
    return riddle.question.split("").map((char, index) => {
      const isReconfigurable = reconfigurableChars.includes(char.toLowerCase());
      const isClicked = clickedLetters.has(index);

      if (isReconfigurable) {
        return (
          <span
            key={index}
            onClick={() => handleLetterClick(index)}
            className={`cursor-pointer transition-all duration-200 hover:scale-110 ${
              isClicked
                ? "text-green-300 bg-green-500/20 px-1 rounded font-bold"
                : "text-white hover:text-green-200"
            }`}
          >
            {char}
          </span>
        );
      }
      return <span key={index}>{char}</span>;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedAnswer = answer.trim().toLowerCase();
    const isCorrect = riddle.answers.some(
      (correctAnswer) => correctAnswer.toLowerCase() === normalizedAnswer
    );

    if (isCorrect) {
      setShowFeedback("correct");
      setTimeout(() => {
        const userAnswer = answer.trim();
        setAnswer("");
        setShowFeedback(null);
        setClickedLetters(new Set()); // Reset clicked letters
        onCorrectAnswer(userAnswer);
      }, 1500);
    } else {
      setShowFeedback("incorrect");
      setTimeout(() => {
        setShowFeedback(null);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl"
      >
        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-white leading-relaxed">
              {renderQuestion()}
            </h2>
          </div>

          {/* Hidden words for screen readers and page source inspection */}
          {riddle.hiddenWords && (
            <div className="sr-only" aria-hidden="true">
              {riddle.hiddenWords.map((hiddenText, index) => (
                <span
                  key={index}
                  data-hidden-hint={`hint-${index + 1}`}
                  aria-label={hiddenText}
                  title={hiddenText}
                >
                  {hiddenText}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Answer form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              disabled={showFeedback === "correct"}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!answer.trim() || showFeedback === "correct"}
            className="w-full py-4 bg-white text-purple-900 font-semibold text-lg rounded-xl hover:bg-gray-100 disabled:bg-white/50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Submit Answer
          </motion.button>
        </motion.form>

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6 text-center"
          >
            {showFeedback === "correct" ? (
              <div className="flex items-center justify-center space-x-2 text-green-300">
                <CheckCircle size={24} />
                <span className="text-lg font-semibold">Correct!</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-red-300">
                <XCircle size={24} />
                <span className="text-lg font-semibold">Try again</span>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
