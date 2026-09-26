import React, { useState } from 'react';
import { CareerMatch } from '../../types';
import { CAREER_MATCHES } from '../../mock/initialData';
import { Compass, CheckCircle2, ChevronDown, ChevronUp, GraduationCap, Briefcase, TrendingUp, Info, ArrowRight, Sparkles } from 'lucide-react';

interface Step11Props {
  onComplete: () => void;
  onSelectCareerExam?: () => void;
}

export const Step11CareerGuidance: React.FC<Step11Props> = ({ onComplete }) => {
  const [selectedCareerId, setSelectedCareerId] = useState<string>(CAREER_MATCHES[0].id);
  const [expandedWhy, setExpandedWhy] = useState<Record<string, boolean>>({ [CAREER_MATCHES[0].id]: true });

  const toggleWhy = (id: string) => {
    setExpandedWhy(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Dedicated Career Guidance Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Career <span className="gradient-text">Exploration Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            A standalone reasoning engine synthesizing your academic performance, declared passions, and cognitive aptitude.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Transparent Evidence: Always shows <strong>WHY</strong> an area is suggested!</span>
        </div>
      </div>

      {/* Input Data Flow Diagram */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          Student Profile Vector Fed into Career Engine
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Academic Input */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="font-bold text-white block">📊 Academic Mastery</span>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between"><span>Mathematics:</span> <strong className="text-emerald-400">88%</strong></div>
              <div className="flex justify-between"><span>Physics:</span> <strong className="text-emerald-400">82%</strong></div>
              <div className="flex justify-between"><span>Logical Reasoning:</span> <strong className="text-emerald-400">91%</strong></div>
              <div className="flex justify-between"><span>Biology:</span> <strong className="text-rose-400">54%</strong></div>
            </div>
          </div>

          {/* Interests Input */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="font-bold text-white block">💡 Interests & Curiosities</span>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="px-2 py-0.5 rounded-md bg-brand-500/20 text-brand-300 text-[10px] font-medium">Artificial Intelligence (High)</span>
              <span className="px-2 py-0.5 rounded-md bg-brand-500/20 text-brand-300 text-[10px] font-medium">Space & Astronomy</span>
              <span className="px-2 py-0.5 rounded-md bg-brand-500/20 text-brand-300 text-[10px] font-medium">Robotics & Hardware</span>
              <span className="px-2 py-0.5 rounded-md bg-brand-500/20 text-brand-300 text-[10px] font-medium">Game Development</span>
            </div>
          </div>

          {/* Aptitude Input */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
            <span className="font-bold text-white block">🧠 Aptitude Metrics</span>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between"><span>Spatial Visualization:</span> <strong className="text-brand-300">94/100</strong></div>
              <div className="flex justify-between"><span>Algorithmic Speed:</span> <strong className="text-brand-300">28s/q</strong></div>
              <div className="flex justify-between"><span>Deductive Logic:</span> <strong className="text-brand-300">96th %ile</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Career Matches */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-400" />
          <span>Top Algorithmic Career Matches</span>
        </h3>

        <div className="space-y-5">
          {CAREER_MATCHES.map((career: CareerMatch) => {
            const isSelected = selectedCareerId === career.id;
            const isWhyOpen = expandedWhy[career.id];

            return (
              <div
                key={career.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isSelected
                    ? 'glass-panel-glow border-emerald-500/50 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Career Card Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                        {career.category}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        {career.matchScore}% Match
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                      {career.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300">{career.tagline}</p>
                  </div>

                  {/* Compatibility score pill */}
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Algorithm Score</span>
                      <span className="text-xl font-black text-emerald-400">{career.matchScore}/100</span>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Bar */}
                <div className="grid grid-cols-3 gap-3 my-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Academic Fit</span>
                    <strong className="text-white text-sm">{career.academicScore}%</strong>
                  </div>
                  <div className="border-x border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Interest Fit</span>
                    <strong className="text-brand-300 text-sm">{career.interestScore}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Aptitude Fit</span>
                    <strong className="text-amber-300 text-sm">{career.aptitudeScore}%</strong>
                  </div>
                </div>

                {/* 'Why This Was Suggested' Expandable Section */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => toggleWhy(career.id)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-xs sm:text-sm font-bold text-emerald-300 transition"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Why Was This Career Suggested? (Transparent Reasoning Breakdown)
                    </span>
                    {isWhyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isWhyOpen && (
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs animate-fadeIn">
                      <div>
                        <strong className="text-emerald-400 block mb-1">📐 Academic Performance Drivers:</strong>
                        <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                          {career.whySuggested.academic.map((reason, i) => (
                            <li key={i}>{reason}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong className="text-brand-300 block mb-1">💡 Declared Interests & Drive:</strong>
                        <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                          {career.whySuggested.interest.map((reason, i) => (
                            <li key={i}>{reason}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong className="text-amber-300 block mb-1">🧠 Aptitude & Problem-Solving Speed:</strong>
                        <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                          {career.whySuggested.aptitude.map((reason, i) => (
                            <li key={i}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Academic Pathways & Associated Exams */}
                <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-brand-400" />
                      Recommended Academic Pathways:
                    </span>
                    <ul className="space-y-1 text-slate-400">
                      {career.keyPathways.map((path, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{path}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-bold text-slate-300 block mb-1">Target Entrance Exams:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {career.entranceExamsRequired.map((exam, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px]">
                            {exam}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1 text-[11px] text-slate-400">
                      <div>Salary Benchmark: <strong className="text-white">{career.avgStartingSalary}</strong></div>
                      <div>Outlook: <strong className="text-emerald-400">{career.growthOutlook}</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-800 to-teal-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-base">Next Step: Entrance Exam Pathways</h4>
          <p className="text-xs text-slate-300">Discover eligibility, official sources, and your current syllabus readiness score.</p>
        </div>
        <button
          onClick={onComplete}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition-all hover:scale-[1.01]"
        >
          <span>Examine Entrance Exam Readiness</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
