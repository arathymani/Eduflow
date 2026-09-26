import React, { useState } from 'react';
import { EntranceExam } from '../../types';
import { ENTRANCE_EXAMS } from '../../mock/initialData';
import { GraduationCap, ExternalLink, Calendar, CheckCircle2, Award, ArrowRight, BookOpen, Percent } from 'lucide-react';

interface Step12Props {
  onComplete: () => void;
}

export const Step12EntranceExamGuidance: React.FC<Step12Props> = ({ onComplete }) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(ENTRANCE_EXAMS[0].id);

  const activeExam = ENTRANCE_EXAMS.find(e => e.id === selectedExamId) || ENTRANCE_EXAMS[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Competitive Entrance Exam Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Entrance Exam <span className="gradient-text">Readiness & Pathways</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Syllabus alignment, eligibility criteria, and your real-time calculated readiness percentage based on continuous test metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Curated for <strong>AI, Robotics & Aerospace</strong></span>
        </div>
      </div>

      {/* Exam Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {ENTRANCE_EXAMS.map((exam) => (
          <button
            key={exam.id}
            onClick={() => setSelectedExamId(exam.id)}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all border ${
              selectedExamId === exam.id
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/40'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {exam.name.split(' (')[0]}
            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-slate-900/60 text-emerald-300">
              {exam.readinessPercentage}% Ready
            </span>
          </button>
        ))}
      </div>

      {/* Active Exam Card Details */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        {/* Top Details & Readiness Meter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                {activeExam.conductingBody}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {activeExam.upcomingDate}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">{activeExam.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300">{activeExam.targetField}</p>
          </div>

          {/* Readiness gauge */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Calculated Readiness</span>
              <span className="text-2xl font-black text-emerald-400">{activeExam.readinessPercentage}%</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">
              🎯
            </div>
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          {/* Eligibility */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official Eligibility Criteria</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">{activeExam.eligibility}</p>
          </div>

          {/* Exam Pattern */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-400" />
              <span>Exam Architecture & Pattern</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">{activeExam.examPattern}</p>
          </div>
        </div>

        {/* Subjects & High-Weightage Topics */}
        <div className="space-y-4 pt-2">
          <h4 className="font-bold text-white text-sm">Subject Weightage & Priority Topics:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeExam.subjects.map((subj, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center">
                <span className="text-xs font-semibold text-slate-200">{subj}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-brand-950/20 border border-brand-500/30 space-y-2">
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider block">
              High Yield Syllabus Topics for {activeExam.name.split(' (')[0]}:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeExam.highWeightageTopics.map((topic, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-slate-900 text-slate-200 text-xs font-medium border border-slate-700">
                  ⚡ {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Official portal link */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
          <span className="text-slate-400">Verified official information portal:</span>
          <a
            href={activeExam.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition"
          >
            <span>{activeExam.officialSourceUrl}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Milestone Transition into Layer 3 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-800 to-orange-950/60 border border-amber-500/40 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30 font-bold text-lg">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Next Horizon: Layer 3</span>
            <h3 className="text-lg font-bold text-white">Subscription & Performance-Based Discount System</h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Unlike traditional static pricing, our platform rewards learning progress with <strong>Performance Scholarships</strong>. As your scores rise from 62% to 78% and beyond, your subscription discounts increase automatically!
        </p>

        <button
          onClick={onComplete}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 text-white shadow-xl shadow-amber-500/30 transition-all hover:scale-[1.01]"
        >
          <span>Calculate Performance Scholarship & Plans</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
