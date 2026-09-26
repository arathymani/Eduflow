import React, { useState, useEffect } from 'react';
import { StudentProfile, StudentTheme } from './types';
import { INITIAL_PROFILE } from './mock/initialData';
import { Navbar } from './components/common/Navbar';
import { ModuleNavigationBar } from './components/common/ModuleNavigationBar';

// Modular Step components
import { Step1AuthOnboarding } from './components/steps/Step1AuthOnboarding';
import { Step2DiagnosticTest } from './components/steps/Step2DiagnosticTest';
import { Step3PerformanceAnalysis } from './components/steps/Step3PerformanceAnalysis';
import { Step4KnowledgeGapDetection } from './components/steps/Step4KnowledgeGapDetection';
import { Step5PersonalizedPath } from './components/steps/Step5PersonalizedPath';
import { Step6LearningContent } from './components/steps/Step6LearningContent';
import { Step7AiTutor } from './components/steps/Step7AiTutor';
import { Step8AdaptiveQuiz } from './components/steps/Step8AdaptiveQuiz';
import { Step9ProgressDashboard } from './components/steps/Step9ProgressDashboard';
import { Step10UpdatedRecommendations } from './components/steps/Step10UpdatedRecommendations';
import { Step11CareerGuidance } from './components/steps/Step11CareerGuidance';
import { Step12EntranceExamGuidance } from './components/steps/Step12EntranceExamGuidance';
import { Step13SubscriptionScholarship } from './components/steps/Step13SubscriptionScholarship';
import { Step14ContinuousLoop } from './components/steps/Step14ContinuousLoop';

export function App() {
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [currentModule, setCurrentModule] = useState<number>(1);
  const [activePillar, setActivePillar] = useState<number>(1);

  // Student Theme state with localStorage persistence
  const [theme, setTheme] = useState<StudentTheme>(() => {
    const saved = localStorage.getItem('eduflow_student_theme') as StudentTheme;
    return saved || 'cosmic';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eduflow_student_theme', theme);
  }, [theme]);

  // Handle pillar selection
  const handleSelectPillar = (pillar: number) => {
    setActivePillar(pillar);
    if (pillar === 1) setCurrentModule(1);
    else if (pillar === 2) setCurrentModule(11);
    else if (pillar === 3) setCurrentModule(13);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle module selection
  const handleSelectModule = (moduleId: number) => {
    setCurrentModule(moduleId);
    if (moduleId <= 10) setActivePillar(1);
    else if (moduleId <= 12) setActivePillar(2);
    else setActivePillar(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEarnXp = (amount: number) => {
    setProfile(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const handleNextModule = () => {
    const nextMod = Math.min(14, currentModule + 1);
    handleSelectModule(nextMod);
  };

  const handleRestart = () => {
    handleSelectModule(1);
  };

  return (
    <div className="min-h-screen theme-container text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white transition-colors duration-300">
      {/* Top Navigation with Pillar Tabs & Student Theme Selector */}
      <Navbar
        profile={profile}
        activePillar={activePillar}
        onSelectPillar={handleSelectPillar}
        currentTheme={theme}
        onSelectTheme={setTheme}
      />

      {/* Clean Module Navigation Bar (replaces the linear 14-step workflow stepper) */}
      <ModuleNavigationBar
        currentModule={currentModule}
        activePillar={activePillar}
        onSelectModule={handleSelectModule}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {currentModule === 1 && (
          <Step1AuthOnboarding
            profile={profile}
            setProfile={setProfile}
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 2 && (
          <Step2DiagnosticTest
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 3 && (
          <Step3PerformanceAnalysis
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 4 && (
          <Step4KnowledgeGapDetection
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 5 && (
          <Step5PersonalizedPath
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 6 && (
          <Step6LearningContent
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 7 && (
          <Step7AiTutor
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 8 && (
          <Step8AdaptiveQuiz
            onComplete={handleNextModule}
            onEarnXp={handleEarnXp}
          />
        )}

        {currentModule === 9 && (
          <Step9ProgressDashboard
            profile={profile}
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 10 && (
          <Step10UpdatedRecommendations
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 11 && (
          <Step11CareerGuidance
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 12 && (
          <Step12EntranceExamGuidance
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 13 && (
          <Step13SubscriptionScholarship
            currentScore={profile.overallScore}
            onComplete={handleNextModule}
          />
        )}

        {currentModule === 14 && (
          <Step14ContinuousLoop
            profile={profile}
            setProfile={setProfile}
            onRestart={handleRestart}
            onSelectStep={handleSelectModule}
          />
        )}
      </main>

      {/* Global Student-Friendly Footer */}
      <footer className="mt-auto border-t border-slate-800/80 glass-panel py-6 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">EduFlow AI</span>
            <span>•</span>
            <span>Adaptive Learning, Career Guidance & Performance Scholarships</span>
          </div>
          <div className="text-slate-400">
            Engineered for Class 8–12 Students
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
