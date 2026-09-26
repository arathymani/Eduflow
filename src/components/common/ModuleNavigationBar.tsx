import React from 'react';
import {
  UserCheck,
  FileCheck,
  BarChart3,
  GitBranch,
  MapPin,
  BookOpen,
  Bot,
  BrainCircuit,
  LayoutDashboard,
  Sparkles,
  Compass,
  GraduationCap,
  Percent,
  RefreshCw,
} from 'lucide-react';

interface ModuleNavProps {
  currentModule: number;
  activePillar: number;
  onSelectModule: (moduleIndex: number) => void;
}

interface ModuleItem {
  id: number;
  title: string;
  icon: React.ElementType;
  pillar: number;
}

export const ALL_MODULES: ModuleItem[] = [
  // Pillar 1: Adaptive Learning
  { id: 1, title: 'Profile & Persona', icon: UserCheck, pillar: 1 },
  { id: 2, title: 'Diagnostic Test', icon: FileCheck, pillar: 1 },
  { id: 3, title: 'Performance Analysis', icon: BarChart3, pillar: 1 },
  { id: 4, title: 'Knowledge Gaps', icon: GitBranch, pillar: 1 },
  { id: 5, title: 'Learning Trail', icon: MapPin, pillar: 1 },
  { id: 6, title: 'Interactive Lesson', icon: BookOpen, pillar: 1 },
  { id: 7, title: 'Nova AI Tutor', icon: Bot, pillar: 1 },
  { id: 8, title: 'Adaptive Quiz', icon: BrainCircuit, pillar: 1 },
  { id: 9, title: 'Progress Dashboard', icon: LayoutDashboard, pillar: 1 },
  { id: 10, title: 'Recommendations', icon: Sparkles, pillar: 1 },

  // Pillar 2: Career & Entrance Exams
  { id: 11, title: 'Career Match Engine', icon: Compass, pillar: 2 },
  { id: 12, title: 'Entrance Exams & Readiness', icon: GraduationCap, pillar: 2 },

  // Pillar 3: Scholarships & Continuous Growth
  { id: 13, title: 'Scholarship Plans', icon: Percent, pillar: 3 },
  { id: 14, title: 'Continuous Growth Loop', icon: RefreshCw, pillar: 3 },
];

export const ModuleNavigationBar: React.FC<ModuleNavProps> = ({
  currentModule,
  activePillar,
  onSelectModule,
}) => {
  // Filter modules for the currently selected pillar
  const pillarModules = ALL_MODULES.filter(m => m.pillar === activePillar);

  const getPillarLabel = () => {
    switch (activePillar) {
      case 1:
        return { label: 'Layer 1: Adaptive Learning Engine', color: 'text-brand-400 bg-brand-500/10 border-brand-500/30' };
      case 2:
        return { label: 'Layer 2: Career & Entrance-Exam Guidance', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
      case 3:
        return { label: 'Layer 3: Performance Scholarships & Growth', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
      default:
        return { label: 'Platform Layer', color: 'text-slate-400 bg-slate-800 border-slate-700' };
    }
  };

  const pillarInfo = getPillarLabel();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 pt-4 pb-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-slate-800">
        {/* Active Layer Tag */}
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-xl border ${pillarInfo.color}`}>
            {pillarInfo.label}
          </span>
        </div>

        {/* Modules List for Current Pillar */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          {pillarModules.map((item) => {
            const isActive = currentModule === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30 scale-105'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
