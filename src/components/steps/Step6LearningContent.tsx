import React, { useState } from 'react';
import { ACTIVE_LESSON } from '../../mock/initialData';
import { BookOpen, Sparkles, Sliders, RotateCw, ArrowRight, HelpCircle } from 'lucide-react';

interface Step6Props {
  onComplete: () => void;
}

export const Step6LearningContent: React.FC<Step6Props> = ({ onComplete }) => {
  const lesson = ACTIVE_LESSON;

  // Interactive formula state
  const [a, setA] = useState(1);
  const [b, setB] = useState(-6);
  const [c, setC] = useState(8);

  // Discriminant calculation
  const discriminant = b * b - 4 * a * c;
  let rootType = '';
  let root1 = '';
  let root2 = '';

  if (discriminant > 0) {
    rootType = 'Two Distinct Real Roots';
    root1 = ((-b + Math.sqrt(discriminant)) / (2 * a)).toFixed(2);
    root2 = ((-b - Math.sqrt(discriminant)) / (2 * a)).toFixed(2);
  } else if (discriminant === 0) {
    rootType = 'One Coincident Real Root';
    root1 = (-b / (2 * a)).toFixed(2);
    root2 = root1;
  } else {
    rootType = 'Conjugate Complex Roots (Imaginary)';
    const realPart = (-b / (2 * a)).toFixed(2);
    const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);
    root1 = `${realPart} + ${imagPart}i`;
    root2 = `${realPart} - ${imagPart}i`;
  }

  // Flashcard flipping state
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Bite-Sized Learning Content</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {lesson.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          {lesson.summary}
        </p>
      </div>

      {/* Core Explanation & Real-World Analogy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Concept Theory */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📐</span>
            <h3 className="font-bold text-white text-base">Mathematical Anatomy</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lesson.coreConcept}
          </p>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-center text-sm text-brand-300">
            x = [-b ± √(b² - 4ac)] / (2a)
          </div>
        </div>

        {/* Real-World Analogy */}
        <div className="p-6 rounded-2xl glass-panel border border-amber-500/30 bg-amber-950/10 space-y-4">
          <div className="flex items-center gap-2 text-amber-300">
            <span className="text-xl">🏀</span>
            <h3 className="font-bold text-base">Real-World Intuition</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lesson.realWorldAnalogy}
          </p>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
            💡 <strong>Quick Takeaway:</strong> In real life, gravity always gives an equation a negative quadratic curvature (a &lt; 0), causing things to fall back to Earth!
          </div>
        </div>
      </div>

      {/* Interactive Formula Playground */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-brand-500/30 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-brand-400" />
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Interactive Parabola & Root Simulator</h3>
              <p className="text-xs text-slate-400">Tweak coefficients a, b, and c to see discriminant & roots change dynamically!</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400">Current Equation:</span>
            <p className="font-mono font-bold text-brand-300 text-sm sm:text-base">
              {a}x² {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0
            </p>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          {/* Slider A */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Coefficient a (Curvature)</span>
              <span className="font-mono text-brand-300 font-bold">{a}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
          </div>

          {/* Slider B */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Coefficient b (Shift)</span>
              <span className="font-mono text-brand-300 font-bold">{b}</span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
          </div>

          {/* Slider C */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Constant c (Y-intercept)</span>
              <span className="font-mono text-brand-300 font-bold">{c}</span>
            </div>
            <input
              type="range"
              min="-15"
              max="15"
              step="1"
              value={c}
              onChange={(e) => setC(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Calculation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Discriminant (D = b² - 4ac)</span>
            <p className="text-xl font-extrabold text-white font-mono">{discriminant}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Nature of Roots</span>
            <p className={`text-sm font-bold ${discriminant >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {rootType}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-950/40 border border-brand-500/40 space-y-1">
            <span className="text-[10px] uppercase font-bold text-brand-300 tracking-wider">Calculated Roots</span>
            <p className="text-sm font-mono font-bold text-white">
              x₁ = {root1} <br />
              x₂ = {root2}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Flashcards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Interactive Concept Flashcards (Click to Flip)</span>
          </h3>
          <span className="text-xs text-slate-400">3 Flashcards available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lesson.flashcards.map((card, idx) => {
            const isFlipped = flippedCards[idx];

            return (
              <div
                key={idx}
                onClick={() => toggleFlip(idx)}
                className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 min-h-[170px] flex flex-col justify-between ${
                  isFlipped
                    ? 'bg-emerald-950/40 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'glass-panel border-slate-800 hover:border-brand-500/50 hover:scale-[1.02]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-brand-400">Flashcard #{idx + 1}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <RotateCw className="w-3 h-3" /> Click to flip
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                    {isFlipped ? card.back : card.front}
                  </p>
                </div>

                {!isFlipped && (
                  <p className="text-[11px] text-slate-400 italic mt-2">
                    Hint: {card.hint}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Transition */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-900/60 via-slate-800 to-indigo-900/60 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-base">Have a doubt or want a deeper analogy?</h4>
          <p className="text-xs text-slate-300">Nova AI Tutor is ready to answer with Socratic guidance!</p>
        </div>
        <button
          onClick={onComplete}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 text-white shadow-xl shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Chat with Nova AI Tutor</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
