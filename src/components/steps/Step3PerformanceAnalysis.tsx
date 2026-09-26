import React from 'react';
import { SubjectScore } from '../../types';
import { INITIAL_SUBJECT_SCORES } from '../../mock/initialData';
import { BarChart3, TrendingUp, Zap, Clock, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface Step3Props {
  onComplete: () => void;
}

export const Step3PerformanceAnalysis: React.FC<Step3Props> = ({ onComplete }) => {
  const scores: SubjectScore[] = INITIAL_SUBJECT_SCORES;
  const overallAvg = Math.round(scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner: Diagnostic Summary */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Multi-Dimensional Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Performance <span className="gradient-text">Diagnostics Matrix</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            We analyzed your accuracy, problem-solving speed, and conceptual depth across core subjects.
          </p>
        </div>

        {/* Global Score Card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-xl">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-700"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brand-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${overallAvg}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold text-white leading-none">{overallAvg}%</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Composite</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
              <Zap className="w-3 h-3" /> Initial Scholarship: 10%
            </span>
            <p className="text-xs text-slate-300 font-medium">89th Peer Percentile</p>
            <p className="text-[11px] text-slate-400">Class 11 Science Benchmark</p>
          </div>
        </div>
      </div>

      {/* Subject-Wise Mastery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scores.map((s) => {
          const isHigh = s.score >= 80;
          const isLow = s.score < 60;

          return (
            <div
              key={s.subject}
              className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl p-2 rounded-xl bg-slate-800 border border-slate-700">{s.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm text-white">{s.subject}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isHigh ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      isLow ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {s.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Score bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-black text-white">{s.score}%</span>
                  <span className="text-xs text-slate-400 font-medium">{s.correctQuestions}/{s.totalQuestions} Questions</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${s.color} transition-all duration-700 rounded-full`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>

              {/* Sub-metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-400" />
                  <span>{s.percentile}th %ile</span>
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{s.speedSecsAvg}s / question</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive & Correlation Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Key Academic Diagnostic Insights</h3>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
              <span className="text-lg">🔥</span>
              <div>
                <strong className="text-white">Strength Anchor:</strong> Superior analytical pattern recognition in <strong>Logical Reasoning (91%)</strong> and <strong>Mathematics (88%)</strong>. You solve algebra problems 35% faster than standard grade-level peers.
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-200">Attention Area Detected:</strong> <strong>Biology (54%)</strong> performance indicates conceptual hesitation around molecular respiration and metabolic pathways rather than rote memorization.
              </div>
            </div>
          </div>
        </div>

        {/* Speed vs Accuracy Quadrant */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-sm mb-1">Aptitude Profile</h3>
            <p className="text-xs text-slate-400 mb-4">Speed vs. Precision index</p>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
              <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">Learner Archetype</span>
              <p className="text-lg font-extrabold text-white">Rapid Analytical Solver</p>
              <p className="text-[11px] text-slate-400">High speed, high accuracy in quantitative tracks.</p>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-600/30 transition"
          >
            <span>Detect Root Knowledge Gaps</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
