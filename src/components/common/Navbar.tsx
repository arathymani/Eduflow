import React from 'react';
import { StudentProfile, StudentTheme } from '../../types';
import { ThemeSelector } from './ThemeSelector';
import { Sparkles, Flame, Award, Zap, Compass, BookOpen } from 'lucide-react';

interface NavbarProps {
  profile: StudentProfile;
  activePillar: number;
  onSelectPillar: (pillarIndex: number) => void;
  currentTheme: StudentTheme;
  onSelectTheme: (theme: StudentTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activePillar,
  onSelectPillar,
  currentTheme,
  onSelectTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-700/50 backdrop-blur-md px-4 lg:px-8 py-3 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Mascot */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-brand-500/25 animate-bounce-subtle">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">Edu<span className="text-brand-400">Flow</span></span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-medium border border-brand-500/30">AI Adaptive</span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Continuous Learning & Career Engine</p>
            </div>
          </div>

          {/* Theme selector in mobile header */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeSelector currentTheme={currentTheme} onSelectTheme={onSelectTheme} />
          </div>
        </div>

        {/* 3 Core Pillars Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 p-1 bg-slate-800/80 rounded-2xl border border-slate-700/60 shadow-inner overflow-x-auto max-w-full">
          <button
            onClick={() => onSelectPillar(1)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activePillar === 1
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30 scale-105'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Adaptive Learning</span>
          </button>

          <button
            onClick={() => onSelectPillar(2)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activePillar === 2
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30 scale-105'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>2. Career & Exams</span>
          </button>

          <button
            onClick={() => onSelectPillar(3)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activePillar === 3
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-500/30 scale-105'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>3. Scholarships & Plans</span>
          </button>
        </div>

        {/* Right Section: Theme Selector, Gamified Stats & Student Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Selector (Desktop) */}
          <div className="hidden md:block">
            <ThemeSelector currentTheme={currentTheme} onSelectTheme={onSelectTheme} />
          </div>

          {/* XP Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold shadow-sm">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{profile.xp.toLocaleString()} XP</span>
          </div>

          {/* Streak Fire */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-bold shadow-sm">
            <Flame className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>{profile.streakDays}d Streak</span>
          </div>

          {/* Avatar and Grade Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700/60">
            <div className={`w-9 h-9 rounded-xl ${profile.avatar.bgColor} flex items-center justify-center text-lg shadow-md ring-2 ring-white/10`}>
              {profile.avatar.emoji}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-white leading-tight">{profile.name}</p>
              <p className="text-[10px] text-brand-300 font-medium">{profile.grade} • {profile.stream.split(' ')[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
