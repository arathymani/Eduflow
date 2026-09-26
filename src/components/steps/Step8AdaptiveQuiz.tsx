import React, { useState } from 'react';
import { AdaptiveQuizQuestion } from '../../types';
import { ADAPTIVE_QUIZ_POOL } from '../../mock/initialData';
import { triggerCelebration } from '../common/ConfettiTrigger';
import { BrainCircuit, Zap, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, Flame, ArrowRight } from 'lucide-react';

interface Step8Props {
  onComplete: () => void;
  onEarnXp: (amount: number) => void;
}

export const Step8AdaptiveQuiz: React.FC<Step8Props> = ({ onComplete, onEarnXp }) => {
  // We start at 'Medium' difficulty
  const [currentDiff, setCurrentDiff] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [adaptationMessage, setAdaptationMessage] = useState<string | null>(null);
  const [streak, setStreak] = useState(1);
  const [totalQuizXp, setTotalQuizXp] = useState(0);

  // Find question matching current difficulty
  const question: AdaptiveQuizQuestion =
    ADAPTIVE_QUIZ_POOL.find(q => q.difficulty === currentDiff) || ADAPTIVE_QUIZ_POOL[1];

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedOpt(idx);
  };

  const handleVerify = () => {
    if (selectedOpt === null) return;
    setSubmitted(true);

    const isCorrect = selectedOpt === question.correctIndex;
    const earned = isCorrect ? question.xp * (streak >= 2 ? 1.5 : 1) : 10;
    setTotalQuizXp(prev => prev + Math.round(earned));
    onEarnXp(Math.round(earned));

    if (isCorrect) {
      triggerCelebration();
      setStreak(prev => prev + 1);
      if (currentDiff === 'Medium') {
        setAdaptationMessage('🎉 Superb accuracy! Adaptive engine boosted difficulty to HARD (+200 XP).');
      } else if (currentDiff === 'Easy') {
        setAdaptationMessage('🌟 Great recovery! Moving up to MEDIUM difficulty.');
      } else {
        setAdaptationMessage('🏆 Mastery achieved! You conquered the HARD level question.');
      }
    } else {
      setStreak(1);
      if (currentDiff === 'Medium' || currentDiff === 'Hard') {
        setAdaptationMessage('💡 Calibrating difficulty down to EASY to reinforce core foundations.');
      } else {
        setAdaptationMessage('Take a breath! Review the hint below to solidify the pattern.');
      }
    }
  };

  const handleNextChallenge = () => {
    const isCorrect = selectedOpt === question.correctIndex;
    setSubmitted(false);
    setSelectedOpt(null);

    if (isCorrect) {
      if (currentDiff === 'Medium') setCurrentDiff('Hard');
      else if (currentDiff === 'Easy') setCurrentDiff('Medium');
      else {
        // finished full adaptive demonstration
        onComplete();
      }
    } else {
      if (currentDiff === 'Hard') setCurrentDiff('Medium');
      else if (currentDiff === 'Medium') setCurrentDiff('Easy');
    }
  };

  const isCorrect = selectedOpt === question.correctIndex;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Dynamic Difficulty Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Adaptive <span className="gradient-text">Quiz Simulator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Watch difficulty adjust instantly based on your answers. No two students take the exact same quiz!
          </p>
        </div>

        {/* Live Adaptive Metrics */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Tier</span>
            <span className={`text-sm font-extrabold ${
              currentDiff === 'Easy' ? 'text-emerald-400' :
              currentDiff === 'Medium' ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {currentDiff} ({question.xp} XP)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
            <span className="text-[10px] text-amber-300 font-bold uppercase block flex items-center justify-center gap-1">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> Combo
            </span>
            <span className="text-sm font-extrabold text-amber-300">
              {streak}x Multiplier
            </span>
          </div>
        </div>
      </div>

      {/* Main Question Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        {/* Adaptation Alert Banner */}
        {adaptationMessage && (
          <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all animate-bounce-subtle ${
            isCorrect
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
          }`}>
            {isCorrect ? <ArrowUpRight className="w-5 h-5 text-emerald-400 shrink-0" /> : <ArrowDownRight className="w-5 h-5 text-amber-400 shrink-0" />}
            <span>{adaptationMessage}</span>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-brand-400 tracking-wider">Adaptive Question</span>
            <span className="text-xs text-slate-400">{question.subject}</span>
          </div>
          <h2 className="text-base sm:text-xl font-bold text-white leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const isChosen = selectedOpt === idx;
            let optClass = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-brand-500/60';

            if (isChosen && !submitted) {
              optClass = 'bg-brand-600/30 border-brand-400 text-white ring-2 ring-brand-400/50';
            }

            if (submitted) {
              if (idx === question.correctIndex) {
                optClass = 'bg-emerald-600/30 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/60';
              } else if (isChosen && !isCorrect) {
                optClass = 'bg-rose-600/30 border-rose-400 text-rose-100 ring-2 ring-rose-400/60';
              } else {
                optClass = 'bg-slate-800/40 border-slate-800 text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${optClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isChosen ? 'bg-brand-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-medium text-sm sm:text-base">{opt}</span>
                </div>

                {submitted && idx === question.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                {submitted && isChosen && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback / Remediation card */}
        {submitted && (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm space-y-1.5">
            <span className="font-bold text-slate-200 block">💡 Concept Rationale:</span>
            <p className="text-slate-300">{question.remedyTip}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            Total Quiz XP Earned: <strong className="text-amber-400">+{totalQuizXp} XP</strong>
          </div>

          {!submitted ? (
            <button
              onClick={handleVerify}
              disabled={selectedOpt === null}
              className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow transition"
            >
              Check Answer
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleNextChallenge}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                Next Adaptive Challenge
              </button>
              <button
                onClick={onComplete}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md transition"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
