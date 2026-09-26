import React, { useState, useEffect } from 'react';
import { DiagnosticQuestion } from '../../types';
import { DIAGNOSTIC_QUESTIONS } from '../../mock/initialData';
import { triggerCelebration } from '../common/ConfettiTrigger';
import { Timer, CheckCircle, HelpCircle, ArrowRight, Sparkles, Brain, Award } from 'lucide-react';

interface Step2Props {
  onComplete: () => void;
}

export const Step2DiagnosticTest: React.FC<Step2Props> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [confidenceLevels, setConfidenceLevels] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<Record<number, boolean>>({});
  const [seconds, setSeconds] = useState(45);

  const currentQ: DiagnosticQuestion = DIAGNOSTIC_QUESTIONS[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 45));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted[currentIndex]) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleSubmitAnswer = () => {
    setIsSubmitted(prev => ({ ...prev, [currentIndex]: true }));
  };

  const handleNext = () => {
    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSeconds(45);
    } else {
      triggerCelebration();
      onComplete();
    }
  };

  const userSelected = selectedAnswers[currentIndex];
  const isQuestionAnswered = userSelected !== undefined;
  const isCurrentSubmitted = isSubmitted[currentIndex];
  const isCorrect = userSelected === currentQ.correctIndex;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Test Header & Timer */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-700/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center border border-brand-500/30">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30">
                {currentQ.subject}
              </span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                currentQ.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                currentQ.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {currentQ.difficulty} Tier
              </span>
            </div>
            <h3 className="font-bold text-white text-base mt-0.5">Question {currentIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}</h3>
          </div>
        </div>

        {/* Live Timer & Question Pips */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-semibold">
            <Timer className="w-4 h-4 text-brand-400 animate-pulse" />
            <span>00:{seconds < 10 ? `0${seconds}` : seconds}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {DIAGNOSTIC_QUESTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setSeconds(45);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  currentIndex === i
                    ? 'bg-brand-600 text-white ring-2 ring-brand-400'
                    : isSubmitted[i]
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                    : selectedAnswers[i] !== undefined
                    ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700'
                    : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30 space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase font-bold text-brand-400 tracking-wider">Concept Diagnostic</p>
          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isOptSelected = userSelected === idx;
            let optStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-brand-500/60 hover:bg-slate-800';

            if (isOptSelected && !isCurrentSubmitted) {
              optStyle = 'bg-brand-600/30 border-brand-400 text-white ring-2 ring-brand-400/50';
            }

            if (isCurrentSubmitted) {
              if (idx === currentQ.correctIndex) {
                optStyle = 'bg-emerald-600/30 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/60';
              } else if (isOptSelected && !isCorrect) {
                optStyle = 'bg-rose-600/30 border-rose-400 text-rose-100 ring-2 ring-rose-400/60';
              } else {
                optStyle = 'bg-slate-800/40 border-slate-800 text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${optStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isOptSelected ? 'bg-brand-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-medium text-sm sm:text-base">{option}</span>
                </div>

                {isCurrentSubmitted && idx === currentQ.correctIndex && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Correct Answer
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Confidence Check (Student metacognition) */}
        {!isCurrentSubmitted && isQuestionAnswered && (
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2">
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              How confident are you with this answer?
            </span>
            <div className="flex flex-wrap gap-2">
              {['100% Confident 🎯', 'Pretty Sure 👍', 'Educated Guess 🤔'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setConfidenceLevels(prev => ({ ...prev, [currentIndex]: lvl }))}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                    confidenceLevels[currentIndex] === lvl
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Explanation Box (when submitted) */}
        {isCurrentSubmitted && (
          <div className={`p-4 rounded-2xl border transition-all ${
            isCorrect ? 'bg-emerald-950/40 border-emerald-500/40' : 'bg-rose-950/40 border-rose-500/40'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className={`w-4 h-4 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`} />
              <h4 className="font-bold text-sm text-white">
                {isCorrect ? 'Awesome job! Accurate intuition' : 'Learning Opportunity Identified'}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            {isCurrentSubmitted
              ? 'Answer recorded for gap analysis'
              : 'Choose an option to submit'}
          </p>

          {!isCurrentSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!isQuestionAnswered}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition"
            >
              Verify Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 transition"
            >
              <span>{currentIndex < DIAGNOSTIC_QUESTIONS.length - 1 ? 'Next Question' : 'Complete & Generate Analysis'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
