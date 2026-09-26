import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { triggerCelebration } from '../common/ConfettiTrigger';
import { RefreshCw, TrendingUp, Sparkles, Award, ArrowRight, RotateCcw, CheckCircle, Zap } from 'lucide-react';

interface Step14Props {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onRestart: () => void;
  onSelectStep: (step: number) => void;
}

export const Step14ContinuousLoop: React.FC<Step14Props> = ({ profile, setProfile, onRestart, onSelectStep }) => {
  const [simulationStage, setSimulationStage] = useState<'initial' | 'one_month' | 'three_months'>('initial');

  const handleSimulate = (stage: 'initial' | 'one_month' | 'three_months') => {
    setSimulationStage(stage);
    triggerCelebration();

    if (stage === 'initial') {
      setProfile(prev => ({ ...prev, overallScore: 62, xp: 1450, level: 4 }));
    } else if (stage === 'one_month') {
      setProfile(prev => ({ ...prev, overallScore: 78, xp: 3200, level: 7, streakDays: 37 }));
    } else if (stage === 'three_months') {
      setProfile(prev => ({ ...prev, overallScore: 92, xp: 7500, level: 12, streakDays: 98 }));
    }
  };

  const getStageData = () => {
    switch (simulationStage) {
      case 'initial':
        return {
          score: 62,
          discount: 10,
          tier: 'Silver Momentum (10%)',
          unlockedCareers: 'Core Engineering & Tech Basics',
          readiness: 'JEE Main 65% | BITSAT 70%',
          statusText: 'Day 1 Baseline Diagnostic Assessment',
        };
      case 'one_month':
        return {
          score: 78,
          discount: 20,
          tier: 'Gold Scholar Reward (20%)',
          unlockedCareers: 'Artificial Intelligence, Robotics & Autonomous Systems',
          readiness: 'JEE Main 78% | BITSAT 84% | JEE Adv 71%',
          statusText: 'After 1 Month of Adaptive Quizzes & Prerequisite Repair',
        };
      case 'three_months':
        return {
          score: 92,
          discount: 30,
          tier: 'Apex Platinum Scholarship (30%)',
          unlockedCareers: 'Elite Quantum Computing & Aerospace Propulsion',
          readiness: 'JEE Main 94% | BITSAT 95% | JEE Adv 88%',
          statusText: 'After 3 Months of Consistent Socratic Practice',
        };
    }
  };

  const currentData = getStageData();

  const cycleSteps = [
    { title: 'Assess', desc: 'Diagnostic level test' },
    { title: 'Analyze', desc: 'Subject/topic scores' },
    { title: 'Identify Gaps', desc: 'Prerequisite tree' },
    { title: 'Personalize', desc: 'Dynamic study path' },
    { title: 'Teach', desc: 'Bite-sized theory & tools' },
    { title: 'Adapt', desc: 'Dynamic difficulty quiz' },
    { title: 'Track', desc: 'Progress dashboard & XP' },
    { title: 'Guide Career', desc: 'Scores + Interests fit' },
    { title: 'Guide Exams', desc: 'Syllabus & readiness' },
    { title: 'Reward Progress', desc: 'Scholarship discounts' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Continuous Learning Feedback Loop</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            The Continuous <span className="gradient-text">Improvement Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Watch how your ongoing practice updates your student profile, dynamically evolves career pathways, and unlocks larger performance scholarships over time!
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs text-brand-300">
          <span className="font-bold">Principle:</span> Never lock students to initial scores!
        </div>
      </div>

      {/* Interactive Simulation Switcher */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-white">Live Lifecycle Simulation</h3>
            <p className="text-xs text-slate-400">Click a stage to observe real-time profile and discount recalculation:</p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => handleSimulate('initial')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                simulationStage === 'initial'
                  ? 'bg-slate-700 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Day 1 (62%)
            </button>
            <button
              onClick={() => handleSimulate('one_month')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                simulationStage === 'one_month'
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/40 ring-1 ring-brand-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Month 1 (+16% Growth) 🚀
            </button>
            <button
              onClick={() => handleSimulate('three_months')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                simulationStage === 'three_months'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/40 ring-1 ring-amber-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Month 3 (92% Mastery) 🏆
            </button>
          </div>
        </div>

        {/* Live Comparison Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Composite Mastery Meter */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Composite Mastery Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{currentData.score}%</span>
              {simulationStage !== 'initial' && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  +{currentData.score - 62}% Improved
                </span>
              )}
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-700 rounded-full"
                style={{ width: `${currentData.score}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400">{currentData.statusText}</span>
          </div>

          {/* Dynamic Scholarship Tier */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 flex flex-col justify-between space-y-3">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Unlocked Scholarship</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-amber-400">{currentData.discount}% OFF</span>
              <span className="text-xs text-slate-300">Continuous Tier</span>
            </div>
            <p className="text-xs font-bold text-white">{currentData.tier}</p>
            <span className="text-[11px] text-emerald-300">
              💡 {simulationStage === 'initial' ? 'Score 75%+ to unlock 20% tier!' : 'Automatically applied to next billing cycle!'}
            </span>
          </div>

          {/* Unlocked Career Horizons */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col justify-between space-y-3">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Career Alignment</span>
            <p className="text-sm font-bold text-white leading-snug">{currentData.unlockedCareers}</p>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
              <strong>Exam Readiness:</strong> {currentData.readiness}
            </div>
            <span className="text-[11px] text-slate-400">Pathways recalculate with every quiz</span>
          </div>
        </div>
      </div>

      {/* Complete Closed-Loop Flow Diagram */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-400" />
          <h3 className="font-bold text-white text-base sm:text-lg">
            The End-to-End Platform Blueprint
          </h3>
        </div>

        <p className="text-xs text-slate-300">
          Our three layers interconnect seamlessly to create a virtuous cycle of student motivation:
        </p>

        {/* 10 Flow Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
          {cycleSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between hover:border-brand-500/50 transition group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-brand-400">0{idx + 1}</span>
                <span className="text-[10px] text-slate-500 group-hover:text-emerald-400 transition">➔</span>
              </div>
              <p className="font-bold text-xs text-white group-hover:text-brand-300 transition">{step.title}</p>
              <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Recap & Quick Jumps */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-900/60 via-slate-800 to-emerald-950/60 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-extrabold text-white text-lg sm:text-xl">You Completed the Full 14-Step Tour!</h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
            All 3 layers (Adaptive Learning, Career Guidance, and Performance Scholarships) are functioning and fully interactive.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Journey</span>
          </button>

          <button
            onClick={() => onSelectStep(11)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition"
          >
            <span>Review Career Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
