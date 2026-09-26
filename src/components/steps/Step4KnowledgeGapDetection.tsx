import React from 'react';
import { KnowledgeGap } from '../../types';
import { KNOWLEDGE_GAPS } from '../../mock/initialData';
import { GitBranch, AlertCircle, ArrowRight, Clock, Zap, CheckCircle2, Link2 } from 'lucide-react';

interface Step4Props {
  onComplete: () => void;
}

export const Step4KnowledgeGapDetection: React.FC<Step4Props> = ({ onComplete }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-3">
          <GitBranch className="w-3.5 h-3.5" />
          <span>Prerequisite Graph Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Knowledge <span className="gradient-text">Gap Detection</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          Our algorithm traces your diagnostic errors back to their upstream prerequisite dependencies. Solving these root concepts clears downstream hurdles automatically!
        </p>
      </div>

      {/* Visual Knowledge Tree / Dependency Cards */}
      <div className="space-y-4">
        {KNOWLEDGE_GAPS.map((gap: KnowledgeGap) => {
          const isCritical = gap.severity === 'critical';

          return (
            <div
              key={gap.id}
              className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition space-y-5"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                    {gap.subject}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
                    isCritical
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    <AlertCircle className="w-3.5 h-3.5" />
                    {isCritical ? 'Critical Root Gap' : 'Moderate Friction'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Clock className="w-4 h-4 text-brand-400" />
                  <span>Est. Bridge Time: <strong className="text-white">{gap.estimatedFixTime}</strong></span>
                </div>
              </div>

              {/* The Prerequisite Dependency Diagram */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Upstream Root Prerequisite (The Cause) */}
                <div className="flex-1 w-full p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Root Prerequisite (Weak)</span>
                    <span className="text-xs font-bold text-rose-300">{gap.prerequisiteMastery}% Mastery</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{gap.prerequisiteConcept}</h4>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${gap.prerequisiteMastery}%` }} />
                  </div>
                </div>

                {/* Arrow & Bridge Connector */}
                <div className="flex flex-col items-center justify-center shrink-0 px-2 py-1 text-slate-400">
                  <span className="text-[10px] font-bold text-slate-400 mb-1 hidden md:block">Throttles</span>
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center justify-center">
                    <Link2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Downstream Target Concept (The Symptom) */}
                <div className="flex-1 w-full p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Concept (Impacted)</span>
                    <span className="text-xs font-bold text-amber-300">{gap.targetMastery}% Mastery</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{gap.targetConcept}</h4>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${gap.targetMastery}%` }} />
                  </div>
                </div>
              </div>

              {/* Diagnosis & Actionable Remedy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 text-slate-300">
                  <strong className="text-slate-200 block mb-1">🔍 Why it happens:</strong>
                  {gap.rootCause}
                </div>
                <div className="p-3.5 rounded-xl bg-brand-950/30 border border-brand-500/20 text-brand-200">
                  <strong className="text-brand-300 block mb-1">⚡ Targeted AI Bridge:</strong>
                  {gap.bridgeRemedy}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-900/60 via-slate-800 to-indigo-900/60 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-base">Gaps Mapped into Next Steps</h4>
          <p className="text-xs text-slate-300">Our adaptive path will feed these prerequisites in the exact sequence you need.</p>
        </div>
        <button
          onClick={onComplete}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 text-white shadow-xl shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Generate Personalized Learning Path</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
