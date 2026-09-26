export type GradeLevel = 'Class 8' | 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12';
export type AcademicStream = 'Science (PCM)' | 'Science (PCB)' | 'Commerce' | 'Arts & Humanities' | 'Foundational STEM';

export type StudentTheme = 'cosmic' | 'daylight' | 'emerald' | 'cyber' | 'sunset';

export interface ThemeConfig {
  id: StudentTheme;
  name: string;
  emoji: string;
  description: string;
  accentColor: string;
}

export interface StudentAvatar {
  id: string;
  name: string;
  emoji: string;
  badge: string;
  bgColor: string;
}

export interface StudentProfile {
  name: string;
  grade: GradeLevel;
  stream: AcademicStream;
  avatar: StudentAvatar;
  dreamCareer: string;
  interests: string[];
  xp: number;
  streakDays: number;
  level: number;
  overallScore: number;
}

export type Subject = 'Mathematics' | 'Physics' | 'Logical Reasoning' | 'Biology' | 'General Chemistry';

export interface DiagnosticQuestion {
  id: string;
  subject: Subject;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SubjectScore {
  subject: Subject;
  score: number;
  totalQuestions: number;
  correctQuestions: number;
  percentile: number;
  speedSecsAvg: number;
  status: 'Strong' | 'Average' | 'Needs Attention';
  icon: string;
  color: string;
}

export interface KnowledgeGap {
  id: string;
  subject: Subject;
  targetConcept: string;
  targetMastery: number;
  prerequisiteConcept: string;
  prerequisiteMastery: number;
  severity: 'critical' | 'moderate' | 'mastered';
  rootCause: string;
  bridgeRemedy: string;
  estimatedFixTime: string;
}

export interface LearningPathNode {
  id: string;
  title: string;
  subject: Subject;
  phase: 'Bridge Prerequisite' | 'Core Mastery' | 'Advanced Application' | 'Exam Simulator';
  status: 'completed' | 'in_progress' | 'locked';
  xpReward: number;
  durationMinutes: number;
  description: string;
}

export interface Flashcard {
  front: string;
  back: string;
  hint: string;
}

export interface LearningLesson {
  id: string;
  title: string;
  subject: Subject;
  topic: string;
  summary: string;
  coreConcept: string;
  realWorldAnalogy: string;
  interactiveFormula?: {
    latex: string;
    variables: { symbol: string; label: string; defaultVal: number; unit: string; min: number; max: number }[];
  };
  flashcards: Flashcard[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  analogy?: string;
  hint?: string;
  quickReplies?: string[];
}

export interface AdaptiveQuizQuestion {
  id: string;
  subject: Subject;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  remedyTip: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface RecommendationCard {
  id: string;
  category: 'Next Challenge' | 'Revision Spaced' | 'Gap Remedy' | 'Career Milestone';
  title: string;
  reason: string;
  estimatedTime: string;
  xpBonus: number;
  actionText: string;
  urgency: 'high' | 'medium' | 'normal';
}

export interface CareerMatch {
  id: string;
  title: string;
  matchScore: number;
  tagline: string;
  category: string;
  academicScore: number;
  interestScore: number;
  aptitudeScore: number;
  whySuggested: {
    academic: string[];
    interest: string[];
    aptitude: string[];
  };
  keyPathways: string[];
  entranceExamsRequired: string[];
  topRoles: string[];
  avgStartingSalary: string;
  growthOutlook: string;
}

export interface EntranceExam {
  id: string;
  name: string;
  targetField: string;
  conductingBody: string;
  eligibility: string;
  subjects: string[];
  examPattern: string;
  upcomingDate: string;
  readinessPercentage: number;
  officialSourceUrl: string;
  highWeightageTopics: string[];
}

export interface ScholarshipTier {
  minScore: number;
  maxScore: number;
  discountPercentage: number;
  label: string;
  badgeText: string;
  message: string;
  perks: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  basePriceMonthly: number;
  annualMultiplier: number;
  features: string[];
  isPopular?: boolean;
}
