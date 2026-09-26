import React from 'react';
import { StudentProfile, GradeLevel, AcademicStream, StudentAvatar } from '../../types';
import { AVATARS } from '../../mock/initialData';
import { Sparkles, ArrowRight, Compass, Target, GraduationCap, CheckCircle2 } from 'lucide-react';

interface Step1Props {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onComplete: () => void;
}

const GRADES: GradeLevel[] = ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const STREAMS: AcademicStream[] = [
  'Science (PCM)',
  'Science (PCB)',
  'Commerce',
  'Arts & Humanities',
  'Foundational STEM'
];

const INTEREST_TAGS = [
  'Artificial Intelligence',
  'Space & Astronomy',
  'Competitive Math',
  'Robotics & Hardware',
  'Biotechnology',
  'Fintech & Markets',
  'Game Development',
  'Design & UX'
];

export const Step1AuthOnboarding: React.FC<Step1Props> = ({ profile, setProfile, onComplete }) => {
  const handleAvatarSelect = (avatar: StudentAvatar) => {
    setProfile(prev => ({ ...prev, avatar }));
  };

  const handleInterestToggle = (tag: string) => {
    setProfile(prev => {
      const exists = prev.interests.includes(tag);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter(t => t !== tag)
          : [...prev.interests, tag]
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow p-6 sm:p-8 border border-brand-500/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Profile & Persona</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Craft Your <span className="gradient-text">Learning Avatar</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              Tell us about yourself so our adaptive learning algorithms and career engine can tailor every explanation, challenge, and scholarship reward to your unique journey!
            </p>
          </div>

          {/* Active Avatar Preview Card */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-xl min-w-[170px] animate-float">
            <div className={`w-20 h-20 rounded-2xl ${profile.avatar.bgColor} flex items-center justify-center text-4xl shadow-lg ring-4 ring-brand-400/40 mb-2`}>
              {profile.avatar.emoji}
            </div>
            <span className="font-bold text-white text-sm">{profile.avatar.name}</span>
            <span className="text-[11px] font-medium text-brand-300 bg-brand-500/20 px-2 py-0.5 rounded-full mt-1">
              {profile.avatar.badge}
            </span>
          </div>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Personal info & Grade */}
        <div className="space-y-6">
          {/* Student Name */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <label className="block text-sm font-semibold text-slate-200">Student Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          {/* Grade Level Selection */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-brand-400" />
                Select Current Grade (Class 8–12)
              </label>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {GRADES.map(grade => (
                <button
                  key={grade}
                  onClick={() => setProfile(prev => ({ ...prev, grade }))}
                  className={`py-2.5 px-1 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                    profile.grade === grade
                      ? 'bg-brand-600 border-brand-400 text-white shadow-md shadow-brand-500/40 scale-105 ring-2 ring-brand-400/50'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Academic Stream */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-400" />
              Focus Stream / Track
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STREAMS.map(stream => (
                <button
                  key={stream}
                  onClick={() => setProfile(prev => ({ ...prev, stream }))}
                  className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                    profile.stream === stream
                      ? 'bg-emerald-600/30 border-emerald-400 text-white shadow-sm ring-1 ring-emerald-400'
                      : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{stream}</span>
                    {profile.stream === stream && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Avatar picker & Interests */}
        <div className="space-y-6">
          {/* Avatar Selector */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <label className="text-sm font-semibold text-slate-200">Choose Your Mascot</label>
            <div className="grid grid-cols-5 gap-2">
              {AVATARS.map(avatar => {
                const isSelected = profile.avatar.id === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    onClick={() => handleAvatarSelect(avatar)}
                    className={`flex flex-col items-center p-2 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-slate-700/80 border-brand-400 scale-105 ring-2 ring-brand-400 shadow-md'
                        : 'bg-slate-800/60 border-slate-700/60 opacity-70 hover:opacity-100 hover:border-slate-500'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${avatar.bgColor} flex items-center justify-center text-2xl shadow`}>
                      {avatar.emoji}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-200 mt-1 truncate">{avatar.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dream Career / Goals */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400" />
              Primary Aspiration / Dream Career
            </label>
            <input
              type="text"
              value={profile.dreamCareer}
              onChange={(e) => setProfile(prev => ({ ...prev, dreamCareer: e.target.value }))}
              placeholder="e.g. AI & Robotics Engineer, Astrophysicist, Neurosurgeon"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm"
            />
          </div>

          {/* Topic Interests */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <label className="text-sm font-semibold text-slate-200">Curiosity & Passion Areas</label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_TAGS.map(tag => {
                const active = profile.interests.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleInterestToggle(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      active
                        ? 'bg-brand-500/30 border-brand-400 text-brand-200 shadow-sm'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {active ? '✓ ' : '+ '}{tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-900/60 via-slate-800 to-indigo-900/60 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-base">Profile Setup Complete!</h4>
          <p className="text-xs text-slate-300">Next: Take the quick 4-question Diagnostic Test to detect strengths & knowledge gaps.</p>
        </div>
        <button
          onClick={onComplete}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 text-white shadow-xl shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Launch Diagnostic Test</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
