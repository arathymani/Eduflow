import React from 'react';
import { LearningPathNode } from '../../types';
import { LEARNING_PATH_NODES } from '../../mock/initialData';
import { MapPin, CheckCircle, Play, Lock, Zap, Clock, Sparkles, ArrowRight } from 'lucide-react';

interface Step5Props {
  onComplete: () => void;
}

export const Step5PersonalizedPath: React.FC<Step5Props> = ({ onComplete }) => {
  const nodes: LearningPathNode[] = LEARNING_PATH_NODES;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Dynamic Path Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Personalized <span className="gradient-text">Learning Trail</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
            Engineered specifically to heal your detected prerequisite gaps first, then accelerate to competitive exam mastery.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
          <div className="text-right">
            <span className="text-slate-400 block">Total Path XP</span>
            <strong className="text-amber-400 font-extrabold text-sm sm:text-base">1,000 XP</strong>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Gamified Roadmap Nodes */}
      <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-emerald-500 before:via-brand-500 before:to-slate-700">
        {nodes.map((node, index) => {
          const isCompleted = node.status === 'completed';
          const isInProgress = node.status === 'in_progress';
          const isLocked = node.status === 'locked';

          return (
            <div
              key={node.id}
              className={`relative p-5 sm:p-6 rounded-2xl border transition-all ${
                isInProgress
                  ? 'glass-panel-glow border-brand-400 scale-[1.01] ring-2 ring-brand-500/40 shadow-xl'
                  : isCompleted
                  ? 'glass-panel border-emerald-500/40 bg-emerald-950/10'
                  : 'glass-panel border-slate-800/80 opacity-60'
              }`}
            >
              {/* Stepper Node Indicator */}
              <div
                className={`absolute -left-6 sm:-left-10 top-6 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  isCompleted
                    ? 'bg-emerald-600 border-white text-white shadow-md shadow-emerald-500/50'
                    : isInProgress
                    ? 'bg-brand-600 border-white text-white animate-pulse ring-4 ring-brand-500/30'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                {isCompleted ? <CheckCircle className="w-4 h-4" /> : isInProgress ? <Play className="w-3.5 h-3.5 fill-white" /> : <Lock className="w-3.5 h-3.5" />}
              </div>

              {/* Node Card Content */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {node.phase}
                    </span>
                    <span className="text-xs text-brand-300 font-semibold">{node.subject}</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-white">{node.title}</h3>
                  <p className="text-xs text-slate-300">{node.description}</p>

                  <div className="flex items-center gap-3 pt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {node.durationMinutes} mins
                    </span>
                    <span className="flex items-center gap-1 text-amber-300 font-bold">
                      <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      +{node.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Node Action */}
                <div>
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                      <CheckCircle className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : isInProgress ? (
                    <button
                      onClick={onComplete}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/40 hover:scale-105 transition"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Start Lesson</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Ready to dive into the next active topic: <strong>Quadratic Roots & Parabolas</strong>?
        </p>
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-500 text-white transition"
        >
          <span>Open Interactive Lesson</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
