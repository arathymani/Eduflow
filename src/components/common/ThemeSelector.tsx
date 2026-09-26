import React, { useState, useRef, useEffect } from 'react';
import { StudentTheme, ThemeConfig } from '../../types';
import { Palette, Check } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: StudentTheme;
  onSelectTheme: (theme: StudentTheme) => void;
}

export const STUDENT_THEMES: ThemeConfig[] = [
  {
    id: 'cosmic',
    name: 'Cosmic Nebula',
    emoji: '🌌',
    description: 'Deep space dark mode with violet & cyan aura',
    accentColor: 'from-violet-600 to-indigo-600'
  },
  {
    id: 'daylight',
    name: 'Daylight Scholar',
    emoji: '☀️',
    description: 'Clean, crisp light mode for focused daytime study',
    accentColor: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'emerald',
    name: 'Emerald Zen',
    emoji: '🌿',
    description: 'Calming dark pine & mint tones for low eye-strain',
    accentColor: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'cyber',
    name: 'Cyber Arcade',
    emoji: '⚡',
    description: 'High-contrast neon cyan & energetic gamified accents',
    accentColor: 'from-cyan-400 to-fuchsia-500'
  },
  {
    id: 'sunset',
    name: 'Sunset Horizon',
    emoji: '🌅',
    description: 'Warm obsidian with peach, amber & rose gradients',
    accentColor: 'from-rose-500 to-amber-500'
  },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onSelectTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeThemeMeta = STUDENT_THEMES.find(t => t.id === currentTheme) || STUDENT_THEMES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition shadow-sm"
        title="Change Student Theme"
      >
        <Palette className="w-3.5 h-3.5 text-brand-400" />
        <span className="hidden sm:inline">{activeThemeMeta.emoji} {activeThemeMeta.name.split(' ')[0]}</span>
        <span className="sm:hidden">{activeThemeMeta.emoji}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel-glow border border-slate-700 p-2 shadow-2xl z-50 animate-fadeIn">
          <div className="px-3 py-2 border-b border-slate-700/60 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Student Theme Mode</span>
            <span className="text-xs font-bold text-white">Choose your study vibe</span>
          </div>

          <div className="space-y-1">
            {STUDENT_THEMES.map(theme => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition ${
                    isSelected
                      ? 'bg-brand-600/30 border border-brand-400 text-white'
                      : 'hover:bg-slate-800/70 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{theme.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{theme.name}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{theme.description}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
