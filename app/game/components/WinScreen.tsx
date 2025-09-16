"use client";

import { motion } from "framer-motion";
import { Trophy, RotateCcw } from "lucide-react";

interface WinScreenProps {
  userAnswers: string[];
}

export default function WinScreen({ userAnswers }: WinScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Thanks for helping me remember!
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Now let me <strong className="text-yellow-300">wash</strong> away
            this sorrow and begin a&nbsp;
            <strong className="text-yellow-300">fresh</strong> journey.
          </p>

          <p className="text-lg text-gray-300 mb-2">
            My memories are still so foggy, but remember this: when you need 6,
            just divide 1 by 7
          </p>
        </motion.div>

        {/* User answers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-8 max-w-md mx-auto"
        >
          <h3 className="text-white font-semibold mb-4 text-center">
            My Journey
          </h3>
          <div className="space-y-3">
            {userAnswers.map((answer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                className="flex items-center space-x-3 bg-white/5 rounded-lg p-3"
              >
                <div className="w-6 h-6 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-emerald-300 font-medium">"{answer}"</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
