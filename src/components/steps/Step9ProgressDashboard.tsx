import React from 'react';
import { StudentProfile } from '../../types';
import { BADGES } from '../../mock/initialData';
import { LayoutDashboard, Award, Flame, TrendingUp, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface Step9Props {
  profile: StudentProfile;
  onComplete: () => void;
}

export const Step9ProgressDashboard: React.FC<Step9Props> = ({ profile, onComplete }) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dailyHours = [1.5, 2.1, 1.8, 2.5, 2.0, 3.2, 2.8];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-brand-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Comprehensive Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Continuous <span className="gradient-text">Progress Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Live telemetry tracking your conceptual velocity, mastery quadrant, habit streaks, and scholarship milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-center min-w-[100px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Tier</span>
            <span className="text-base sm:text-lg font-black text-amber-400">Level {profile.level}</span>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-brand-900/40 border border-brand-500/40 text-center min-w-[110px]">
            <span className="text-[10px] text-brand-300 font-bold uppercase block">Total XP</span>
            <span className="text-base sm:text-lg font-black text-white">{profile.xp.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses 4-Quadrant Matrix */}
      <div className="space-y-4">
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-400" />
          <span>Cognitive Strengths vs. Needs Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mastered Quadrant */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🌟 High Mastery & High Speed</span>
              <span className="text-xs text-emerald-300 font-bold">Safe for Exam Day</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex justify-between items-center">
                <span className="text-white font-medium">Logical Reasoning (Deductive Patterns)</span>
                <span className="font-bold text-emerald-400">91% • 28s</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex justify-between items-center">
                <span className="text-white font-medium">Trigonometric Identities & Sine Rules</span>
                <span className="font-bold text-emerald-400">88% • 35s</span>
              </div>
            </div>
          </div>

          {/* Growth Zone Quadrant */}
          <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">🚀 High Accuracy, Moderate Speed</span>
              <span className="text-xs text-blue-300 font-bold">Ready for Speed Drills</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex justify-between items-center">
                <span className="text-white font-medium">Projectile Motion in 2D Space</span>
                <span className="font-bold text-blue-400">82% • 55s</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex justify-between items-center">
                <span className="text-white font-medium">Calculus Limits & Continuity</span>
                <span className="font-bold text-blue-400">79% • 60s</span>
              </div>
            </div>
          </div>

          {/* Speed Drills Quadrant */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">⚡ Good Concept, Hesitant Recall</span>
              <span className="text-xs text-amber-300 font-bold">Needs Flashcards</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex justify-between items-center">
                <span className="text-white font-medium">Straight Lines & Coordinate Conics</span>
                <span className="font-bold text-amber-400">68% • 68s</span>
              </div>
            </div>
          </div>

          {/* Root Prerequisite Focus */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">⚠️ Prerequisite Attention Gaps</span>
              <span className="text-xs text-rose-300 font-bold">Assigned to Bridge Path</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex justify-between items-center">
                <span className="text-white font-medium">Algebraic Factorization Shortcuts</span>
                <span className="font-bold text-rose-400">42% (Root Gap)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex justify-between items-center">
                <span className="text-white font-medium">Cellular Respiration Molecular Steps</span>
                <span className="font-bold text-rose-400">54%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Habit Streak & Weekly Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak card */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Learning Habit</span>
            <span className="text-xs text-rose-400 font-bold flex items-center gap-1">
              <Flame className="w-4 h-4 fill-rose-500 text-rose-500" /> Active
            </span>
          </div>
          <div className="text-center py-2">
            <span className="text-4xl font-black text-white">{profile.streakDays} Days</span>
            <p className="text-xs text-slate-400 mt-1">Consistency unlocks scholarship bonus multipliers</p>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-800">
            {daysOfWeek.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-slate-400">{day}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i < 7 ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-800 text-slate-500'
                }`}>
                  ✓
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Study Hours */}
        <div className="md:col-span-2 p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-400" />
              <h4 className="font-bold text-white text-sm">Weekly Study Hours (15.8h total)</h4>
            </div>
            <span className="text-xs text-emerald-400 font-bold">+18% vs last week</span>
          </div>

          <div className="flex items-end justify-between gap-2 h-32 pt-4">
            {dailyHours.map((hrs, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] text-slate-400">{hrs}h</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-brand-700 to-brand-400 transition-all duration-500"
                  style={{ height: `${(hrs / 3.5) * 100}%` }}
                />
                <span className="text-[10px] text-slate-400 font-semibold">{daysOfWeek[idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h4 className="font-bold text-white text-base flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Earned Milestones & Badges</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {BADGES.map(badge => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 ${
                badge.unlocked
                  ? 'bg-slate-800/80 border-amber-500/40 shadow-sm'
                  : 'bg-slate-900/50 border-slate-800 opacity-40'
              }`}
            >
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <p className="text-xs font-bold text-white leading-tight">{badge.title}</p>
                <p className="text-[9px] text-slate-400 mt-0.5 line-clamp-2">{badge.description}</p>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                badge.unlocked ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-500'
              }`}>
                {badge.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-900/60 via-slate-800 to-indigo-900/60 border border-brand-500/30 flex items-center justify-between">
        <p className="text-xs text-slate-300">
          Your diagnostic and quiz telemetry just refreshed our smart learning engine!
        </p>
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-brand-600 hover:bg-brand-500 text-white transition shadow"
        >
          <span>View Updated Recommendations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
