import React from 'react';
import { RecommendationCard } from '../../types';
import { RECOMMENDATIONS } from '../../mock/initialData';
import { Sparkles, Clock, Zap, ArrowRight, Compass, ShieldAlert, Award, RefreshCw } from 'lucide-react';

interface Step10Props {
  onComplete: () => void;
}

export const Step10UpdatedRecommendations: React.FC<Step10Props> = ({ onComplete }) => {
  const recs: RecommendationCard[] = RECOMMENDATIONS;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dynamic Adaptation Loop</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Updated <span className="gradient-text">Smart Recommendations</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Because you mastered the quadratic formula drill and maintained high accuracy, your next recommended study activities have dynamically re-ordered!
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-brand-900/30 border border-brand-500/30 text-xs">
          <RefreshCw className="w-4 h-4 text-brand-400 animate-spin" />
          <span className="text-brand-200 font-semibold">Feed updated in real-time</span>
        </div>
      </div>

      {/* Recommended Activity Cards */}
      <div className="space-y-4">
        {recs.map((rec) => {
          const isHigh = rec.urgency === 'high';
          const isMedium = rec.urgency === 'medium';

          return (
            <div
              key={rec.id}
              className={`p-6 rounded-2xl glass-panel border transition-all hover:scale-[1.01] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                isHigh ? 'border-rose-500/40 bg-rose-950/10' :
                isMedium ? 'border-brand-500/40' : 'border-slate-800'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    rec.category === 'Gap Remedy' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    rec.category === 'Next Challenge' ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {rec.category}
                  </span>

                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {rec.estimatedTime}
                  </span>

                  <span className="text-xs text-amber-300 flex items-center gap-1 font-bold">
                    <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    +{rec.xpBonus} XP
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-white">{rec.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{rec.reason}</p>
              </div>

              <button
                onClick={onComplete}
                className={`w-full md:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow transition shrink-0 ${
                  isHigh
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                    : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/30'
                }`}
              >
                <span>{rec.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Major Milestone Transition Banner into Layer 2 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-800 to-teal-950/60 border border-emerald-500/40 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Major Milestone Achieved</span>
            <h3 className="text-lg font-bold text-white">Transitioning to Layer 2: Career & Entrance-Exam Guidance</h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Now that we have mapped your diagnostic scores (Math: 88%, Physics: 82%, Logic: 91%, Biology: 54%) and learning traits, our <strong>Dedicated Career Engine</strong> will analyze which high-impact engineering, technology, and research disciplines match your exact profile—and show you <em>exactly why</em>!
        </p>

        <button
          onClick={onComplete}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition-all hover:scale-[1.01]"
        >
          <span>Launch Career Guidance Engine</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
